<template>
  <div class="mt-8">
    <div class="flex justify-between items-center h-32px">
      <div class="flex justify-between items-center">
        <div v-if="store.checkAllVisible">
          <el-checkbox v-model="store.checkAll" @change="store.updateCheckAll" />
        </div>
        <div class="font-semibold text-md ml-8px">{{ store.activatedCategory.name }}</div>
        <div v-if="store.checkAllVisible" class="font-semibold text-md ml-8px text-gray-500">
          已选择{{ store.checkNum }}项
        </div>
      </div>

      <div v-if="store.checkAllVisible">
        <el-dropdown class="mr-4px">
          <el-button class="bg-opacity-25" type="primary" icon="More"></el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                ><el-icon> <Star /> </el-icon>星标</el-dropdown-item
              >
              <el-dropdown-item @click="batchDeleteWebpageCard"
                ><el-icon> <Delete /> </el-icon>删除</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-button type="primary" icon="CircleClose" @click="handleExitMoreOption">退出多选操作</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Star, Delete } from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'
import { webpageApi } from '@/api/web-page'
import { message } from '@/utils/message'
import { useWebpageStore } from '@/stores'
import { getWebpageCardList, getDetail } from '@/interf/webpage'

const store = useWebpageStore()

function handleExitMoreOption() {
  store.webpageList.forEach((item) => (item.checked = false))
  store.webpageList.forEach((item) => (item.checkboxVisible = false))
}

function batchDeleteWebpageCard() {
  ElMessageBox.confirm('确认删除选中卡片吗?', '警告', {
    type: 'warning',
    cancelButtonText: '取消',
    confirmButtonText: '确认'
  }).then(async () => {
    const ids = store.webpageList.filter((e) => e.checked).map((e) => e.id)
    await webpageApi.batchDelete(ids)
    await getDetail()

    store.page = 1
    const page = store.page
    await getWebpageCardList(page)

    message.success('删除成功')
  })
}
</script>

<style lang="scss" scoped></style>
