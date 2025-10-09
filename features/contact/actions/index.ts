'use server'

export async function createContact(data: FormData) {
  console.log('Contact form submitted:', Object.fromEntries(data.entries()))
  return { success: true }
}