<template>
  <transition name="contexmenu">
    <div
      v-if="store.visible"
      class="absolute h-120px w-160px bg-light-50 shadow-xl rounded-md shadow-md text-sm text-gray-500 pt-4px overflow-hidden"
      :style="{ top: store.top + 'px', left: store.left + 'px', zIndex: 1000 }"
    >
      <div
        class="hover:bg-gray-200 hover:rounded-md hover:cursor-pointer h-30px flex justify-start items-center ml-6px mr-4px mt-8px"
        @click="openUrl(store.webpage.url)"
      >
        <div class="flex justify-start items-center">
          <View style="width: 1em; height: 1em; margin-left: 10px" />
          <p class="ml-10px">访问网页</p>
        </div>
      </div>
      <div
        class="hover:bg-gray-200 hover:rounded-md hover:cursor-pointer h-30px flex justify-start items-center ml-6px mr-4px mt-4px"
        @click="copyUrl(store.webpage.url)"
      >
        <div class="flex justify-start items-center">
          <Link style="width: 1em; height: 1em; margin-left: 10px" />
          <p class="ml-10px">复制链接</p>
        </div>
      </div>
      <div
        class="hover:bg-gray-200 hover:rounded-md hover:cursor-pointer h-30px flex justify-start items-center ml-6px mr-4px mt-4px"
        @click="deleteCard(store.webpage)"
      >
        <div class="flex justify-start items-center">
          <DeleteFilled style="width: 1em; height: 1em; margin-left: 10px" />
          <p class="ml-10px">删除收藏</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { nextTick } from 'vue'
import { clipboard } from 'electron'
import { message } from '@/utils/message'

import { useWebpageStore } from '@/stores'
import { ElMessageBox } from 'element-plus'
import { webPageApi } from '@/api/web-page'
import { WebPage } from '@/type/web-page'

const store = useWebpageStore()

const emit = defineEmits(['delete-card'])

function openUrl(url: string) {
  store.dialogVisible = true
  closeContentMenu()
  nextTick(() => {
    const wv = document.getElementById('webview')
    if (wv !== null) {
      wv.setAttribute('src', url)
    } else {
      const wrapper = document.getElementById('webview-wrapper')
      const _wv = document.createElement('webview')
      _wv.setAttribute('id', 'webview')
      _wv.setAttribute('class', 'w-full h-full')
      _wv.setAttribute('nodeintegration', '')
      _wv.setAttribute('allowpopups', '')
      _wv.setAttribute('src', url)
      wrapper?.appendChild(_wv)
    }
  })
}

function copyUrl(url: string) {
  clipboard.writeText(url, 'selection')
  closeContentMenu()
  message.success('链接已成功复制到粘贴板')
}

function deleteCard(webpage: WebPage) {
  emit('delete-card', webpage)
}

function closeContentMenu() {
  store.visible = false
}
</script>

<style>
.contexmenu-enter-active {
  animation: contexmenu-in 0.2s;
}

@keyframes contexmenu-in {
  from {
    height: 0;
  }

  to {
    height: 120px;
  }
}
</style>
