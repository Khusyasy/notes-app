import jwt from 'jsonwebtoken'

const secret = process.env.JWT_SECRET
if (!secret) {
  console.error('JWT_SECRET is not set')
  process.exit(1)
}

export const createJWTToken = (payload: any) => {
  return jwt.sign(payload, secret, { expiresIn: '1h' })
}

export const verifyJWTToken = (token: string) => {
  return jwt.verify(token, secret)
}
