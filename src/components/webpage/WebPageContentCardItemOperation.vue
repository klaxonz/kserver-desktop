<template>
    <transition name="contexmenu">
        <div v-if="contextmenuState.visible"
            class="absolute h-120px w-140px bg-light-50 rounded-md shadow-md text-sm text-gray-500 pt-4px overflow-hidden"
            v-bind:style="{ top: contextmenuState.top + 'px', left: contextmenuState.left + 'px', zIndex: 1000 }">
            <div class="hover:bg-gray-200 hover:rounded-md hover:cursor-pointer h-30px flex justify-start items-center ml-6px mr-4px mt-4px"
                @click="openUrl(webpage.url)">
                <div class="flex justify-start items-center">
                    <View style="width: 1.2em; height: 1.2em; margin-left: 12px; margin-right: 8px" />
                    <p class="ml-4px">访问网页</p>
                </div>
            </div>
            <div class="hover:bg-gray-200 hover:rounded-md hover:cursor-pointer h-30px flex justify-start items-center ml-6px mr-4px mt-4px"
                @click="copyUrl(webpage.url)">
                <div class="flex justify-start items-center">
                    <Link style="width: 1.2em; height: 1.2em; margin-left: 12px; margin-right: 8px" />
                    <p class="ml-4px">复制链接</p>
                </div>
            </div>
            <div class="hover:bg-gray-200 hover:rounded-md hover:cursor-pointer h-30px flex justify-start items-center ml-6px mr-4px mt-4px"
                @click="deleteWebpageCard(webpage.id)">
                <div class="flex justify-start items-center">
                    <DeleteFilled style="width: 1.2em; height: 1.2em; margin-left: 12px; margin-right: 8px" />
                    <p class="ml-4px">删除收藏</p>
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>

</style>    