import ContactForm from './ContactForm'
import ContactSocials from './ContactSocials'
import { createContact } from '../actions/index'

interface Props {
  dataCy?: string
}

export function ContactWrapper({ dataCy = 'contact-wrapper' }: Props) {
  return (
    <div data-cy={dataCy} className='w-full'>
      <ContactForm action={createContact} />
      <ContactSocials className='my-6' />
    </div>
  )
  
}