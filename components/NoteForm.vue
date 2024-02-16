<template>
  <div class="max-w-[65ch] w-full" id="note-form">
    <div @click.capture="handleFocus">
      <UCard class="w-full h-min overflow-clip relative" :class="{ '!z-50': focused }" :ui="{ body: { padding: '' } }">
        <div class="flex flex-col">
          <input type="text" name="title" id="title" placeholder="Title" class="p-3 outline-none bg-transparent"
            autocomplete="off" v-model="noteFormStore.title" @focus="handleFocus" />
          <textarea name="content" id="content" placeholder="Take a note..."
            class="p-3 outline-none bg-transparent resize-none transition-all" autocomplete="off" :rows="textareaRows"
            v-model="noteFormStore.content" @focus="handleFocus"></textarea>

          <div class="flex justify-between items-center px-3 py-1 border-t border-gray-700">
            <div class="text-sm text-gray-400">
              {{ status }}
            </div>
            <button
              class="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 rounded-md px-1 py-0.5 text-sm text-gray-400 bg-transparent hover:text-gray-200 hover:bg-slate-800 focus:bg-slate-800 focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-gray-500 dark:focus-visible:ring-gray-400 transition-all"
              :disabled="loading" @click="close" @focus="handleFocus" @blur="handleBlur">
              Close
            </button>
          </div>
        </div>
      </UCard>
    </div>
    <div class="fixed top-0 left-0 w-full h-full bg-black/30 !z-40" v-show="focused" @click="handleBlur"></div>
  </div>
</template>

<script setup lang="ts">
const focused = ref(false)
const focusDebouncer = createDebouncer()
const handleFocus = focusDebouncer(() => {
  focused.value = true
}, 100)
const handleBlur = focusDebouncer(() => {
  focused.value = false
}, 100)

const noteFormStore = useNoteFormStore()
const noteStore = useNoteStore()

const textareaRows = ref(1)
watch(() => noteFormStore.content, () => {
  const rows = noteFormStore.content.split('\n').length
  if (rows > 5) return
  textareaRows.value = rows
})

const loading = ref(false)

async function save() {
  if (loading.value) return
  if (noteFormStore.title === '' && noteFormStore.content === '') return
  loading.value = true
  await noteFormStore.save()
  await noteStore.getAll()
  loading.value = false
}
const saveDebouncer = createDebouncer()
const saveDebounced = saveDebouncer(save, 5 * 1000) // TODO: autosave kalo ada perubahan aja
watch(() => noteFormStore.title, saveDebounced)
watch(() => noteFormStore.content, saveDebounced)

async function close() {
  await save()
  noteFormStore.reset()
  handleBlur()
}

const hourFormat = new Intl.DateTimeFormat('en', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false })
const status = computed(() => {
  if (loading.value) return 'Saving...'
  // TODO: make date a relative time
  if (noteFormStore.id) return `Last saved at ${hourFormat.format(noteFormStore.updatedAt)}`
  return 'Not saved'
})

// TODO: undo redo manager
</script>

<style scoped>
</style>
