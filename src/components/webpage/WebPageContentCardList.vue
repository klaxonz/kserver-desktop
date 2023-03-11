<template>
    <div class="mt-5 h-screen flex-1" style="overflow-x: scroll;" @scroll="$emit('scroll')">
        <div class="grid "
            style="grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); grid-gap: 20px 20px;">
            <WebPageContentCardItem v-for="webpage in webPageList" :webpage="webpage"
                @left-click="$emit('left-click')" @right-click="($event, refId) => $emit('right-click', $event, refId)"
                @mouse-enter="$emit('mouse-enter')" @mouse-leave="$emit('mouse-leave')"
                @update-check="value => webpage.checked = value" />
        </div>
    </div>
</template>

<script setup lang="ts">
import WebPageContentCardItem from './WebPageContentCardItem.vue'

defineProps({
    webPageList: {
        type: Array<Object>,
        required: true
    }
})

defineEmits([
    'scroll',
    'left-click',
    'right-click',
    'mouse-enter',
    'mouse-leave',
    'update-check'
])

</script>

<style lang="scss" scoped>

</style>