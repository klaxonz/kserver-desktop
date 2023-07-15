<template>
  <div class="flex flex-row h-full w-full">
    <web-page-drawer>
      <div class="m-5">
        <web-page-drawer-title title="我的收藏" />
        <div class="mt-5">
          <web-page-drawer-nav :nav="drawerNav" @selected="handleNavSelected" />
        </div>
      </div>
    </web-page-drawer>
    <web-page-content>
      <div class="h-full ml-5 mr-5 mt-5 flex flex-col">
        <web-page-content-header
          :query="query"
          @update:query="(value) => (query = value)"
          @input="handleSearch"
          @search="handleSearch"
        />
        <web-page-content-operation
          :check-all="checkAll"
          :check-all-visible="checkAllVisible"
          :check-num="checkNum"
          @update:check-all="handleCheckAllStateChange"
          @exit-more-operation="handleExitMoreOperation"
          @batch-delete-card="handleBatchDeleteCard"
        />
        <web-page-content-card-list
          :card-list="cardList"
          :check-all-visible="checkAllVisible"
          @update-card-check="handleCardCheckStateChange"
          @update-card-click="handleCardCheckOperationClick"
        />
      </div>
    </web-page-content>
    <web-page-add-dialog />
    <web-page-webview />
    <web-page-content-card-item-operation @delete-card="handleDeleteCard" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import WebPageDrawer from '@/components/web-page/WebPageDrawer.vue'
import WebPageContent from '@/components/web-page/WebPageContent.vue'
import WebPageAddDialog from '@/components/web-page/WebPageAddDialog.vue'
import WebPageWebview from '@/components/web-page/WebPageWebview.vue'
import WebPageContentCardItemOperation from '@/components/web-page/WebPageContentCardItemOperation.vue'
import WebPageDrawerTitle from '@/components/web-page/WebPageDrawerTitle.vue'
import WebPageDrawerNav from '@/components/web-page/WebPageDrawerNav.vue'
import webPageInterface from '@/interf/web-page'
import WebPageContentHeader from '@/components/web-page/WebPageContentHeader.vue'
import WebPageContentCardList from '@/components/web-page/WebPageContentCardList.vue'
import WebPageContentOperation from '@/components/web-page/WebPageContentOperation.vue'
import { WebPage } from '@/type/web-page'
import { ElMessageBox } from 'element-plus'
import { webPageApi } from '@/api/web-page'
import { message } from '@/utils/message'
import { useWebpageStore } from '@/stores'

const store = useWebpageStore()

const drawerNav = reactive([
  {
    num: 0,
    type: 0,
    name: '所有',
    label: 'all',
    selected: true
  },
  {
    num: 0,
    type: 1,
    name: '星标',
    label: 'star',
    selected: false
  },
  {
    num: 0,
    type: 2,
    name: '今日',
    label: 'today',
    selected: false
  }
])

const query = ref('')
const selectedDrawerNav = computed(() => {
  return drawerNav.filter((item) => {
    if (item.selected) {
      return item
    }
  })[0]
})
const cardList: WebPage[] = reactive([])
const checkNum = computed(() => {
  return cardList.filter((item) => item.checked).length
})
const checkAll = ref(false)
const checkAllVisible = computed(() => {
  return cardList.filter((item) => item.checked).length > 0
})

onMounted(() => {
  initSearchState()
  initDrawerDetail()
  handleSearch()
})

function initSearchState() {
  query.value = ''
}

function initDrawerDetail() {
  const drawerDetail = webPageInterface.getWebPageDrawerDetail()
  drawerDetail.then((list) => {
    drawerNav[0].num = list[0].count
    drawerNav[1].num = list[1].count
    drawerNav[2].num = list[2].count
  })
}

function handleNavSelected() {
  handleSearch()
}

function handleSearch() {
  const webPageCardList = webPageInterface.getWebPageCardList(selectedDrawerNav.value.type, 1, undefined, query.value)
  webPageCardList.then((value) => {
    cardList.length = 0
    cardList.push(...value.list)
  })
}

function handleCheckAllStateChange(value: boolean) {
  checkAll.value = value
  cardList.forEach((item) => (item.checked = value))
}

function handleCardCheckStateChange(webpage: WebPage) {
  webpage.checked = !webpage.checked
  if (!webpage.checked && checkAll.value) {
    checkAll.value = false
  }
  const uncheckedSize = cardList.filter((item) => !item.checked).length
  if (uncheckedSize === 0 && !checkAll.value) {
    checkAll.value = true
  }
}

function handleCardCheckOperationClick(webpage: WebPage) {
  if (!checkAllVisible.value) {
    return
  }
  webpage.checked = !webpage.checked
  if (!webpage.checked && checkAll.value) {
    checkAll.value = false
  }
  const uncheckedSize = cardList.filter((item) => !item.checked).length
  if (uncheckedSize === 0 && !checkAll.value) {
    checkAll.value = true
  }
}

function handleExitMoreOperation() {
  cardList.forEach((item) => (item.checked = false))
}

function handleDeleteCard(webpage: WebPage) {
  ElMessageBox.confirm('确认删除卡片吗?', '警告', {
    type: 'warning',
    cancelButtonText: '取消',
    confirmButtonText: '确认'
  }).then(async () => {
    await webPageApi.delete({ id: webpage.id })
    initDrawerDetail()
    handleSearch()
    store.visible = false
    message.success('删除成功')
  })
}

function handleBatchDeleteCard() {
  ElMessageBox.confirm('确认删除选中卡片吗?', '警告', {
    type: 'warning',
    cancelButtonText: '取消',
    confirmButtonText: '确认'
  }).then(async () => {
    const ids = cardList.filter((e) => e.checked).map((e) => e.id)
    await webPageApi.batchDelete(ids)
    initDrawerDetail()
    handleSearch()
    message.success('删除成功')
  })
}
</script>

<style></style>
