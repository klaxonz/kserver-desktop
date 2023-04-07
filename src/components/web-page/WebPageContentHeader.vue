<template>
  <div class="flex justify-between">
    <div class="w-500px">
      <el-input
        v-model="computeQuery"
        class="h-36px w-500px rounded-md pl-2 outline-gray-200"
        placeholder="搜索"
        @input="input"
        @keyup.enter="search"
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
import { computed } from 'vue'

const store = useWebpageStore()

const emit = defineEmits(['update:query', 'search', 'input'])
const props = defineProps({
  query: String
})
const computeQuery = computed({
  get() {
    return props.query
  },
  set(value) {
    emit('update:query', value)
  }
})

function search() {
  emit('search')
}

function input() {
  emit('input')
}

function searchWebpage() {
  store.page = 1
  const page = store.page
}

function showAddWebPageUrlModal() {
  store.sourceUrl = ''
  store.addWebPageModalVisible = true
}
</script>

<style lang="scss" scoped></style>
