<template>
  <el-dialog v-model="store.dialogVisible" width="60%" @close="stopWebView">
    <div id="webview-wrapper" style="height: 70vh">
      <webview id="webview" nodeintegration allowpopups class="w-full h-full"></webview>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { useWebpageStore } from '@/stores'

const store = useWebpageStore()

function stopWebView() {
  const wv = document.getElementById('webview')
  if (wv !== null) {
    wv.parentNode?.removeChild(wv)
  }
}
</script>

<style lang="scss" scoped></style>
