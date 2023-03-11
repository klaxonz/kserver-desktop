<template>
    <div class="w-250px bg-gray-100">
        <div class="ml-5 mr-5 mt-5">
            <div>
                <div class="font-semibold text-lg ml-3">我的收藏</div>
            </div>
            <div class="mt-5">
                <div v-for="category in categoryState"
                    class="h-40px rounded-lg mb-2 cursor-pointer"
                    :class="{'bg-blue-500': category.selected, 'bg-gray-200': !category.selected, 'text-light-100': category.selected}"
                    @click="$emit('category-selected', category)">
                    <div class="h-full flex justify-between ml-5 mr-5">
                        <div class="h-full flex justify-center items-center">
                            {{category.name}}
                        </div>
                        <div class="h-full flex justify-center items-center">
                            <div>{{category.num}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">


defineProps({
    categoryState: {
        type: Array<WebPageCategory>,
        required: true
    }
})

defineEmits(['category-selected'])




</script>

<style scoped>

</style>