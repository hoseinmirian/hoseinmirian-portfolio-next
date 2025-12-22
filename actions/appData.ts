import { appDataDAL, AppDataSchema } from '@/dal'
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

//todo- move the db related like mongo error to DAL and simply here we should try catch error in action layer
// type GetAllAppDataResult =
//   | { success: true; data: AppDataSchema[]; error: null }
//   | { success: false; data: null; error: unknown }


export async function getAllAppData() {
  try {
    const appDatas = await appDataDAL.findAll()
    if (!appDatas) return notFoundError(ENTITY)
    
    const appData = appDatas[0]

    const result = AppDataSchema.safeParse(appData)
    if (!result.success) {
      logActionError(VERB.GET, ENTITY, zod.prettifyError(result.error))
      return buildActionFailure(VERB.GET, ENTITY)
    }
    
    return {
      success: true,
      data: appDatas,
      errors: null
    }
  } catch (error) {
    logActionError(VERB.GET, ENTITY, error)
    if (error instanceof Error && error.name?.includes('Error'))
      return handleMongoError(error, VERB.GET, ENTITY)
    return buildActionFailure(VERB.GET, ENTITY)
  }
}
