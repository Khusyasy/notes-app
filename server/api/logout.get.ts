export default defineEventHandler(async (event) => {
  setCookie(event, 'token', '', { maxAge: 0 })
  return jsendSuccess(true)
})
