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
  error: unknown,
  action: string,
  resource: string
) => {
  let message = `Failed to ${action} ${resource}`

  // Type guard for error objects
  const err = error as Record<string, unknown>

  // Handle specific MongoDB/Mongoose errors
  if (err.code === 11000) {
    // Duplicate key error
    const field = Object.keys((err.keyValue as Record<string, unknown>) || {})[0] || 'field'
    message = `${resource} with this ${field} already exists`
  } else if (err.name === 'ValidationError') {
    // Mongoose validation error - fix the type issue
    const validationErrors = Object.values((err.errors as Record<string, unknown>) || {}).map(
      (e: unknown) => (e as { message: string }).message
    )
    message = validationErrors.join(', ')
  } else if (err.name === 'CastError') {
    // Invalid ObjectId or type casting error
    message = `Invalid ${err.path as string} format`
  } else if (err.name === 'DocumentNotFoundError') {
    // Document not found error
    message = `${resource} not found`
  } else if (err.name === 'MissingSchemaError') {
    // Schema not registered error
    message = 'Schema configuration error'
  } else if (err.name === 'ObjectExpectedError') {
    // Expected object but got different type
    message = 'Invalid data format provided'
  } else if (err.name === 'ObjectParameterError') {
    // Invalid parameter passed to object
    message = 'Invalid parameter provided'
  } else if (err.name === 'OverwriteModelError') {
    // Model already exists error
    message = 'Model configuration conflict'
  } else if (err.name === 'ParallelSaveError') {
    // Parallel save conflict
    message = 'Concurrent modification detected'
  } else if (err.name === 'StrictModeError') {
    // Strict mode violation
    message = 'Schema validation failed'
  } else if (err.name === 'VersionError') {
    // Version conflict error
    message = 'Document version conflict'
  } else if (err.code === 121) {
    // Document validation failed
    message = 'Document validation failed'
  } else if (err.name === 'MongoNetworkError') {
    // Network connectivity issues
    message = 'Database connection error'
  } else if (err.name === 'MongoTimeoutError') {
    // Operation timeout
    message = 'Database operation timeout'
  } else if (err.name === 'MongoServerError') {
    // General MongoDB server error
    message = 'Database server error'
  } else if (err.message) {
    // Use the error message if available
    message = err.message as string
  }

  // Only expose user-friendly messages, hide technical details
  const safeErrorMessages =
    err.code === 11000
      ? message // Duplicate key errors are safe to show
      : err.name === 'ValidationError'
        ? message // Validation errors are safe to show
        : err.name === 'CastError'
          ? 'Invalid ID format' // Simplified cast error
          : 'Something went wrong. Please try again.' // Generic message for all other errors

  return {
    success: false,
    data: null,
    errors: {
      message: safeErrorMessages
    }
  }
}
