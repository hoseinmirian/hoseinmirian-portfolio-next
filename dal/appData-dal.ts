import 'server-only'

import AppDataModel from '@/db/models/appDataModel'
import { connectToDB } from '@/db'

export const appDataDAL = {
  async findAll() {
    await connectToDB()

    const appData = await AppDataModel.find()

    if (!appData) return []

    const response = {
      ...appData[0]._doc,
      id: appData[0]._id.toString()
    }

    return JSON.parse(JSON.stringify(response))
  },
}