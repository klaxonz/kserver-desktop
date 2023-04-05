<template>
  <div
    class="flex flex-row h-full w-full"
    style="
      font-family: PingFang SC, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
        Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol,
        Noto Color Emoji;
    "
  >
    <WebPageDrawer />
    <WebPageContent />
    <WebPageAddDialog />
    <WebPageWebview />
    <WebPageContentCardItemOperation />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import WebPageDrawer from '@/components/web-page/WebPageDrawer.vue'
import WebPageContent from '@/components/web-page/WebPageContent.vue'
import WebPageAddDialog from '@/components/web-page/WebPageAddDialog.vue'
import WebPageWebview from '@/components/web-page/WebPageWebview.vue'
import { useWebpageStore } from '@/stores'
import { getWebpageCardList, getDetail } from '@/interf/webpage'
import WebPageContentCardItemOperation from '@/components/web-page/WebPageContentCardItemOperation.vue'

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
