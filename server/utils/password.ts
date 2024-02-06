import brcypt from 'bcryptjs'

const SALT_ROUNDS = 12

export const hashPassword = (password: string) => {
  return brcypt.hashSync(password, SALT_ROUNDS)
}

export const verifyPassword = (password: string, hashedPassword: string) => {
  return brcypt.compareSync(password, hashedPassword)
}
