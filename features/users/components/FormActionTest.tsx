'use client'

import { useState, type FormEvent } from 'react'
import {
  createUser,
  updateUser,
  deleteUser,
  getUserById
} from '@/features/users/actions'
import { CreateUserSchema, UpdateUserSchema } from '@/dal/dto/user-dto'
import { useFormStatus } from 'react-dom'

interface FormActionTestProps {
  userId?: string
}

export function FormActionTest({ userId }: FormActionTestProps) {
  const [message, setMessage] = useState<string | null>(null)
  const [getById, setGetById] = useState('')
  const [errors, setErrors] = useState<string | null>(null)

  // Create User
  const handleCreate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrors(null)
    setMessage(null)

    // Extract form data
    const formData = new FormData(event.currentTarget)

    // Convert FormData to a plain object for validation
    const rawData = Object.fromEntries(formData)

    // Client-side validation with DTO
    const result = CreateUserSchema.safeParse(rawData)
    if (!result.success) {
      setErrors(result.error.message)
      return
    }

    // If validation passes, proceed to create user (also revalidate path, can be used for update/delete as well)
    const response = await createUser(result.data, {
      revalidatePath: '/form'
    })
    // if server returns errors, display them
    if (!response.success && response.errors) {
      setErrors(response.errors.message)
      return
    }

    setMessage(JSON.stringify(response, null, 2))
  }

  // Update User
  const handleUpdate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!userId) return
    setErrors(null)
    setMessage(null)

    const formData = new FormData(event.currentTarget)

    // Convert FormData to a plain object for validation
    const rawData = Object.fromEntries(formData)

    // Client-side validation with DTO
    const result = UpdateUserSchema.safeParse(rawData)
    if (!result.success) {
      setErrors(result.error.message)
      return
    }

    const response = await updateUser(userId, result.data)
    // if server returns errors, display them
    if (!response.success && response.errors) {
      setErrors(response.errors.message)
      return
    }

    setMessage(JSON.stringify(response, null, 2))
  }

  // Delete User
  const handleDelete = async () => {
    if (!userId) return
    setErrors(null)
    setMessage(null)

    const response = await deleteUser(userId)
    // if server returns errors, display them
    if (!response.success && response.errors) {
      setErrors(response.errors.message)
      return
    }

    setMessage(JSON.stringify(response, null, 2))
  }

  // Get User By ID
  const handleGetById = async () => {
    const id = getById
    if (!id) return
    setErrors(null)
    setMessage(null)
    const response = await getUserById(id)
    // if server returns errors, display them
    if (!response.success && response.errors) {
      setErrors(response.errors.message)
      return
    }

    setMessage(JSON.stringify(response, null, 2))
  }

  return (
    <div className='space-y-6'>
      {/* Create User Form */}
      <form onSubmit={handleCreate} className='space-y-2'>
        <label>
          Name
          <input name='name' />
        </label>
        <label>
          Email
          <input name='email' type='email' />
        </label>
        <CreateButton />
      </form>

      {/* Update User Form */}
      {userId && (
        <form onSubmit={handleUpdate} className='space-y-2'>
          <label>
            Name
            <input name='name' required />
          </label>
          <button type='submit'>Update User</button>
        </form>
      )}

      {/* Delete User */}
      {userId && <button onClick={handleDelete}>Delete User</button>}

      {/* Get User By ID */}
      <div>
        <input
          type='number'
          value={getById}
          onChange={e => setGetById(e.target.value)}
          placeholder='User ID'
        />
        <button onClick={handleGetById}>Get User</button>
      </div>

      {/* Output */}
      {message && (
        <div className='rounded p-2'>
          <pre>{message}</pre>
        </div>
      )}

      {errors && (
        <div className='rounded p-2 text-red-800'>
          <pre>{JSON.stringify(errors, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}

// example of using useFormStatus for pending state
function CreateButton() {
  const { pending } = useFormStatus()
  return (
    <button type='submit' disabled={pending}>
      {pending ? 'Creating...' : 'Create User'}
    </button>
  )
}
