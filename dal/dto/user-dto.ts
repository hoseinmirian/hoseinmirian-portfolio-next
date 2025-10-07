// dto/user.ts
//  DTO Definition (contract)
import * as z from 'zod'
import { UserZodSchema } from '@/db/models/userModel'

// -------------------Base definition--------------------
export const UserSchema = UserZodSchema.extend({ id: z.string() })
export type UserType = z.infer<typeof UserSchema>

export const CreateUserSchema = UserSchema.omit({ id: true })
export type CreateUserType = z.infer<typeof CreateUserSchema>

export const UpdateUserSchema = UserSchema.partial().omit({ id: true })
export type UpdateUserType = z.infer<typeof UpdateUserSchema>

export const UserIdSchema = z.string()

export const UserListSchema = z.array(UserSchema)
export type UserListType = z.infer<typeof UserListSchema>

// -------------------DTO functions--------------------
// used to strip out sensitive info
export const toSafeUserDTO = (user: UserType) => {
  const { active, ...rest } = user
  void active
  return rest
}

export const toSafeUsersDTO = (users: UserType[]) => users.map(toSafeUserDTO)

// -------------------Testing utilities--------------------
// Factory function to create UserDTO instances
// for unit testing purposes
export const createUserDTO = (overrides?: Partial<UserType>) => {
  const base: Partial<UserType> = {
    id: '1',
    name: 'Default User',
    email: 'default@example.com'
  }

  // Validate with Zod so factory never produces invalid DTOs
  return { ...base, ...overrides }
}
