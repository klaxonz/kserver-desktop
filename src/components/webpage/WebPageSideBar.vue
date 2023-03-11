<template>
    
    <div class="w-80px flex flex-col justify-between bg-gray-200">
        <div class="container mt-5">
            <div v-for="nav in topNavs" class="h-48px w-60px mx-auto mb-2 flex justify-center items-center hover:bg-gray-300 cursor-pointer rounded-md"
                :class="{'bg-gray-300': nav.selected}" @click="handleNavClick(nav)">
                    <div> {{nav.name}} </div>
            </div>
        </div>
        <div class="container mt-5">
            <div v-for="nav in bottomNavs" class="h-48px w-60px mx-auto mb-2 flex justify-center items-center hover:bg-gray-300 cursor-pointer rounded-md"
                :class="{'bg-gray-300': nav.selected}" @click="handleNavClick(nav)">
                <div>{{nav.name}}</div>
            </div>
        </div>
    </div>


</template>

<script setup lang="ts">

const props = defineProps({
    topNavs: {
        type: Array<WebPageSideBarNav>,
        required: true
    },
    bottomNavs: {
        type: Array<WebPageSideBarNav>,
        required: true
    }
})

function handleNavClick(nav: WebPageSideBarNav) {
    props.topNavs.forEach(item => item.selected = item.label === nav.label)
    props.bottomNavs.forEach(item => item.selected = item.label === nav.label)
}


</script>

<style scoped>

</style>