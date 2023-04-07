<template>
  <div>
    <div class="font-semibold text-lg ml-3">{{ props.title }}</div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: String
})
</script>

<style scoped></style>
