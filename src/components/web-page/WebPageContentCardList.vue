<template>
  <div class="mt-5 h-screen flex-1" style="overflow-x: scroll" @scroll="handleScroll">
    <div class="grid" style="grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); grid-gap: 20px 20px">
      <WebPageContentCardItem
        v-for="webpage in cardList"
        :key="webpage.id"
        :webpage="webpage"
        @click="handleCardClick(webpage)"
        @update-check="handleCardCheck(webpage)"
        @mouseenter="handleMouseEnterCard(webpage)"
        @mouseleave="handleMouseLeaveCard(webpage)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import WebPageContentCardItem from '@/components/web-page/WebPageContentCardItem.vue'
import { PropType } from 'vue'
import { WebPage } from '@/type/web-page'
import { useWebpageStore } from '@/stores'

const webpageStore = useWebpageStore()

const emit = defineEmits([
  'scroll',
  'left-click',
  'right-click',
  'mouse-enter',
  'mouse-leave',
  'update-card-check',
  'update-card-click'
])
const props = defineProps({
  checkAllVisible: Boolean,
  cardList: {
    type: Array as PropType<WebPage[]>,
    required: true
  }
})

function handleCardCheck(webpage: WebPage) {
  emit('update-card-check', webpage)
}

function handleCardClick(webpage: WebPage) {
  emit('update-card-click', webpage)
}

function handleMouseEnterCard(webpage: WebPage) {
  if (!props.checkAllVisible) {
    webpage.checkboxVisible = true
  }
}

function handleMouseLeaveCard(webpage: WebPage) {
  if (!props.checkAllVisible) {
    webpage.checkboxVisible = false
  }
}

function handleScroll() {
  webpageStore.visible = false
}
</script>

<style lang="scss" scoped></style>
