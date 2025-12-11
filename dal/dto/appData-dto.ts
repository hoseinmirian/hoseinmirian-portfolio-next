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
    about: {
      name: 'Sample About Title',
      email: '',
      phone: '',
      address: '',
      cv_link: '',
      age: '',
      biography: '',
      full_summary: '',
      nationality: '',
      degree: '',
      remote_availability: '',
      years_experience: ''
    },
    hero: {
      title: 'Sample Hero Title',
      subtitle: 'Sample Hero Subtitle'
    },
    portfolio: [],
    resume: [],
    education: [],
    social: [],
    services: [],
    skills: [],
    description: {
      singletonKey: 'description_singleton',
      skills: 'Sample skills description',
      services: 'Sample services description'
    }
  }

  return {
    id: base.id!,
    ...(base as Omit<AppDataType, 'id'>),
    ...(overrides ?? {})
  }
}
