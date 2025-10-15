//  DTO Definition (contract)
import * as z from 'zod'
import { AppDataZodSchema } from '@/db/models/appDataModel'

// -------------------Base definition--------------------
export const AppDataSchema = AppDataZodSchema.extend({ id: z.string() })
export type AppDataType = z.infer<typeof AppDataSchema>

export const CreateAppDataSchema = AppDataSchema.omit({ id: true })
export type CreateAppDataType = z.infer<typeof CreateAppDataSchema>

export const UpdateAppDataSchema = AppDataSchema.partial().omit({ id: true })
export type UpdateAppDataType = z.infer<typeof UpdateAppDataSchema>

export const AppDataIdSchema = z.string()

// -------------------Testing utilities--------------------
// Factory function to create UserDTO instances
// for unit testing purposes
export const createAppDataDTO = (overrides?: Partial<AppDataType>) => {
  const base: Partial<AppDataType> = {
    id: '1',
  }
  
  return { ...base, ...overrides }
}
