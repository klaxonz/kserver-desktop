<template>
    <div class="flex justify-between">
        <div class="w-500px">
            <el-input
                v-model="_searchText"
                class="h-36px w-500px rounded-md pl-2 outline-gray-200"
                @keyup.enter.native="$emit('enter')" @input="$emit('update-value', _searchText)"
                placeholder="搜索"
                >
                <template #prepend>
                    <el-button :icon="Search" />
                </template>
            </el-input>
        </div>
        <div>
            <el-button class="h-full" type="primary" :icon="CirclePlusFilled" @click="$emit('add-page')"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    Search,
    CirclePlusFilled,
} from '@element-plus/icons-vue'
import { ref } from 'vue';

const props = defineProps({
    searchText: {
        type: String,
        required: true
    }
})

defineEmits(['enter', 'add-page', 'update-value'])

const _searchText = ref(props.searchText)



</script>

<style lang="scss" scoped>

</style>