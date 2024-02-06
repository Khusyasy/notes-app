import { z } from 'zod'

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string()
})

export default defineEventHandler(async (event) => {
  const { email, password } = await readValidatedBody(event, body => schema.parse(body))

  const user = await prisma.user.findUnique({
    where: { email: email }
  })
  if (!user) {
    return jsendFail({
      error: 'Email or password is incorrect',
    })
  }

  if (!verifyPassword(password, user.password)) {
    return jsendFail({
      error: 'Email or password is incorrect',
    })
  }

  const token = createJWTToken({ userId: user.id })
  setCookie(event, 'token', token, { maxAge: 60 * 60 * 24 * 7 })
  return jsendSuccess(true)
})
