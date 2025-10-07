// Reusable error handler helpers
export type FailureResult = {
  success: boolean
  errors: { message: string }
  data: null | []
}

export const failure = (message: string): FailureResult => ({
  success: false,
  data: null,
  errors: { message }
})

export const buildActionFailure = (verb: string, entity: string) =>
  failure(`Failed to ${verb} ${entity}. Please try again later.`)

export const notFoundError = (entity: string) => failure(`${entity} not found`)

export const logActionError = (
  action: string,
  entity: string,
  error: unknown
) => {
  console.error(`${action} ${entity} action error:`, error)
}

// Generic MongoDB/Mongoose error handler
export const handleMongoError = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any,
  action: string,
  resource: string
) => {
  let message = `Failed to ${action} ${resource}`

  // Handle specific MongoDB/Mongoose errors
  if (error.code === 11000) {
    // Duplicate key error
    const field = Object.keys(error.keyValue || {})[0] || 'field'
    message = `${resource} with this ${field} already exists`
  } else if (error.name === 'ValidationError') {
    // Mongoose validation error - fix the type issue
    const validationErrors = Object.values(error.errors).map(
      (err: unknown) => (err as { message: string }).message
    )
    message = validationErrors.join(', ')
  } else if (error.name === 'CastError') {
    // Invalid ObjectId or type casting error
    message = `Invalid ${error.path} format`
  } else if (error.name === 'DocumentNotFoundError') {
    // Document not found error
    message = `${resource} not found`
  } else if (error.name === 'MissingSchemaError') {
    // Schema not registered error
    message = 'Schema configuration error'
  } else if (error.name === 'ObjectExpectedError') {
    // Expected object but got different type
    message = 'Invalid data format provided'
  } else if (error.name === 'ObjectParameterError') {
    // Invalid parameter passed to object
    message = 'Invalid parameter provided'
  } else if (error.name === 'OverwriteModelError') {
    // Model already exists error
    message = 'Model configuration conflict'
  } else if (error.name === 'ParallelSaveError') {
    // Parallel save conflict
    message = 'Concurrent modification detected'
  } else if (error.name === 'StrictModeError') {
    // Strict mode violation
    message = 'Schema validation failed'
  } else if (error.name === 'VersionError') {
    // Version conflict error
    message = 'Document version conflict'
  } else if (error.code === 121) {
    // Document validation failed
    message = 'Document validation failed'
  } else if (error.name === 'MongoNetworkError') {
    // Network connectivity issues
    message = 'Database connection error'
  } else if (error.name === 'MongoTimeoutError') {
    // Operation timeout
    message = 'Database operation timeout'
  } else if (error.name === 'MongoServerError') {
    // General MongoDB server error
    message = 'Database server error'
  } else if (error.message) {
    // Use the error message if available
    message = error.message
  }

  // Only expose user-friendly messages, hide technical details
  const safeErrorMessages =
    error.code === 11000
      ? message // Duplicate key errors are safe to show
      : error.name === 'ValidationError'
        ? message // Validation errors are safe to show
        : error.name === 'CastError'
          ? 'Invalid ID format' // Simplified cast error
          : 'Something went wrong. Please try again.' // Generic message for all other errors

  return {
    success: false,
    data: null,
    errors: {
      message: safeErrorMessages
    }
  }
  // eslint-enable-next-line @typescript-eslint/no-explicit-any
}
