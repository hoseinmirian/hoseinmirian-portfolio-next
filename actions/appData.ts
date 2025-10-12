import { appDataDAL, UserListSchema } from '@/dal'
import {
  buildActionFailure,
  handleMongoError,
  logActionError,
  notFoundError
} from '@/db'
import * as zod from 'zod'

export async function getAllAppData() {
  try {
    // Use DAL for database operations
    const users = await appDataDAL.findAll()
    if (!users) return notFoundError('appData')

    const result = UserListSchema.safeParse(users) // Validate response with zod
    if (!result.success) {
      logActionError('get', 'appData', zod.prettifyError(result.error))
      return buildActionFailure('get', 'appData')
    }
    
    return {
      success: true,
      data: result.data,
      errors: null
    }
  } catch (error) {
    logActionError('get', 'appData', error)
    if (error instanceof Error && error.name?.includes('Error'))
      return handleMongoError(error, 'get', 'appData')
    return buildActionFailure('get', 'appData')
  }
}
