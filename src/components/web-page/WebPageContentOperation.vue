<template>
  <div class="mt-8">
    <div class="flex justify-between items-center h-32px">
      <div class="flex justify-between items-center">
        <div v-if="checkAllVisible">
          <el-checkbox v-model="checkAllState" />
        </div>
        <div class="font-semibold text-md ml-8px">{{ store.activatedCategory.name }}</div>
        <div v-if="checkAllVisible" class="font-semibold text-md ml-8px text-gray-500">已选择{{ checkNum }}项</div>
      </div>

      <div v-if="checkAllVisible">
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
        <el-button type="primary" icon="CircleClose" @click="handleExitMoreOperation">退出多选操作</el-button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useWebpageStore } from '@/stores'
import { computed } from 'vue'

const store = useWebpageStore()

const emit = defineEmits(['update:check-all', 'exit-more-operation', 'batch-delete-card'])
const props = defineProps({
  checkNum: Number,
  checkAll: Boolean,
  checkAllVisible: Boolean
})

const checkAllState = computed({
  get() {
    return props.checkAll
  },
  set(value) {
    emit('update:check-all', value)
  }
})

function handleExitMoreOperation() {
  emit('exit-more-operation')
}

function batchDeleteWebpageCard() {
  emit('batch-delete-card')
}
</script>

<style lang="scss" scoped></style>
