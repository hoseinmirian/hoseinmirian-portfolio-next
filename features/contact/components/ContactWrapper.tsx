import ContactForm from './ContactForm'
import ContactSocials from './ContactSocials'
import { createContact } from '../actions/index'

export default function ContactWrapper() {
  return (
    <>
      <ContactForm action={createContact} />
      <ContactSocials className='my-6' />
    </>
  )
  
}