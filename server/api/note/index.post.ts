import { z } from 'zod'

const schema = z.object({
  title: z.string(),
  content: z.string(),
})

export default defineEventHandler(async (event) => {
  const { title, content } = await readValidatedBody(event, body => schema.parse(body))
  if (!event.context.auth) {
    return jsendFail({
      error: 'Not authenticated',
    })
  }

  if (title === '' && content === '') {
    return jsendFail({
      error: 'Title or content are required',
    })
  }

  const note = await prisma.note.create({
    data: {
      title,
      content,
      userId: event.context.auth.id,
    },
  })

  return jsendSuccess(note)
})
