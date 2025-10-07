'use server'

import { revalidatePath } from 'next/cache'
import * as zod from 'zod'
import {
  CreateUserSchema,
  UpdateUserSchema,
  UserListSchema,
  UserIdSchema,
  userDAL,
  toSafeUserDTO,
  toSafeUsersDTO,
  type CreateUserType,
  type UpdateUserType,
  type UserType
} from '@/dal'
import {
  buildActionFailure,
  handleMongoError,
  logActionError,
  notFoundError
} from '@/db'
// import { cache } from 'react'

// ---------------------------------------- reusable helpers
// cached version of userDALs functions

/*
// Example of caching a function in case for a first render pass when multiple server and client components call a data reading function
export const getUserCached = cache((id: string) => userDAL.findById(id))
export const getUsersCached = cache(() => userDAL.findAll())
*/

// Validate user ID function
const validateUserId = (id: string) => {
  const validatedID = UserIdSchema.safeParse(id)

  if (!validatedID.success) {
    return {
      success: false,
      errors: {
        message: zod.prettifyError(validatedID.error)
      }
    }
  }

  return { success: true, errors: null }
}

// Create user action
export async function createUser(
  formData: CreateUserType,
  options: { revalidatePath?: string } = {}
) {
  // Validate with zod
  const result = CreateUserSchema.safeParse(formData)

  // Return early if the form data is invalid
  if (!result.success) {
    return {
      success: false,
      errors: {
        message: zod.prettifyError(result.error)
      }
    }
  }

  // Use validated data
  const body = result.data

  // Use DAL for database operations
  try {
    const user = await userDAL.create(body)
    const safeData = toSafeUserDTO(user)

    // Optionally revalidate a path
    if (options.revalidatePath) revalidatePath(options.revalidatePath)

    return {
      success: true,
      data: safeData,
      errors: null
    }
  } catch (error) {
    logActionError('create', 'user', error)
    if (error instanceof Error && error.name?.includes('Error'))
      return handleMongoError(error, 'create', 'user')
    return buildActionFailure('create', 'user')
  }
}

// Update user action
export async function updateUser(
  id: string,
  formData: UpdateUserType,
  options: { revalidatePath?: string } = {}
) {
  // Validate user ID first
  validateUserId(id)

  const result = UpdateUserSchema.safeParse(formData)
  // Return early if the form data is invalid
  if (!result.success) {
    return {
      success: false,
      errors: {
        message: zod.prettifyError(result.error)
      }
    }
  }

  // Use DAL for database operations
  try {
    // Check if user exists first
    const existingUser = await userDAL.findById(id)
    if (!existingUser) {
      return notFoundError('User')
    }

    // Use validated data
    const body = result.data

    const user = (await userDAL.update(id, body)) as UserType

    // now it's time to return only the data needed using DTO
    const safeData = toSafeUserDTO(user)

    // Optionally revalidate a path
    if (options.revalidatePath) revalidatePath(options.revalidatePath)

    return {
      success: true,
      data: safeData,
      errors: null
    }
  } catch (error) {
    logActionError('update', 'user', error)
    if (error instanceof Error && error.name?.includes('Error'))
      return handleMongoError(error, 'update', 'user')
    return buildActionFailure('update', 'user')
  }
}

// Delete user action
export async function deleteUser(
  id: string,
  options: { revalidatePath?: string } = {}
) {
  // Validate user ID first
  validateUserId(id)

  // Use DAL for database operations
  try {
    // Check if user exists first
    const user = await userDAL.findById(id)
    if (!user) {
      return notFoundError('User')
    }

    await userDAL.delete(id)

    // Optionally revalidate a path
    if (options.revalidatePath) revalidatePath(options.revalidatePath)

    return {
      success: true,
      data: { id },
      errors: null
    }
  } catch (error) {
    logActionError('delete', 'user', error)
    if (error instanceof Error && error.name?.includes('Error'))
      return handleMongoError(error, 'delete', 'user')
    return buildActionFailure('delete', 'user')
  }
}

// Get users action
export async function getUsers() {
  try {
    // Use DAL for database operations
    const users = await userDAL.findAll()
    // no users found
    if (!users) return notFoundError('Users')

    const result = UserListSchema.safeParse(users) // Validate response with zod
    if (!result.success) {
      logActionError('get', 'users', zod.prettifyError(result.error))
      return buildActionFailure('get', 'users')
    }

    // now it's time to return only the data needed using DTO
    const safeData = toSafeUsersDTO(result.data)

    return {
      success: true,
      data: safeData,
      errors: null
    }
  } catch (error) {
    logActionError('get', 'users', error)
    if (error instanceof Error && error.name?.includes('Error'))
      return handleMongoError(error, 'get', 'users')
    return buildActionFailure('get', 'users')
  }
}

// Get user by ID action
export async function getUserById(id: string) {
  // Validate user ID first
  validateUserId(id)

  // Use DAL for database operations
  try {
    const user = await userDAL.findById(id)

    // no user found
    if (!user) return notFoundError('User')

    const safeData = toSafeUserDTO(user)

    return {
      success: true,
      data: safeData,
      errors: null
    }
  } catch (error) {
    logActionError('get', 'user', error)
    if (error instanceof Error && error.name?.includes('Error'))
      return handleMongoError(error, 'get', 'user')
    return buildActionFailure('get', 'user')
  }
}
