<template>
  <div
    class="flex flex-row h-full w-full"
    style="
      font-family: PingFang SC, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
        Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol,
        Noto Color Emoji;
    "
  >
    <WebPageSideBar />
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import WebPageSideBar from '@/components/common/WebPageSideBar.vue'
import { useWebpageStore } from '@/stores'
import { getWebpageCardList, getDetail } from '@/interf/webpage'

const store = useWebpageStore()

onMounted(() => {
  resetState()
  getDetail()

  store.page = 1
  const page = store.page
  getWebpageCardList(page)
})

function resetState() {
  store.text = ''
  store.webpageList = []
}
</script>

<style></style>
