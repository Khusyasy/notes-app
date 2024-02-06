<template>
  <UForm ref="form" :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormGroup label="Full Name" name="name">
      <UInput v-model="state.name" />
    </UFormGroup>

    <UFormGroup label="Email" name="email">
      <UInput v-model="state.email" />
    </UFormGroup>

    <UFormGroup label="Password" name="password">
      <UInput v-model="state.password" type="password" />
    </UFormGroup>

    <UFormGroup label="Password Confirmation" name="passwordConfirmation">
      <UInput v-model="state.passwordConfirmation" type="password" />
    </UFormGroup>

    <UButton type="submit">
      Submit
    </UButton>
  </UForm>
</template>

<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string(),
  passwordConfirmation: z.string(),
  name: z.string(),
}).refine(data => data.password === data.passwordConfirmation, {
  message: 'Passwords do not match',
  path: ['passwordConfirmation'],
})

type Schema = z.output<typeof schema>

const state = reactive({
  email: undefined,
  password: undefined,
  passwordConfirmation: undefined,
  name: undefined,
})

const authStore = useAuthStore()

const form = ref<HTMLFormElement>()

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const response = await $fetch('/api/register', {
    method: 'post',
    body: event.data
  })
  if (response.status === 'fail') {
    form.value?.setErrors(response.data.errors)
  } else {
    authStore.check()
  }
}
</script>

<style scoped>
</style>
