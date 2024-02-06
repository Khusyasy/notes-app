<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UAlert v-if="generalErrors" icon="i-heroicons-exclamation-circle" color="red" variant="solid"
      :title="generalErrors" />

    <UFormGroup label="Email" name="email">
      <UInput v-model="state.email" />
    </UFormGroup>

    <UFormGroup label="Password" name="password">
      <UInput v-model="state.password" type="password" />
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
  password: z.string()
})

type Schema = z.output<typeof schema>

const state = reactive({
  email: undefined,
  password: undefined
})

const generalErrors = ref<string | null>(null)

async function onSubmit(event: FormSubmitEvent<Schema>) {
  generalErrors.value = null
  const response = await $fetch('/api/login', {
    method: 'post',
    body: event.data
  })
  if (response.status === 'fail') {
    generalErrors.value = response.data.error
  } else {
    // TODO: redirect to dashboard
  }
}
</script>

<style scoped>
</style>
