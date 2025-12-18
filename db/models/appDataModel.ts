import { Schema, model, models } from 'mongoose'
import { z } from 'zod'

// Centralized enum lists
const SOCIAL_PLATFORMS = ['github', 'linkedin', 'email', 'website', 'youtube'] as const
const SKILL_LEVELS = ['Intermediate', 'Advanced', 'Expert'] as const

// 1. Define the Zod schema first
export const AppDataZodSchema = z.object({
  about: z.object({
    name: z.string(),
    biography: z.string(),
    cv_link: z.string(),
    age: z.string(),
    full_summary: z.string(),
    address: z.string(),
    email: z.email(),
    phone: z.string(),
    nationality: z.string(),
    degree: z.string(),
    remote_availability: z.string(),
    years_experience: z.string(),
  }).optional(),
  hero: z.object({
    title: z.string(),
    subtitle: z.string(),
  }).optional(),
  portfolio: z.array(z.object({
    title: z.string(),
    type: z.string(),
    img: z.string(),
    organization: z.string(),
    location: z.string(),
    role: z.string(),
    description: z.string(),
    website: z.string(),
    source_code: z.string(),
    techs: z.array(z.string()),
    order: z.number(),
  })).optional(),
  resume: z.array(z.object({
    organization: z.string(),
    location: z.string(),
    from: z.string(),
    to: z.string(),
    role: z.string(),
    website: z.string(),
    bullet_points: z.array(z.string()),
  })).optional(),
  education: z.array(z.object({
    certificate_name: z.string(),
    from: z.string(),
    to: z.string(),
    organization: z.string(),
    description: z.string(),
  })).optional(),
  social: z.array(z.object({
    platform: z.enum(SOCIAL_PLATFORMS),
    url: z.url(),
    icon: z.string(),
  })).optional(),
  services: z.array(z.object({
    icon: z.string(),
    title: z.string(),
    description: z.string(),
  })).optional(),
  skills: z.array(z.object({
    title: z.string(),
    level: z.enum(SKILL_LEVELS),
  })).optional(),
  description: z.object({
    singletonKey: z.string(),
    skills: z.string(),
    services: z.string(),
  }).optional(),
})


// 2. Infer the type from Zod schema
export type AppDataType = z.infer<typeof AppDataZodSchema>
export type AboutType = NonNullable<z.infer<typeof AppDataZodSchema>['about']>
export type HeroType = NonNullable<z.infer<typeof AppDataZodSchema>['hero']>
export type PortfolioType = NonNullable<z.infer<typeof AppDataZodSchema>['portfolio']>[number]
export type ResumeType = NonNullable<z.infer<typeof AppDataZodSchema>['resume']>[number]
export type EducationType = NonNullable<z.infer<typeof AppDataZodSchema>['education']>[number]
export type SocialType = NonNullable<z.infer<typeof AppDataZodSchema>['social']>[number]
export type ServiceType = NonNullable<z.infer<typeof AppDataZodSchema>['services']>[number]
export type SkillType = NonNullable<z.infer<typeof AppDataZodSchema>['skills']>[number]
export type DescriptionType = NonNullable<z.infer<typeof AppDataZodSchema>['description']>

// --- Hero ---
const HeroSchema = new Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
  },
)

// --- About ---
const AboutSchema = new Schema(
  {
    name: { type: String, required: true },
    biography: { type: String, required: true },
    cv_link: { type: String, required: true },
    age: { type: String, required: true },
    full_summary: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    nationality: { type: String, required: true },
    degree: { type: String, required: true },
    remote_availability: { type: String, required: true },
    years_experience: { type: String, required: true },
  },
)

// --- Portfolio ---
const PortfolioSchema = new Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  img: { type: String, required: true },
  organization: { type: String, required: true },
  location: { type: String, required: true },
  role: { type: String, required: true },
  description: { type: String, required: true },
  website: { type: String, required: true },
  source_code: { type: String, required: true },
  techs: { type: [String], required: true },
  order: { type: Number, required: true, index: true }
})

// --- Resume / Experience ---
const ResumeSchema = new Schema(
  {
    organization: { type: String, required: true },
    location: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    role: { type: String, required: true },
    website: { type: String, required: true },
    bullet_points: { type: [String], required: true },
  },
)

// --- Education ---
const EducationSchema = new Schema(
  {
    certificate_name: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    organization: { type: String, required: true },
    description: { type: String, required: true },
  },
)

// --- Social ---
const SocialSchema = new Schema(
  {
    platform: {
      type: String,
      enum: SOCIAL_PLATFORMS,
      required: true,
    },
    url: { type: String, required: true },
    icon: { type: String, required: true },
  },
)

// --- Service ---
const ServiceSchema = new Schema(
  {
    icon: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
)

// --- Skill ---
const SkillSchema = new Schema(
  {
    title: { type: String, required: true },
    level: {
      type: String,
      enum: SKILL_LEVELS,
      required: true,
    },
  },
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
    about: { type: AboutSchema, default: {} },
    hero: { type: HeroSchema, default: {} },
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