<template>
  <div class="mt-5 h-screen flex-1" style="overflow-x: scroll" @scroll="$emit('scroll')">
    <div class="grid" style="grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); grid-gap: 20px 20px">
      <WebPageContentCardItem v-for="webpage in store.webpageList" :key="webpage.id" :webpage="webpage" />
    </div>
  </div>
</template>

<script setup lang="ts">
import WebPageContentCardItem from '@/components/web-page/WebPageContentCardItem.vue'
import { useWebpageStore } from '@/stores'
import { WebPage } from '@/type/webPage'

defineEmits(['scroll', 'left-click', 'right-click', 'mouse-enter', 'mouse-leave', 'update-check'])

const store = useWebpageStore()
</script>

<style lang="scss" scoped></style>
