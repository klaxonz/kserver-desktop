<template>
  <div class="flex-1 border-gray-200 border-solid border" style="background-color: #edeff3">
    <div class="h-full ml-5 mr-5 mt-5 flex flex-col">
      <WebPageContentHeader />

      <WebPageContentOperation />

      <WebPageContentCardList />
    </div>
  </div>
</template>

<script setup lang="ts">
import WebPageContentHeader from '@/components/web-page/WebPageContentHeader.vue'
import WebPageContentOperation from '@/components/web-page/WebPageContentOperation.vue'
import WebPageContentCardList from '@/components/web-page/WebPageContentCardList.vue'

defineEmits([
  'search',
  'add-page',
  'scroll',
  'left-click',
  'right-click',
  'mouse-enter',
  'mouse-leave',
  'update-check',
  'update-search-value',
  'batch-star-operation',
  'batch-exit-operation',
  'batch-delete-operation'
])
</script>

<style lang="scss" scoped></style>
