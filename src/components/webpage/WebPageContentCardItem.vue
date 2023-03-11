<template>
    <div class="h-200px  rounded-2xl cursor-pointer hover:shadow-md  " :class="{
        'border-r-3px': webpage.checked, 'bg-blue-400': webpage.checked,
        'bg-opacity-25': webpage.checked, 'bg-light-100': !webpage.checked
    }"
        @click.right="$emit('right-click', $event, webpage.id)" @click.left="$emit('left-click', $event, webpage.id)"
        @mouseenter="$emit('mouse-enter', $event, webpage.id)" @mouseleave="$emit('mouse-leave', $event, webpage.id)"
       >
        <div class="h-full w-full">
            <div class="h-full flex-col">
                <div class="h-168px flex justify-between">
                    <div class="pl-4 pr-4 pt-3">
                        <div class="text-base font-medium"
                            style="word-wrap: break-word; word-break:break-all; overflow:hidden; text-overflow: -o-ellipsis-lastline;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;line-clamp: 2;-webkit-box-orient: vertical;">
                            {{ webpage.title }}
                        </div>
                        <div class="text-xs text-gray-600 mt-2"
                            style="word-wrap: break-word; word-break:break-all; overflow:hidden; text-overflow: -o-ellipsis-lastline;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 5;line-clamp: 5;-webkit-box-orient: vertical;">
                            {{ webpage.description }}</div>
                    </div>
                    <div class="w-24px mr-4 mt-2"
                        :class="{ 'visible': webpage.checkboxVisible, 'invisible': !webpage.checkboxVisible }">
                        <el-checkbox v-model="_checked" @change="$emit('update-check', _checked)" />
                    </div>
                </div>
                <div class="h-32px text-xs rounded-b-2xl flex justify-between items-center pl-4 pr-6"
                    style="background-color: #f6f7f9; color: #6d7582">
                    <div class="flex justify-between">
                        <img :src="webpage.favicon" class="h-16px w-16px">
                        <p class="ml-8px">{{ getHost(webpage.source) }}</p>
                    </div>
                    <div>{{ getFormateTime(webpage.createTime) }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import moment from 'moment'
import "moment/dist/locale/zh-cn";
import { vOnClickOutside } from '@vueuse/components'

const props = defineProps({
    webpage: {
        type: Object,
        required: true
    }
})
const _checked = props.webpage.checked

defineEmits([
    'left-click',
    'right-click',
    'mouse-enter',
    'mouse-leave',
    'update-check'
])

function getHost(url: string) {
    return new URL(url).hostname
}

function getFormateTime(createTime: number) {
    if (moment(createTime).year == moment(new Date()).year) {
        return moment.utc(createTime).utcOffset(0).calendar()
    } else {
        return moment.utc(createTime).utcOffset(0).format("yyyy-MM-DD")
    }
}

</script>

<style lang="scss" scoped>
</style>