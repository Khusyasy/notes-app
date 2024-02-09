<template>
  <div @click.capture="handleFocus">
    <UCard class="w-full h-min overflow-clip !z-50 relative" :ui="{ body: { padding: '' } }">
      <UForm ref="form" :schema="schema" :state="state" @submit="onSubmit" class="flex flex-col">
        <input type="text" name="title" id="title" placeholder="Title" class="p-3 outline-none bg-transparent"
          v-model="state.title" @focus="handleFocus" @blur="handleBlur" />
        <textarea name="content" id="content" placeholder="Take a note..."
          class="p-3 outline-none bg-transparent resize-none transition-all" :rows="textareaRows" v-model="state.content"
          @focus="handleFocus" @blur="handleBlur"></textarea>

        <div class="flex justify-between items-center px-3 py-1 border-t border-gray-700">
          <div class="text-sm text-gray-400">
            {{ status }}
          </div>
          <button type="submit"
            class="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 rounded-md px-1 py-0.5 text-sm text-gray-400 bg-transparent hover:text-gray-200 hover:bg-slate-800 focus:bg-slate-800 focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-gray-500 dark:focus-visible:ring-gray-400 transition-all"
            :loading="loading" @focus="handleFocus" @blur="handleBlur">
            Save
          </button>
        </div>
      </UForm>
    </UCard>
  </div>
  <div class="fixed top-0 left-0 w-full h-full bg-black/30 !z-40" v-show="focused" @click="handleBlur"></div>
</template>

<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types';

const focused = ref(false)
const handleFocus = () => {
  focused.value = true
}
const handleBlur = () => {
  focused.value = false
}

const schema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
}).refine(data => data.title || data.content, {
  message: 'Either title or content must be filled',
  path: ['content'],
})

type Schema = z.output<typeof schema>

const state = useNoteFormStore()

const form = ref<HTMLFormElement>()

const textareaRows = ref(1)
watch(() => state.content, () => {
  const rows = state.content.split('\n').length
  if (rows > 5) return
  textareaRows.value = rows
})

const loading = ref(false)
async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true
  console.log('submitting', event.data)
  await new Promise(resolve => setTimeout(resolve, 3 * 1000))
  loading.value = false
}

const status = computed(() => {
  if (loading.value) return 'Saving...'
  // if (saved.value) return `Last saved at ${saved.value}`
  return 'Not saved'
})

// TODO: undo redo manager
</script>

<style scoped>
</style>
