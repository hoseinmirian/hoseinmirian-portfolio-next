import { appDataDAL, UserListSchema } from '@/dal'
import {
  buildActionFailure,
  handleMongoError,
  logActionError,
  notFoundError
} from '@/db'
import * as zod from 'zod'

const ENTITY = 'AppData'
const VERB = {
  GET: 'get'
}

export async function getAllAppData() {
  try {
    const users = await appDataDAL.findAll()
    if (!users) return notFoundError(ENTITY)

    const result = UserListSchema.safeParse(users) // Validate response with zod
    if (!result.success) {
      logActionError(VERB.GET, ENTITY, zod.prettifyError(result.error))
      return buildActionFailure(VERB.GET, ENTITY)
    }
    
    return {
      success: true,
      data: result.data,
      errors: null
    }
  } catch (error) {
    logActionError(VERB.GET, ENTITY, error)
    if (error instanceof Error && error.name?.includes('Error'))
      return handleMongoError(error, VERB.GET, ENTITY)
    return buildActionFailure(VERB.GET, ENTITY)
  }
}
