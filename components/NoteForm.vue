<template>
  <!-- TODO: form input dibuat kayak modal gitu (?) -->
  <div class="max-w-[65ch] w-full" id="note-form">
    <div @click.capture="handleFocus">
      <UCard class="w-full h-min overflow-clip relative" :class="{ '!z-50': focused }" :ui="{ body: { padding: '' } }">
        <div class="flex flex-col">
          <input type="text" name="title" id="title" placeholder="Title" class="p-3 outline-none bg-transparent"
            autocomplete="off" v-model="noteFormStore.form.title" @focus="handleFocus" />
          <textarea name="content" id="content" placeholder="Take a note..."
            class="p-3 outline-none bg-transparent resize-none transition-all" autocomplete="off" :rows="textareaRows"
            v-model="noteFormStore.form.content" @focus="handleFocus"></textarea>

          <div class="flex justify-between items-center px-3 py-1 border-t border-gray-700">
            <div class="text-sm text-gray-400">
              {{ status }}
            </div>
            <button
              class="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 rounded-md px-1 py-0.5 text-sm text-gray-400 bg-transparent hover:text-gray-200 hover:bg-slate-800 focus:bg-slate-800 focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-gray-500 dark:focus-visible:ring-gray-400 transition-all"
              :disabled="noteFormStore.loading" @click="close" @focus="handleFocus" @blur="close">
              Close
            </button>
          </div>
        </div>
      </UCard>
    </div>
    <div class="fixed top-0 left-0 w-full h-full bg-black/55 !z-40 transition-all opacity-0"
      :class="{ 'opacity-100': focused }" v-show="focused" @click="close"></div>
  </div>
</template>

<script setup lang="ts">
const focused = ref(false)
const focusDebouncer = createDebouncer()
// TODO: disable / enable scroll pas focused
const handleFocus = focusDebouncer(() => {
  focused.value = true
}, 100)
const handleBlur = focusDebouncer(() => {
  focused.value = false
}, 100)
defineShortcuts({
  escape: {
    usingInput: true,
    whenever: [focused],
    handler: close
  }
})

const noteFormStore = useNoteFormStore()
const noteStore = useNoteStore()

watch(() => noteFormStore.note, () => {
  if (noteFormStore.note) {
    handleFocus()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
})

const textareaRows = ref(1)
watch(() => noteFormStore.form.content, () => {
  const rows = noteFormStore.form.content.split('\n').length
  if (rows > 5) return
  textareaRows.value = rows
})

async function save() {
  if (noteFormStore.loading) return
  await noteFormStore.save()
  await noteStore.getAll()
}
const saveDebouncer = createDebouncer()
const saveDebounced = saveDebouncer(save, 5 * 1000)
watch(() => noteFormStore.form.title, saveDebounced)
watch(() => noteFormStore.form.content, saveDebounced)

async function close() {
  await save()
  noteFormStore.reset()
  handleBlur()
}

const now = ref(Date.now())
const interval = setInterval(() => {
  now.value = Date.now()
}, 1000)
onUnmounted(() => {
  clearInterval(interval)
})

const status = computed(() => {
  if (noteFormStore.loading) return 'Saving...'
  if (noteFormStore.error) return noteFormStore.error
  if (noteFormStore?.note?.updatedAt) {
    return `Last saved ${relativeTime(noteFormStore.note.updatedAt, now.value)}`
  }
  return 'Not saved'
})

// TODO: undo redo manager
</script>

<style scoped>
</style>
