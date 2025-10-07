import mongoose from 'mongoose'
import { z } from 'zod'
const { Schema, model } = mongoose

// 1. Define the Zod schema first
export const UserZodSchema = z.object({
  id: z.string().optional(), // optional because MongoDB will generate it
  name: z.string().min(1, 'Please tell us your name').toLowerCase(),
  email: z.email('Please provide a valid email').toLowerCase(),
  photo: z.string().optional().default('default.jpg'),
  active: z.boolean().optional().default(true)
})

// 2. Infer the type from Zod schema
export type UserType = z.infer<typeof UserZodSchema>

// 3. Define the schema using Zod-compatible structure
const userSchema = new Schema<UserType>(
  {
    name: {
      type: String,
      required: [true, 'Please tell us your name'],
      lowercase: true
    },
    email: {
      type: String,
      required: [true, 'Please provide a valid email'],
      unique: true,
      lowercase: true
    },
    photo: {
      type: String,
      default: 'default.jpg'
    },
    active: {
      type: Boolean,
      default: true
      // select: false // hide from queries by default but we have done it in dto layer (can be done either way)
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    versionKey: false
  }
)

// 4. Create model
const User = mongoose.models?.User || model<UserType>('User', userSchema)

export default User
