<template>
  <div
    v-if="store.addWebPageModalVisible"
    class="min-w-screen h-screen animated fadeIn faster fixed left-0 top-0 flex inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover"
  >
    <div class="absolute bg-black opacity-80 inset-0 z-0"></div>
    <div class="w-full max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg bg-white">
      <div>
        <div class="text-center p-5 flex-auto justify-center">
          <h2 class="text-xl font-bold py-4">添加网址</h2>
          <input
            v-model="store.sourceUrl"
            class="h-36px w-320px rounded-md pl-2 bg-transparent border-1 border-gray-300 border-solid outline-gray-200"
            type="text"
            placeholder="输入网址"
          />
        </div>

        <div class="p-3 mt-2 text-center space-x-4 md:block">
          <button
            class="w-150px mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
            @click="store.addWebPageModalVisible = false"
          >
            取消
          </button>
          <button
            type="button"
            class="w-150px mb-2 md:mb-0 bg-gray-500 border border-gray-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-gray-600"
            @click="addWebPageUrl"
          >
            保存
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWebpageStore } from '@/stores'
import { webPageApi } from '@/api/web-page'

const store = useWebpageStore()

async function addWebPageUrl() {
  await webPageApi
    .create({
      url: store.sourceUrl
    })
    .finally(() => {
      store.addWebPageModalVisible = false
    })
  // await getDetail()
  store.page = 1
  const page = store.page
  // await getWebpageCardList(page)
}
</script>

<style lang="scss" scoped></style>
