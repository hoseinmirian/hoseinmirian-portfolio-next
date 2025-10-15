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

const ENTITY = 'User'
const ENTITY_PLURAL = 'Users'
const VERB = {
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
  GET: 'get'
}

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
    if (!user) return notFoundError(ENTITY)

    const safeData = toSafeUserDTO(user)

    // Optionally revalidate a path
    if (options.revalidatePath) revalidatePath(options.revalidatePath)

    return {
      success: true,
      data: safeData,
      errors: null
    }
  } catch (error) {
    logActionError(VERB.CREATE, ENTITY, error)
    if (error instanceof Error && error.name?.includes('Error'))
      return handleMongoError(error, VERB.CREATE, ENTITY)
    return buildActionFailure(VERB.CREATE, ENTITY)
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
    if (!existingUser) return notFoundError(ENTITY)

    // Use validated data
    const body = result.data

    const user = (await userDAL.update(id, body)) as UserType
    if (!user) return notFoundError(ENTITY)

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
    logActionError(VERB.UPDATE, ENTITY, error)
    if (error instanceof Error && error.name?.includes('Error'))
      return handleMongoError(error, VERB.UPDATE, ENTITY)
    return buildActionFailure(VERB.UPDATE, ENTITY)
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
      return notFoundError(ENTITY)
    }

    const deletedUser = await userDAL.delete(id)
    if (!deletedUser) return notFoundError(ENTITY)

    // Optionally revalidate a path
    if (options.revalidatePath) revalidatePath(options.revalidatePath)

    return {
      success: true,
      data: { id },
      errors: null
    }
  } catch (error) {
    logActionError(VERB.DELETE, ENTITY, error)
    if (error instanceof Error && error.name?.includes('Error'))
      return handleMongoError(error, VERB.DELETE, ENTITY)
    return buildActionFailure(VERB.DELETE, ENTITY)
  }
}

// Get users action
export async function getUsers() {
  try {
    // Use DAL for database operations
    const users = await userDAL.findAll()
    if (!users) return notFoundError(ENTITY_PLURAL)

    const result = UserListSchema.safeParse(users) // Validate response with zod
    if (!result.success) {
      logActionError(VERB.GET, ENTITY_PLURAL, zod.prettifyError(result.error))
      return buildActionFailure(VERB.GET, ENTITY_PLURAL)
    }

    // now it's time to return only the data needed using DTO
    const safeData = toSafeUsersDTO(result.data)

    return {
      success: true,
      data: safeData,
      errors: null
    }
  } catch (error) {
    logActionError(VERB.GET, ENTITY_PLURAL, error)
    if (error instanceof Error && error.name?.includes('Error'))
      return handleMongoError(error, VERB.GET, ENTITY_PLURAL)
    return buildActionFailure(VERB.GET, ENTITY_PLURAL)
  }
}

// Get user by ID action
export async function getUserById(id: string) {
  // Validate user ID first
  validateUserId(id)

  // Use DAL for database operations
  try {
    const user = await userDAL.findById(id)
    if (!user) return notFoundError(ENTITY)

    const safeData = toSafeUserDTO(user)

    return {
      success: true,
      data: safeData,
      errors: null
    }
  } catch (error) {
    logActionError(VERB.GET, ENTITY, error)
    if (error instanceof Error && error.name?.includes('Error'))
      return handleMongoError(error, VERB.GET, ENTITY)
    return buildActionFailure(VERB.GET, ENTITY)
  }
}
