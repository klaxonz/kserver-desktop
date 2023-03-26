<template>
    <div class="w-80px flex flex-col justify-between bg-gray-200">
        <div class="container mt-5">
            <div v-for="nav in topNavs"
                class="h-48px w-60px mx-auto mb-2 flex justify-center items-center hover:bg-gray-300 cursor-pointer rounded-md"
                :class="{ 'bg-gray-300': nav.selected }" @click="handleNavClick(nav)">
                <div> {{ nav.name }} </div>
            </div>
        </div>
        <div class="container mt-5">
            <div v-for="nav in bottomNavs"
                class="h-48px w-60px mx-auto mb-2 flex justify-center items-center hover:bg-gray-300 cursor-pointer rounded-md"
                :class="{ 'bg-gray-300': nav.selected }" @click="handleNavClick(nav)">
                <div>{{ nav.name }}</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';


const topNavs = reactive<Array<WebPageSideBarNav>>([
    {
        name: "收藏",
        label: "favorite",
        selected: true
    },
    {
        name: "标签",
        label: "tag",
        selected: false
    },
    {
        name: "标注",
        label: "mark",
        selected: false
    },
    {
        name: "归档",
        label: "archive",
        selected: false
    }
])

const bottomNavs = reactive<Array<WebPageSideBarNav>>([
    {
        name: "账户",
        label: "account",
        selected: false
    },
    {
        name: "设置",
        label: "setting",
        selected: false
    },

])
function handleNavClick(nav: WebPageSideBarNav) {
    topNavs.forEach(item => item.selected = item.label === nav.label)
    bottomNavs.forEach(item => item.selected = item.label === nav.label)
}


</script>

<style scoped></style>