<template>
    <div class="flex flex-row h-full">
        <div class="w-80px bg-gray-200">
            <div class="container mt-5">
                <div
                    class="h-48px w-60px mx-auto mb-2 flex justify-center items-center hover:bg-gray-300 cursor-pointer rounded-md"
                        :class="{'bg-gray-300': state.activeSide === 'favorite'}"
                    >
                    <div>收藏</div>
                </div>
                <div
                    class="h-48px w-60px mx-auto mb-2 flex justify-center items-center hover:bg-gray-300 cursor-pointer rounded-md"
                        :class="{'bg-gray-300': state.activeSide === 'tag'}"
                    >
                    <div>标签</div>
                </div>
                <div
                    class="h-48px w-60px mx-auto mb-2 flex justify-center items-center hover:bg-gray-300 cursor-pointer rounded-md"
                        :class="{'bg-gray-300': state.activeSide === 'mark'}"
                    >
                    <div>标注</div>
                </div>
                <div
                    class="h-48px w-60px mx-auto mb-2 flex justify-center items-center hover:bg-gray-300 cursor-pointer rounded-md"
                        :class="{'bg-gray-300': state.activeSide === 'archive'}"
                    >
                    <div>归档</div>
                </div>
            </div>

        </div>
        <div class="w-250px bg-gray-100">
            <div class="ml-5 mr-5 mt-5">
                <div>
                    <div class="font-semibold text-lg ml-3">我的收藏</div>
                </div>
                <div class="mt-5">
                    <div>
                        <div class="h-40px bg-gray-200  rounded-lg mb-2 cursor-pointer"
                            :class="{'bg-blue-600': state.active==='all', 'text-light-100': state.active==='all'}"
                            @click="handleClickAll">
                            <div class="h-full flex justify-between ml-5 mr-5">
                                <div class="h-full flex justify-center items-center">
                                    <div>所有</div>
                                </div>
                                <div class="h-full flex justify-center items-center">
                                    <div>{{state.allTotal}}</div>
                                </div>
                            </div>
                        </div>
                        <div class="h-40px bg-gray-200  rounded-lg mb-2 cursor-pointer"
                            :class="{'bg-blue-600': state.active==='star', 'text-light-100': state.active==='star'}"
                            @click="handleClickStar">
                            <div class="h-full flex justify-between ml-5 mr-5">
                                <div class="h-full flex justify-center items-center">
                                    <div>星标</div>
                                </div>
                                <div class="h-full flex justify-center items-center">
                                    <div>{{state.starTotal}}</div>
                                </div>
                            </div>
                        </div>
                        <div class="h-40px bg-gray-200  rounded-lg mb-2 cursor-pointer"
                            :class="{'bg-blue-600': state.active==='today', 'text-light-100': state.active==='today'}"
                            @click="handleClickToday">
                            <div class="h-full flex justify-between ml-5 mr-5">
                                <div class="h-full flex justify-center items-center">
                                    <div>今日</div>
                                </div>
                                <div class="h-full flex justify-center items-center">
                                    <div>{{state.todayTotal}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bg-gray-100 flex-1 border-gray-200 border-solid border">
            <div class="h-full ml-5 mr-5 mt-5 flex flex-col">
                <div class="flex justify-between">
                    <div>
                        <input v-model="state.searchText" 
                            @keyup.enter.native='handleClickSearch'
                            class="h-36px w-500px rounded-md pl-2 outline-gray-200" type="text" placeholder="搜索" />
                        <el-button type="primary" class="ml-2 h-36px" @click="handleClickSearch" >搜索</el-button>
                    </div>
                    <div>
                        <button @click="showAddWebPageUrlModal()"
                            class="bg-gray-400 w-72px h-36px rounded-lg">添加</button>
                    </div>
                </div>
                <div class="mt-8 ">
                    <div class="flex justify-between">
                        <div class="font-semibold text-md">收集箱</div>
                        <div>筛选</div>
                    </div>
                </div>
                <div class="mt-5 h-screen flex-1" style="overflow-x: scroll;" @scroll="handleScroll">
                    <div class="grid "
                        style="grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); grid-gap: 20px 20px;">
                        <el-dropdown class="h-200px bg-light-100 rounded-2xl cursor-pointer hover:shadow-md"
                            trigger="contextmenu" placement="top-end" v-for="webpageInfo in state.webpageInfos">
                            <div @click="openUrl($event, webpageInfo.url)" class="h-full w-full">
                                <div class="h-full flex-col">
                                    <div class="h-4/5">
                                        <div class="pl-4 pr-8 pt-3">
                                            <div class="text-base font-medium"
                                                style="word-wrap: break-word; word-break:break-all; overflow:hidden; text-overflow: -o-ellipsis-lastline;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;line-clamp: 2;-webkit-box-orient: vertical;">
                                                {{webpageInfo.title}}</div>
                                            <div class="text-xs text-gray-600 mt-2"
                                                style="word-wrap: break-word; word-break:break-all; overflow:hidden; text-overflow: -o-ellipsis-lastline;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 5;line-clamp: 5;-webkit-box-orient: vertical;">
                                                {{webpageInfo.description}}</div>
                                        </div>
                                    </div>
                                    <div class="bg-gray-200 h-1/5 rounded-b-2xl text-xs">
                                        <div class="flex justify-between text-gray-600 ml-8 mr-6 pt-3">
                                            <div>{{webpageInfo.source}}</div>
                                            <div>{{moment(webpageInfo.createTime).format("yyyy-MM-DD")}}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item :icon="DeleteFilled" @click="deleteWebpageCard(webpageInfo.id)">删除</el-dropdown-item>
                                    
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="state.showAddWebPageModal"
            class="min-w-screen h-screen animated fadeIn faster fixed left-0 top-0 flex  inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover">
            <div class="absolute bg-black opacity-80 inset-0 z-0"></div>
            <div class="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
                <div>
                    <div class="text-center p-5 flex-auto justify-center">
                        <h2 class="text-xl font-bold py-4 ">添加网址</h2>
                        <input v-model="state.sourceUrl"
                            class="h-36px w-320px rounded-md pl-2 bg-transparent border-1 border-gray-300 border-solid outline-gray-200"
                            type="text" placeholder="输入网址" />
                    </div>

                    <div class="p-3  mt-2 text-center space-x-4 md:block">
                        <button @click="closeAddWebPageUrlModal()"
                            class="w-150px mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100">
                            取消
                        </button>
                        <button type="button" @click="addWebPageUrl()"
                            class="w-150px mb-2  md:mb-0 bg-gray-500 border border-gray-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-gray-600">保存</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { webpageApi } from '../api/webpage'
import moment from 'moment'
import { shell } from 'electron'
import {
    DeleteFilled
} from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'


const state = reactive({
    url: '',
    singleWebpageInfo: '',
    page: 0,
    pages: 0,
    total: 0,
    allTotal: 0,
    starTotal: 0,
    todayTotal: 0,
    webpageInfos: [],
    showAddWebPageModal: false,
    sourceUrl: '',
    active: "all",
    activeSide: "favorite",
    searchText: ''
})

onMounted(() => {
    resetState()
    getDetail()
    getAllPages()
})

function handleScroll(e) {
    const { scrollTop, clientHeight, scrollHeight } = e.target
    if (scrollTop + clientHeight === scrollHeight) {
        if (state.total != state.webpageInfos.length) {
            getAllPages()
        }
    }
}

function resetState() {
    state.page = 0
    state.pages = 0
    state.webpageInfos = []
}

function resetSearchText() {
    state.searchText = ''
}

function handleClickAll() {
    state.active = 'all'
    resetState()
    resetSearchText()
    getDetail()
    getAllPages()
}

function handleClickStar() {
    state.active = 'star'
    resetState()
    resetSearchText()
    getDetail()
    getStarPages()
}

function handleClickToday() {
    state.active = 'today'
    resetState()
    resetSearchText()
    getDetail()
    getTodayPages()
}

function handleClickSearch() {
    resetState()
    search()
}

function getDetail() {
    webpageApi.detail().then((resp) => {
        state.allTotal = parseInt(resp.data.allTotal)
        state.starTotal = parseInt(resp.data.starTotal)
        state.todayTotal = parseInt(resp.data.todayTotal)
    })
}

function getAllPages() {
    const result = webpageApi.getAll(++state.page)
    result.then((resp) => {
        state.webpageInfos.push(...resp.data.records)
        state.pages = parseInt(resp.data.pages)
        state.allTotal = parseInt(resp.data.total)
    })
}

function getStarPages() {
    const result = webpageApi.getStar(++state.page)
    result.then((resp) => {
        state.webpageInfos.push(...resp.data.records)
        state.pages = parseInt(resp.data.pages)
        state.starTotal = parseInt(resp.data.total)
    })
}

function getTodayPages() {
    const result = webpageApi.getToday(++state.page)
    result.then((resp) => {
        state.webpageInfos.push(...resp.data.records)
        state.pages = parseInt(resp.data.pages)
        state.todayTodal = parseInt(resp.data.total)
    })
}

function search() {
    const result = webpageApi.search("", state.searchText, ++state.page)
    result.then((resp) => {
        state.webpageInfos.push(...resp.data.records)
        state.pages = parseInt(resp.data.pages)
    })
}

function showAddWebPageUrlModal() {
    state.sourceUrl = ''
    state.showAddWebPageModal = true
}

function closeAddWebPageUrlModal() {
    state.showAddWebPageModal = false
}

function openUrl(event: Event, url: string) {
    event.preventDefault()
    shell.openExternal(url)
}

function addWebPageUrl() {
    webpageApi.add({
        "url": state.sourceUrl
    }).then((resp) => {
        state.showAddWebPageModal = false
        getAllPages()
    })
}

function deleteWebpageCard(id: any) {
    ElMessageBox.confirm(
        '确认删除卡片吗?',
        'Warning',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {
            webpageApi.remove({
                id: id,
            }).then(resp => {
                console.log(resp.code === "0000000")
                if (resp.code === "0000000") {
                    if (state.active === 'all') {
                        handleClickAll()
                    } else if (state.active === 'star') {
                        handleClickStar()
                    } else if (state.active === 'today') {
                        handleClickToday()
                    }
                    ElMessage({
                        type: 'success',
                        message: '删除成功',
                    })
                } else {
                    ElMessage({
                        type: 'info',
                        message: resp.desc,
                    })
                }
            })
        })
}

</script>

<style scoped >

</style>