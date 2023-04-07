<template>
  <div class="w-80px flex flex-col justify-between bg-gray-200">
    <div class="container mt-5">
      <div
        v-for="nav in topNav"
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
        v-for="nav in bottomNav"
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
import { WebPageSideBarNav } from '@/type/web-page'

const router = useRouter()
const sidebarNav = reactive<Array<WebPageSideBarNav>>([
  {
    name: '收藏',
    label: 'collect',
    selected: true,
    position: 'top',
    route: '/webpage/collect'
  },
  {
    name: '任务',
    label: 'task',
    selected: false,
    position: 'top',
    route: '/webpage/task'
  },
  {
    name: '标签',
    label: 'tag',
    selected: false,
    position: 'top',
    route: ''
  },
  {
    name: '归档',
    label: 'archive',
    selected: false,
    position: 'top',
    route: ''
  },
  {
    name: '账户',
    label: 'account',
    selected: false,
    position: 'bottom',
    route: ''
  },
  {
    name: '设置',
    label: 'setting',
    selected: false,
    position: 'bottom',
    route: ''
  }
])

const topNav = sidebarNav.filter((item) => item.position === 'top')
const bottomNav = sidebarNav.filter((item) => item.position === 'bottom')

onMounted(() => {
  sidebarNav.forEach((item) => {
    if (item.selected && item.route !== '') {
      router.push(item.route)
    }
  })
})
function handleNavClick(nav: WebPageSideBarNav) {
  sidebarNav.forEach((item) => (item.selected = item.label === nav.label))
  sidebarNav.forEach((item) => {
    if (item.selected && item.route !== '') {
      router.push(item.route)
    }
  })
}
</script>

<style scoped></style>
