import { Schema, model, models } from 'mongoose'
import { z } from 'zod'

// Centralized enum lists
const SOCIAL_PLATFORMS = ['github', 'linkedin', 'email', 'website', 'youtube'] as const
const SKILL_LEVELS = ['Intermediate', 'Advanced', 'Expert'] as const

// 1. Define the Zod schema first
export const AppDataZodSchema = z.object({
  about: z.object({
    name: z.string().optional(),
    biography: z.string().optional(),
    cv_link: z.url().optional(),
    age: z.string().optional(),
    full_summary: z.string().optional(),
    address: z.string().optional(),
    email: z.email().optional(),
    phone: z.string().optional(),
    nationality: z.string().optional(),
    degree: z.string().optional(),
    remote_availability: z.string().optional(),
    years_experience: z.string().optional(),
  }).optional(),
  hero: z.object({
    title: z.string().optional(),
    subtitle: z.string().optional(),
  }).optional(),
  portfolio: z.array(z.object({
    title: z.string().optional(),
    type: z.string().optional(),
    img: z.string().optional(),
    organization: z.string().optional(),
    location: z.string().optional(),
    role: z.string().optional(),
    description: z.string().optional(),
    website: z.url().optional(),
    source_code: z.url().optional(),
    techs: z.array(z.string()).optional(),
  })).optional(),
  resume: z.array(z.object({
    organization: z.string().optional(),
    location: z.string().optional(),
    from: z.string().optional(),
    to: z.string().optional(),
    role: z.string().optional(),
    website: z.url().optional(),
    bullet_points: z.array(z.string()).optional(),
  })).optional(),
  education: z.array(z.object({
    certificate_name: z.string().optional(),
    from: z.string().optional(),
    to: z.string().optional(),
    organization: z.string().optional(),
    description: z.string().optional(),
  })).optional(),
  social: z.array(z.object({
    platform: z.enum(SOCIAL_PLATFORMS).optional(),
    url: z.url().optional(),
    icon: z.string().optional(),
  })).optional(),
  services: z.array(z.object({
    icon: z.string().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
  })).optional(),
  skills: z.array(z.object({
    title: z.string().optional(),
    level: z.enum(SKILL_LEVELS).optional(),
  })).optional(),
  description: z.object({
    singletonKey: z.string().optional(),
    skills: z.string().optional(),
    services: z.string().optional(),
  }).optional(),
})

// 2. Infer the type from Zod schema
export type AppDataType = z.infer<typeof AppDataZodSchema>

// --- Hero ---
const HeroSchema = new Schema(
  {
    title: String,
    subtitle: String,
  }
)

// --- About ---
const AboutSchema = new Schema(
  {
    name: String,
    biography: String,
    cv_link: String,
    age: String,
    full_summary: String,
    address: String,
    email: String,
    phone: String,
    nationality: String,
    degree: String,
    remote_availability: String,
    years_experience: String,
  }
)

// --- Portfolio ---
const PortfolioSchema = new Schema(
  {
    title: String,
    type: String,
    img: String,
    organization: String,
    location: String,
    role: String,
    description: String,
    website: String,
    source_code: String,
    techs: [String],
  }
)

// --- Resume / Experience ---
const ResumeSchema = new Schema(
  {
    organization: String,
    location: String,
    from: String,
    to: String,
    role: String,
    website: String,
    bullet_points: [String],
  }
)

// --- Education ---
const EducationSchema = new Schema(
  {
    certificate_name: String,
    from: String,
    to: String,
    organization: String,
    description: String,
  }
)

// --- Social ---
const SocialSchema = new Schema(
  {
    platform: {
      type: String,
      enum: SOCIAL_PLATFORMS,
    },
    url: String,
    icon: String,
  }
)

// --- Service ---
const ServiceSchema = new Schema(
  {
    icon: String,
    title: String,
    description: String,
  }
)

// --- Skill ---
const SkillSchema = new Schema(
  {
    title: String,
    level: {
      type: String,
      enum: SKILL_LEVELS,
    },
  }
)

// --- Descriptions ---
// Unique singletonKey here enforces only one document (acts like a singleton collection).
const DescriptionSchema = new Schema(
  {
    singletonKey: { type: String, default: 'singleton', unique: true, immutable: true },
    skills: String,
    services: String,
  }
)

// 3. Define the schema
const appDataSchema = new Schema<AppDataType>(
  {
    about: AboutSchema,
    hero: HeroSchema,
    portfolio: { type: [PortfolioSchema], default: [] },
    resume: { type: [ResumeSchema], default: [] },
    education: { type: [EducationSchema], default: [] },
    social: { type: [SocialSchema], default: [] },
    services: { type: [ServiceSchema], default: [] },
    skills: { type: [SkillSchema], default: [] },
    description: DescriptionSchema,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    versionKey: false,
  }
)

// 4. Create model
const AppData = models?.AppData || model<AppDataType>('AppData', appDataSchema)

export default AppData