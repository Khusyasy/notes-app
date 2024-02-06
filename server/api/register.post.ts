import { z } from 'zod'

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string(),
  name: z.string(),
})

export default defineEventHandler(async (event) => {
  const { email, password, name } = await readValidatedBody(event, body => schema.parse(body))

  const user = await prisma.user.findUnique({
    where: { email: email }
  })
  if (user) {
    return jsendFail({
      errors: [
        { path: 'email', message: 'Account with this email already exists', }
      ]
    })
  }

  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashPassword(password),
      name
    }
  })

  const token = createJWTToken({ userId: newUser.id })
  setCookie(event, 'token', token)
  return jsendSuccess(true)
})
