import 'server-only'
import {
  type CreateUserType,
  type UpdateUserType,
  type UserListType,
  type UserType
} from './dto'
import UserModel from '@/db/models/userModel'
import mongoose from 'mongoose'
import { connectToDB } from '@/db'

export const userDAL = {
  async create(userData: CreateUserType): Promise<UserType> {
    // await checkAuth()
    await connectToDB()
    // await checkPermissions('create', 'user')

    const createdUser = await UserModel.create({
      ...userData
    })

    return JSON.parse(
      JSON.stringify({
        ...createdUser._doc,
        id: createdUser._id.toString()
      })
    )
  },

  async findById(id: string): Promise<UserType | null> {
    // check if id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) return null

    // await checkAuth()
    await connectToDB()
    // await checkPermissions('get', 'user')

    const user = await UserModel.findById(id)

    if (!user) return null

    return JSON.parse(
      JSON.stringify({
        ...user._doc,
        id: user._id.toString()
      })
    )
  },

  async findAll(): Promise<UserListType> {
    // await checkAuth()
    await connectToDB()
    // await checkPermissions('get', 'user')

    const users = await UserModel.find()

    if (!users) return []

    const response = users.map(user => ({
      ...user._doc,
      id: user._id.toString()
    }))

    return JSON.parse(JSON.stringify(response))
  },

  async update(
    id: string,
    updateData: UpdateUserType
  ): Promise<Partial<UserType> | null> {
    // check if id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) return null

    // await checkAuth()
    await connectToDB()
    // await checkPermissions('update', 'user')

    const updatedUser = await UserModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true
    }).exec()

    if (!updatedUser) return null

    return JSON.parse(
      JSON.stringify({
        ...updatedUser._doc,
        id: updatedUser._id.toString()
      })
    )
  },

  async delete(id: string): Promise<{ id: string } | null> {
    // check if id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) return null

    // await checkAuth()
    await connectToDB()
    // await checkPermissions('delete', 'user')

    const deletedUser = await UserModel.findByIdAndDelete(id)

    if (!deletedUser) return null

    return { id: deletedUser._id.toString() }
  }
}