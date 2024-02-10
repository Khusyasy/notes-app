declare module 'h3' {
  interface H3EventContext {
    auth: {
      id: number
      email: string
      name: string
    } | null
  }
}

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'token')
  if (token) {
    const payload = verifyJWTToken(token)
    if (payload) {
      const user = await prisma.user.findUnique({
        where: { id: payload.userId },
        select: { id: true, email: true, name: true },
      })

      if (user) {
        event.context.auth = user
      } else {
        event.context.auth = null
      }
    }
  }
})
