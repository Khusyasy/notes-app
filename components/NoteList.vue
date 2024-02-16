<template>
  <!-- <div v-if="pending">
    Loading...
  </div>
  <div v-else-if="error">
    {{ error.message }}
  </div> -->
  <!-- <div v-else-if="data?.status === 'fail'">
    {{ data?.data.error }}
  </div> -->
  <div class="pt-4 w-full flex flex-wrap justify-center items-center gap-4">
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
            {{ note.updatedAt }}
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
</script>

<style scoped>
</style>
