'use client'

import { useActionState } from 'react'
import FormSubmit from './ContactFormSubmit'

interface Props {
  action: (prevState: FormState, formData: FormData) => Promise<FormState>
}

interface FormState {
  errors: string[]
  success: boolean
}

export default function ContactForm({ action }: Props) {
  const [state, formAction] = useActionState<FormState, FormData>(action, {
    errors: [],
    success: false
  })

  return (
    <form
      data-cy='contact-form'
      action={formAction}
      className='mx-auto md:max-w-lg space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm max-w-fit md:w-350 dark:border-gray-800 dark:bg-gray-900'
    >
      <h2 className='text-lg font-semibold text-gray-900 dark:text-gray-100'>
        Contact me!
      </h2>

      <p className='text-gray-600 dark:text-gray-200'>
        Enter your email address.
      </p>
      <div className='space-y-2'>
        <label
          htmlFor='email'
          className='block text-sm font-medium text-gray-900 dark:text-gray-100'
        >
          Email
        </label>
        <input
          type='email'
          id='email'
          name='email'
          className='block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500'
          placeholder='Enter your email'
        />
      </div>

      <p className='text-gray-600 dark:text-gray-200'>
        Describe your request or feedback.
      </p>
      <div className='space-y-2'>
        <label
          htmlFor='content'
          className='block text-sm font-medium text-gray-900 dark:text-gray-100'
        >
          Content
        </label>
        <textarea
          id='content'
          name='content'
          rows={5}
          maxLength={255}
          className='block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500'
          placeholder='Write your message...'
        />
      </div>

      <div className='flex justify-between'>
        <FormSubmit />
      </div>

      {state.errors.length > 0 && (
        <ul
          className='mt-4 list-disc space-y-1 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/60 dark:text-red-200'
          role='alert'
        >
          {state.errors.map(error => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}

      {state.success && (
        <p
          role='status'
          className='mt-4 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 dark:border-emerald-900/60 dark:bg-emerald-950/60 dark:text-emerald-200'
        >
          Form submitted successfully!
        </p>
      )}
    </form>
  )
}
