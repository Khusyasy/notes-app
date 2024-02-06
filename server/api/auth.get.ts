export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'token')

  if (!token) {
    return jsendFail({
      error: 'Not authenticated',
    })
  }

  const payload = verifyJWTToken(token)
  if (!payload) {
    return jsendFail({
      error: 'Not authenticated',
    })
  }

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: { id: true, email: true, name: true },
  })

  if (!user) {
    return jsendFail({
      error: 'Not authenticated',
    })
  }

  return jsendSuccess(user)
})
