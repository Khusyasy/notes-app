type AuthUser = {
  id: number;
  email: string;
  name: string;
}

export const useAuthStore = defineStore('authStore', {
  state: (): {
    user: null | AuthUser
  } => ({
    user: null
  }),
  actions: {
    async check() {
      const response = await $fetch('/api/auth')
      if (response.status === 'fail') {
        this.user = null
      } else {
        this.user = response.data
      }
    },
  }
})
