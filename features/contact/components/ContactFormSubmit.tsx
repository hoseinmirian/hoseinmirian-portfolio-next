'use client'

import { useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'


export default function FormSubmit() {
  const status = useFormStatus()

  if (status.pending) {
    return <p>Posting form...</p>
  }

  return (
    <>
      <Button type='reset' className='cursor-pointer'>
        Reset
      </Button>
      <Button type='submit' className='cursor-pointer'>
        Submit
      </Button>
    </>
  )
}
