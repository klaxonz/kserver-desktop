<template>
  <div
    v-click-outside-element="handleBlurCard"
    class="h-200px rounded-2xl cursor-pointer hover:shadow-md"
    :class="{
      'border-r-3px': webpageState?.checked,
      'bg-blue-400': webpageState?.checked,
      'bg-opacity-25': webpageState?.checked,
      'bg-light-100': !webpageState?.checked
    }"
    @click.right="handleRightClickCard($event, webpageState?.id)"
    @click.left="handleLeftClickCard($event, webpageState?.id)"
    @mouseenter="handleMouseEnterCard($event, webpageState?.id)"
    @mouseleave="handleMouseLeaveCard($event, webpageState?.id)"
  >
    <div class="h-full w-full">
      <div class="h-full flex-col">
        <div class="h-168px flex justify-between">
          <div class="pl-4 pr-4 pt-3">
            <div
              class="text-base font-medium"
              style="
                word-wrap: break-word;
                word-break: break-all;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                line-clamp: 2;
                -webkit-box-orient: vertical;
              "
            >
              {{ webpage.title }}
            </div>
            <div
              class="text-xs text-gray-600 mt-2"
              style="
                word-wrap: break-word;
                word-break: break-all;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 5;
                line-clamp: 5;
                -webkit-box-orient: vertical;
              "
            >
              {{ webpage.description }}
            </div>
          </div>
          <div
            class="w-24px mr-4 mt-2"
            :class="{ visible: webpageState?.checkboxVisible, invisible: !webpageState?.checkboxVisible }"
          >
            <el-checkbox v-model="_check" @change="handleCheckboxChange(webpageState?.id)" />
          </div>
        </div>
        <div
          class="h-32px text-xs rounded-b-2xl flex justify-between items-center pl-4 pr-6"
          style="background-color: #f6f7f9; color: #6d7582"
        >
          <div class="flex justify-between">
            <img :src="webpageState?.favicon" class="h-16px w-16px" />
            <p class="ml-8px">{{ getHost(webpageState?.source) }}</p>
          </div>
          <div>{{ getFormateTime(webpageState?.createTime) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import moment from 'moment'
import 'moment/dist/locale/zh-cn'
import { nextTick, PropType, ref } from 'vue'
import { useWebpageStore } from '@/stores'
import { WebPage } from '@/type/webPage'

const props = defineProps({
  webpage: {
    type: Object as PropType<WebPage>
  }
})

// eslint-disable-next-line vue/no-setup-props-destructure
const webpageState = props.webpage
const _check = ref(webpageState?.checked)

defineEmits(['update-check'])

const store = useWebpageStore()

function handleLeftClickCard(event: Event, refId: number | undefined) {
  if (refId === undefined) {
    return
  }
  if (store.checkAllVisible) {
    store.webpageList.forEach((item) => {
      if (refId === item.id) {
        item.checked = !item.checked
        event.preventDefault()
      }
    })
  }
}

function handleRightClickCard(event: MouseEvent, refId: number | undefined) {
  if (refId === undefined) {
    return
  }
  const webpage = getWebpage(refId)

  if (store.visible) {
    store.visible = false
    nextTick(() => {
      store.visible = true
      if (event.target) {
        store.top = event.y
        store.left = event.x
      }
    })
  } else {
    store.visible = true
    if (event.target) {
      store.top = event.y
      store.left = event.x
    }
  }
  if (webpage) {
    store.webpage = webpage
  }
}

function handleMouseEnterCard(event: Event, refId: number | undefined) {
  if (refId === undefined) {
    return
  }
  store.webpageList.forEach((item) => {
    if (refId === item.id) {
      if (!item.checkboxVisible) {
        item.checkboxVisible = true
      }
      if (item.checked) {
        item.checkboxVisible = true
      }
    }
  })
}

function handleMouseLeaveCard(event: Event, refId: number | undefined) {
  if (refId === undefined) {
    return
  }

  if (!store.checkAllVisible) {
    store.webpageList.forEach((item) => {
      if (refId === item.id) {
        if (item.checkboxVisible && !item.checked) {
          item.checkboxVisible = false
        }
      }
    })
  }
}

function handleCheckboxChange(refId: number | undefined) {
  if (refId === undefined) {
    return
  }
  store.webpageList.forEach((item) => {
    if (refId === item.id && item.checked) {
      console.log(item)
      item.checkboxVisible = true
    }
  })
}

function handleBlurCard() {
  store.visible = false
}

function getWebpage(refId: number) {
  let webpage = null
  store.webpageList.forEach((item) => {
    if (item.id === refId) {
      webpage = item
    }
  })
  return webpage
}

function getHost(url: string) {
  return new URL(url).hostname
}

function getFormateTime(createTime?: string | undefined) {
  if (moment(createTime).year == moment(new Date()).year) {
    return moment.utc(createTime).utcOffset(0).calendar()
  } else {
    return moment.utc(createTime).utcOffset(0).format('yyyy-MM-DD')
  }
}
</script>

<style lang="scss" scoped></style>
