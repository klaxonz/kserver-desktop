<template>
  <div
    v-for="item in nav"
    :key="item.name"
    class="h-40px rounded-lg mb-2 cursor-pointer"
    :class="{
      'bg-blue-500': item.selected,
      'bg-gray-200': !item.selected,
      'text-light-100': item.selected
    }"
    @click="handleNavClick(item)"
  >
    <div class="h-full flex justify-between ml-5 mr-5">
      <div class="h-full flex justify-center items-center">
        {{ item.name }}
      </div>
      <div class="h-full flex justify-center items-center">
        <div>{{ item.num }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { WebPageDrawerNavType } from '@/type/web-page'

const emit = defineEmits(['selected'])
const props = defineProps({
  nav: {
    required: true,
    type: Array as PropType<WebPageDrawerNavType[]>
  }
})

function handleNavClick(nav: WebPageDrawerNavType) {
  props.nav?.forEach((item) => (item.selected = item.label === nav.label))
  emit('selected')
}
</script>

<style scoped></style>
