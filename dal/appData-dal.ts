import 'server-only'

import AppDataModel from '@/db/models/appDataModel'
import { connectToDB } from '@/db'
import type { AppDataType } from '@/dal'

export const appDataDAL = {
  async findAll(): Promise<AppDataType[]> {
    await connectToDB()

    const appDatas = await AppDataModel.find()

    if (!appDatas) return []

    const response = appDatas.map(appData => ({
      ...appData._doc,
      id: appData._id.toString()
    }))

    return JSON.parse(JSON.stringify(response))
  },
}