<template>
  <UContainer>
    <UButton @click="showModal = true">Show Modal</UButton>
    <UModal v-model="showModal" title="Modal">
      <UCard>
        <p>Modal Content</p>
      </UCard>
    </UModal>
  </UContainer>
</template>

<script setup lang="ts">
const showModal = ref(false)
</script>
