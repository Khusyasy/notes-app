<template>
  <div class="pt-4 w-full flex flex-wrap justify-center items-center gap-4">
    <!-- TODO: cari loading indikator yang lebih bagus -->
    <!-- <UCard v-for="i in (noteStore.loading ? 8 : 0)" class="overflow-clip relative cursor-pointer" :key="i"
      :ui="{ body: { padding: '' } }">
      <div class="flex flex-col w-[30ch] min-h-[25ch]">
        <div class="p-3 outline-none bg-transparent">
          <USkeleton class="h-8 w-full" />
        </div>
        <div class="p-3 outline-none bg-transparent whitespace-pre-line">
          <USkeleton class="h-32 w-full" />
        </div>
      </div>
    </UCard> -->

    <UCard v-for="note in noteStore.notes" class="overflow-clip relative cursor-pointer" :key="note.id"
      :ui="{ body: { padding: '' } }" @click="noteFormStore.changeNote(note)">
      <div class="flex flex-col w-[30ch] min-h-[25ch]">
        <div class="p-3 outline-none bg-transparent" v-show="note.title !== ''">
          {{ note.title }}
        </div>
        <div class="p-3 outline-none bg-transparent whitespace-pre-line" v-show="note.content !== ''">
          {{ note.content }}
        </div>
        <div class="flex flex-1"></div>
        <div class="flex justify-between items-center px-3 py-1 border-t border-gray-700">
          <div class="text-sm text-gray-400">
            {{ formatDate(note.createdAt) }}
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
const noteFormStore = useNoteFormStore()
const noteStore = useNoteStore()
useAsyncData(() => noteStore.getAll())

const toast = useToast()
watch(() => noteStore.error, () => {
  if (noteStore.error) {
    toast.add({ title: noteStore.error, color: 'red' })
  }
})
</script>

<style scoped>
</style>
