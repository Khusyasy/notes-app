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
        <div class="flex flex-1 justify-end">
          <UButton @click="isModalOpen = !isModalOpen">
            Login
          </UButton>
        </div>
      </nav>
    </header>
    <UContainer class="p-4" style="min-height: calc(100vh - 4rem);">
      <div v-if="false">
        Some content
      </div>
      <UCard v-else>
        User is not logged in
      </UCard>
    </UContainer>
    <UModal v-model="isModalOpen">
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
const items = [{
  key: 'login',
  label: 'Login',
  description: 'Login to your account',
}, {
  key: 'register',
  label: 'Register',
  description: 'Create a new account',
}]

const isModalOpen = ref(false)
</script>
