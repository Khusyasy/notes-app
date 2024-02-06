import jwt from 'jsonwebtoken'

type JWTToken = {
  // iat: number;
  // exp: number;
  userId: number;
}

const secret = process.env.JWT_SECRET
if (!secret) {
  console.error('JWT_SECRET is not set')
  process.exit(1)
}

export const createJWTToken = (payload: JWTToken) => {
  return jwt.sign(payload, secret, { expiresIn: '7d' })
}

export const verifyJWTToken = (token: string) => {
  return jwt.verify(token, secret) as JWTToken | null
}
