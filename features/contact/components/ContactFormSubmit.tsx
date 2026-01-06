'use client'

import { useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'

export default function FormSubmit() {
  const { pending } = useFormStatus()

  return (
    <>
      <Button variant='secondary' type='reset' className='cursor-pointer' disabled={pending}>
        Reset
      </Button>
      <Button type='submit' className='cursor-pointer' disabled={pending}>
        {pending ? <span className="flex items-center gap-1"> <Spinner />
          Submitting</span> : 'Submit'}
      </Button>
    </>
  )
}
