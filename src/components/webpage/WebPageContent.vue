<template>
    <div class="flex-1 border-gray-200 border-solid border" style="background-color: #edeff3">
        <div class="h-full ml-5 mr-5 mt-5 flex flex-col">
            <WebPageContentHeader :searchText="_searchText" @enter="$emit('search')" @add-page="$emit('add-page')"
                @update-value="value => {$emit('update-search-value', value);_searchText=value}" />

            <WebPageContentOperation :operationState="operationState" @click-star="$emit('batch-star-operation')"
                @exit-more-option="$emit('batch-exit-operation')" />

            <WebPageContentCardList :web-page-list="webPageList"
                @scroll=""
                @left-click="$emit('left-click')"
                @right-click="($event, refId) => $emit('right-click', $event, refId)"
                @mouse-enter="$emit('mouse-enter')"
                @mouse-leave="$emit('mouse-leave')"
            />

        </div>
    </div>
</template>

<script setup lang="ts">
import WebPageContentHeader from './WebPageContentHeader.vue';
import WebPageContentOperation from './WebPageContentOperation.vue';
import WebPageContentCardList from './WebPageContentCardList.vue';
import { ref } from 'vue';

defineEmits([
    'search',
    'add-page',
    'scroll',
    'left-click',
    'right-click',
    'mouse-enter',
    'mouse-leave',
    'update-check',
    'update-search-value',
    'batch-star-operation',
    'batch-exit-operation',
    'batch-delete-operation'
])

const props = defineProps({
    searchText: {
        type: String,
        required: true
    },
    operationState: {
        type: Object as () => WebPageCardOperationState,
        required: true
    },
    webPageList: {
        type: Array<WebPage>,
        required: true
    }
})

const _searchText = ref(props.searchText)


</script>

<style lang="scss" scoped></style>