<template>
    <div class="mt-8 ">
        <div class="flex justify-between items-center h-32px">
            <div class="flex justify-between items-center">
                <div v-if="operationState.checkAllVisible">
                    <el-checkbox v-model="operationState.checkAll" />
                </div>
                <div class="font-semibold text-md ml-8px">{{operationState.categoryName}}</div>
                <div v-if="operationState.checkAllVisible" class="font-semibold text-md ml-8px text-gray-500">
                    已选择{{ operationState.checkNum }}项
                </div>
            </div>

            <div v-if="operationState.checkAllVisible">
                <el-dropdown class="mr-4px">
                    <el-button class="bg-opacity-25" type="primary" :icon="More"></el-button>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item><el-icon>
                                    <Star />
                                </el-icon>星标</el-dropdown-item>
                            <el-dropdown-item @click="$emit('batch-star-operation')"><el-icon>
                                    <Delete />
                                </el-icon>删除</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
                <el-button type="primary" :icon="CircleClose" @click="$emit('batch-exit-operation')">退出多选操作</el-button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    Star,
    More,
    Delete,
    CircleClose
} from '@element-plus/icons-vue'

defineProps({
    operationState: { 
        type: Object as () => WebPageCardOperationState,
        required: true
    }
})

defineEmits([
    "batch-star-operation",
    "batch-exit-operation"
])

</script>

<style lang="scss" scoped></style>