export function createDebouncer() {
  let timeout: NodeJS.Timeout | null = null

  return (fn: () => void, ms: number = 200) => {
    return () => {
      if (timeout) {
        clearTimeout(timeout)
      }

      timeout = setTimeout(() => {
        fn()
        timeout = null
      }, ms)
    }
  }
}
