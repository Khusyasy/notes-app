import { z } from 'zod'

const schema = z.object({
  title: z.string().optional(),
  content: z.string(),
})

export default defineEventHandler(async (event) => {
  const { title, content } = await readValidatedBody(event, body => schema.parse(body))
  const id = parseInt(getRouterParam(event, 'id') ?? '')
  if (Number.isNaN(id)) {
    return jsendFail({
      error: 'Invalid note id',
    })
  }
  if (!event.context.auth) {
    return jsendFail({
      error: 'Not authenticated',
    })
  }

  const note = await prisma.note.update({
    where: { id },
    data: {
      title,
      content,
    },
  })

  return jsendSuccess(note)
})
