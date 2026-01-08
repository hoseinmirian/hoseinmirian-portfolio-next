'use server'

export async function createContact(
  prevState: {
    errors: string[]
    success: boolean
  },
  formData: FormData
) {
    // const email = formData.get('email')
    // const content = formData.get('content')
  
  // 1 zod validation can be done here
  let errors: string[] = []
  if (errors.length > 0) return { errors, success: false }

  // 2 do the processing like sending email or storing in database
  return { success: true, errors: [] }
}

// export async function createPost(prevState, formData) {
//   const title = formData.get('title')
//   const image = formData.get('image')
//   const content = formData.get('content')
//
//   let errors = []
//
//   // if (!title || title.trim().length === 0) {
//   //   errors.push('Title is required.')
//   // }
//   //
//   // if (!content || content.trim().length === 0) {
//   //   errors.push('Content is required.')
//   // }
//   //
//   // if (!image || image.size === 0) {
//   //   errors.push('Image is required.')
//   // }
//   //
//   // if (errors.length > 0) {
//   //   return { errors }
//   // }
//
//   // await storePost({
//   //   imageUrl: '',
//   //   title,
//   //   content,
//   //   userId: 1
//   // })
//   //
//   // redirect('/feed')
// }