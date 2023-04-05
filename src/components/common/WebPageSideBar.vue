<template>
  <div class="w-80px flex flex-col justify-between bg-gray-200">
    <div class="container mt-5">
      <div
        v-for="nav in topNavs"
        :key="nav.name"
        class="h-48px w-60px mx-auto mb-2 flex justify-center items-center hover:bg-gray-300 cursor-pointer rounded-md"
        :class="{ 'bg-gray-300': nav.selected }"
        @click="handleNavClick(nav)"
      >
        <div>{{ nav.name }}</div>
      </div>
    </div>
    <div class="container mt-5">
      <div
        v-for="nav in bottomNavs"
        :key="nav.name"
        class="h-48px w-60px mx-auto mb-2 flex justify-center items-center hover:bg-gray-300 cursor-pointer rounded-md"
        :class="{ 'bg-gray-300': nav.selected }"
        @click="handleNavClick(nav)"
      >
        <div>{{ nav.name }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { accountApi } from '@/api/account'
import { WebPageSideBarNav } from '@/type/webPage'

const router = useRouter()

const topNavs = reactive<Array<WebPageSideBarNav>>([
  {
    name: '收藏',
    label: 'collect',
    selected: true
  },
  {
    name: '任务',
    label: 'task',
    selected: false
  },
  {
    name: '标签',
    label: 'tag',
    selected: false
  },
  {
    name: '归档',
    label: 'archive',
    selected: false
  }
])

const bottomNavs = reactive<Array<WebPageSideBarNav>>([
  {
    name: '账户',
    label: 'account',
    selected: false
  },
  {
    name: '设置',
    label: 'setting',
    selected: false
  }
])

onMounted(() => {
  topNavs.forEach((item) => {
    if (!item.selected) {
      return
    }
    if (item.label === 'collect') {
      router.push('/webpage/collect')
    }
    if (item.label === 'task') {
      router.push('/webpage/task')
    }
  })
})

function handleNavClick(nav: WebPageSideBarNav) {
  topNavs.forEach((item) => (item.selected = item.label === nav.label))
  bottomNavs.forEach((item) => (item.selected = item.label === nav.label))
  if (nav.label === 'collect') {
    router.push('/webpage/collect')
  }
  if (nav.label === 'task') {
    router.push('/webpage/task')
  }
  if (nav.label === 'account') {
    accountApi.logout()
    router.push('/')
  }
}
</script>

<style scoped></style>
