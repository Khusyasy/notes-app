<template>
  <div class="min-h-screen bg-gray-900">
    <header class="bg-gray-900 border-b border-gray-500 h-16 sticky top-0">
      <nav class="mx-auto px-4 flex items-center justify-between h-16 max-w-7xl" aria-label="Global">
        <div class="flex">
          <NuxtLink to="/" class="-m-1.5 p-1.5">
            <span class="sr-only">Khus Notes</span>
            <h2 class="text-white">Khus Notes</h2>
          </NuxtLink>
        </div>
        <div class="flex flex-1 gap-4 items-center justify-end" v-if="authStore.user">
          <div>
            Logged in as, {{ authStore.user.name }}
          </div>
          <UButton @click="logout()">
            Logout
          </UButton>
        </div>
        <div class="flex flex-1 gap-4 items-center justify-end" v-else>
          <UButton @click="isAuthModalOpen = !isAuthModalOpen">
            Login
          </UButton>
        </div>
      </nav>
    </header>
    <UContainer class="p-4 flex justify-center" style="min-height: calc(100vh - 4rem);">
      <div v-if="!authStore.user">
        <UCard>
          User is not logged in
        </UCard>
      </div>
      <div class="max-w-[65ch] w-full h-min" v-else>
        <NoteForm />
      </div>
    </UContainer>
    <UModal v-model="isAuthModalOpen">
      <UCard>
        <UTabs :items="items" class="w-full">
          <template #item="{ item }">
            <p class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              {{ item.label }}
            </p>
            <p class="mt-1 mb-3 text-sm text-gray-500 dark:text-gray-400">
              {{ item.description }}
            </p>

            <LoginForm v-if="item.key === 'login'" />
            <RegisterForm v-else-if="item.key === 'register'" />
          </template>
        </UTabs>
      </UCard>
    </UModal>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore()
useAsyncData(() => authStore.check())

const items = [{
  key: 'login',
  label: 'Login',
  description: 'Login to your account',
}, {
  key: 'register',
  label: 'Register',
  description: 'Create a new account',
}]

const isAuthModalOpen = ref(false)

watchEffect(() => {
  if (authStore.user && isAuthModalOpen.value) {
    isAuthModalOpen.value = false
  }
})

async function logout() {
  const response = await $fetch('/api/logout')
  if (response.status === 'success') {
    authStore.check()
  }
}
</script>
