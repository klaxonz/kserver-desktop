<template>
  <div class="flex justify-between">
    <div class="w-500px">
      <el-input
        v-model="store.text"
        class="h-36px w-500px rounded-md pl-2 outline-gray-200"
        placeholder="搜索"
        @input="searchWebpage"
        @keyup.enter="searchWebpage"
      >
        <template #prepend>
          <el-button icon="search" />
        </template>
      </el-input>
    </div>
    <div>
      <el-button class="h-full" type="primary" icon="CirclePlusFilled" @click="showAddWebPageUrlModal" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWebpageStore } from '@/stores'
import { getWebpageCardList } from '@/interf/webpage'

const store = useWebpageStore()

function searchWebpage() {
  store.page = 1
  const page = store.page
  getWebpageCardList(page)
}

function showAddWebPageUrlModal() {
  store.sourceUrl = ''
  store.addWebPageModalVisible = true
}
</script>

<style lang="scss" scoped></style>
