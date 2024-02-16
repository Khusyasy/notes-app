export default defineEventHandler(async (event) => {
  if (!event.context.auth) {
    return jsendFail({
      error: 'Not authenticated',
    })
  }

  const notes = await prisma.note.findMany({
    where: {
      userId: event.context.auth?.id,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  })
  return jsendSuccess(notes)
})
