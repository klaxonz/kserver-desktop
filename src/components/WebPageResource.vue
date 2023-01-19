<template>
    <div class="flex flex-row h-full" style="font-family: PingFang SC,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji">
        <div class="w-80px bg-gray-200">
            <div class="container mt-5">
                <div class="h-48px w-60px mx-auto mb-2 flex justify-center items-center hover:bg-gray-300 cursor-pointer rounded-md"
                    :class="{'bg-gray-300': state.activeSide === 'favorite'}">
                    <div>收藏</div>
                </div>
                <div class="h-48px w-60px mx-auto mb-2 flex justify-center items-center hover:bg-gray-300 cursor-pointer rounded-md"
                    :class="{'bg-gray-300': state.activeSide === 'tag'}">
                    <div>标签</div>
                </div>
                <div class="h-48px w-60px mx-auto mb-2 flex justify-center items-center hover:bg-gray-300 cursor-pointer rounded-md"
                    :class="{'bg-gray-300': state.activeSide === 'mark'}">
                    <div>标注</div>
                </div>
                <div class="h-48px w-60px mx-auto mb-2 flex justify-center items-center hover:bg-gray-300 cursor-pointer rounded-md"
                    :class="{'bg-gray-300': state.activeSide === 'archive'}">
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
                        <div v-for="nav in navState"
                            class="h-40px bg-gray-200  rounded-lg mb-2 cursor-pointer"
                            :class="{'bg-blue-500': activeNav.type===nav.type, 'text-light-100': activeNav.type===nav.type}"
                            @click="handleNav(nav.type)">
                            <div class="h-full flex justify-between ml-5 mr-5">
                                <div class="h-full flex justify-center items-center">
                                    {{nav.name}}
                                </div>
                                <div class="h-full flex justify-center items-center">
                                    <div>{{nav.nums}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex-1 border-gray-200 border-solid border" style="background-color: #edeff3">
            <div class="h-full ml-5 mr-5 mt-5 flex flex-col">
                <div class="flex justify-between">
                    <div>
                        <el-input
                            v-model="state.searchText"
                            class="h-36px w-500px rounded-md pl-2 outline-gray-200"
                            @keyup.enter.native='handleClickSearch'
                            placeholder="搜索"
                            >
                            <template #prepend>
                                <el-button :icon="Search" />
                            </template>
                        </el-input>
                    </div>
                    <div>
                        <el-button class="h-full" type="primary" :icon="CirclePlusFilled" @click="showAddWebPageUrlModal()"/>
                    </div>
                </div>
                <div class="mt-8 ">
                    <div class="flex justify-between items-center h-32px">
                        <div class="flex justify-between items-center">
                            <div v-if="state.checkAllVisible" >
                                <el-checkbox v-model="state.checkAll" />
                            </div>
                            <div class="font-semibold text-md ml-8px">{{activeNav.name}}</div>
                            <div v-if="state.checkAllVisible" class="font-semibold text-md ml-8px text-gray-500">
                                已选择{{state.checkNum}}项
                            </div>
                        </div>

                        <div v-if="state.checkAllVisible">
                            <el-dropdown class="mr-4px">
                                <el-button class="bg-opacity-25" type="primary" :icon="More"></el-button>
                                <template #dropdown>
                                  <el-dropdown-menu>
                                    <el-dropdown-item><el-icon><Star /></el-icon>星标</el-dropdown-item>
                                    <el-dropdown-item @click="batchDeleteWebpageCard()"><el-icon><Delete /></el-icon>删除</el-dropdown-item>
                                  </el-dropdown-menu>
                                </template>
                            </el-dropdown>
                            <el-button type="primary" :icon="CircleClose" @click="handleExitMoreOption()">退出多选操作</el-button>
                        </div>
                    </div>
                </div>
                <div class="mt-5 h-screen flex-1" style="overflow-x: scroll;" @scroll="handleScroll">
                    <div class="grid "
                        style="grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); grid-gap: 20px 20px;">
                        <div class="h-200px  rounded-2xl cursor-pointer hover:shadow-md  "
                            :class="{'border-blue-400': webpage.checked, 'border-r-3px': webpage.checked, 'bg-blue-400': webpage.checked,
                                 'bg-opacity-25': webpage.checked, 'bg-light-100': !webpage.checked}"
                             @click.right="handleCardRightClick($event, webpage.id)"  @click.left="handleCardLeftClick($event, webpage.id)"
                             @mouseenter="handleCardMouseEnter($event, webpage.id)"
                             @mouseleave="handleCardMouseLeave($event, webpage.id)"
                             v-on-click-outside="closeContentMenu"
                             v-for="webpage in webpageInfo.records">
                                <div class="h-full w-full">
                                    <div class="h-full flex-col">
                                        <div class="h-168px flex justify-between">
                                            <div class="pl-4 pr-4 pt-3">
                                                <div class="text-base font-medium"
                                                    style="word-wrap: break-word; word-break:break-all; overflow:hidden; text-overflow: -o-ellipsis-lastline;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;line-clamp: 2;-webkit-box-orient: vertical;">
                                                    {{webpage.title}}
                                                </div>
                                                <div class="text-xs text-gray-600 mt-2"
                                                    style="word-wrap: break-word; word-break:break-all; overflow:hidden; text-overflow: -o-ellipsis-lastline;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 5;line-clamp: 5;-webkit-box-orient: vertical;">
                                                    {{webpage.description}}</div>
                                            </div>
                                            <div class="w-24px mr-4 mt-2" :class="{'visible': webpage.checkboxVisible, 'invisible': !webpage.checkboxVisible}">
                                                <el-checkbox v-model="webpage.checked"/>
                                            </div>
                                        </div>
                                        <div class="h-32px text-xs rounded-b-2xl flex justify-between items-center pl-4 pr-6" style="background-color: #f6f7f9; color: #6d7582">
                                            <div class="flex justify-between">
                                                <img :src="webpage.favicon" class="h-16px w-16px">
                                                <p class="ml-8px">{{getHost(webpage.source)}}</p>
                                            </div>
                                            <div>{{getFormateTime(webpage.createTime)}}</div>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="visibleState.addWebPageModalVisible"
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
        <el-dialog v-model="visibleState.dialogVisible" width="60%">
            <div style="height:70vh;">
                <webview nodeintegration allowpopups id="webview" class="w-full h-full"></webview>
            </div>
        </el-dialog>

        <transition name="contexmenu">
            <div v-if="contextmenuState.visible" class="absolute h-120px w-140px bg-light-50 rounded-md shadow-md text-sm text-gray-500 pt-4px overflow-hidden"
                v-bind:style="{ top: contextmenuState.top + 'px', left: contextmenuState.left + 'px', zIndex: 1000 }">
                <div class="hover:bg-gray-200 hover:rounded-md hover:cursor-pointer h-30px flex justify-start items-center ml-6px mr-4px mt-4px"
                    @click="openUrl(webpage.url)"
                >
                    <div class="flex justify-start items-center">
                        <View style="width: 1.2em; height: 1.2em; margin-left: 12px; margin-right: 8px" />
                        <p class="ml-4px">访问网页</p>
                    </div>
                </div>
                <div class="hover:bg-gray-200 hover:rounded-md hover:cursor-pointer h-30px flex justify-start items-center ml-6px mr-4px mt-4px"
                    @click="copyUrl(webpage.url)"
                >
                    <div class="flex justify-start items-center">
                        <Link style="width: 1.2em; height: 1.2em; margin-left: 12px; margin-right: 8px" />
                        <p class="ml-4px" >复制链接</p>
                    </div>
                </div>
                <div class="hover:bg-gray-200 hover:rounded-md hover:cursor-pointer h-30px flex justify-start items-center ml-6px mr-4px mt-4px"
                    @click="deleteWebpageCard(webpage.id)"
                >
                    <div class="flex justify-start items-center">
                        <DeleteFilled style="width: 1.2em; height: 1.2em; margin-left: 12px; margin-right: 8px" />
                        <p class="ml-4px">删除收藏</p>
                    </div>
                </div>
            </div>
        </transition>

    </div>
</template>

<script setup lang="ts">
import { onBeforeUpdate, onMounted, reactive, ref, isProxy, toRaw, nextTick, unref, computed } from 'vue'
import { webpageApi } from '../api/webpage'
import { clipboard } from 'electron'
import { CheckboxValueType, ElButton, ElCheckbox, ElDialog, ElDropdown, ElDropdownItem, ElDropdownMenu, ElMessage, ElMessageBox, ElPopover } from 'element-plus'
import {
    Link,
    View,
    More,
    Star,
    Delete,
    CirclePlusFilled,
    Search,
    DeleteFilled,
    CircleClose
} from '@element-plus/icons-vue'
import moment from 'moment'
import "moment/dist/locale/zh-cn";
import { vOnClickOutside } from '@vueuse/components'

interface WebPage {
    id: number
    groupId: number
    url: string
    title: string
    source: string
    favicon: string
    checked: boolean,
    checkboxVisible: boolean,
    description: string
    updateTime: number
    createTime: number
}
interface WebPageInfo {
    page: number
    pages: number
    total: number
    records: Array<WebPage>
}
interface WebPageDetail {
    allTotal: number
    starTotal: number
    todayTotal: number
}

const webpageDetail = ref<WebPageDetail>({
    allTotal: 0,
    starTotal: 0,
    todayTotal: 0
})
const webpageInfo = ref<WebPageInfo>({
    page: 0,
    pages: 0,
    total: 0,
    records: []
})
const webpageList = ref<WebPage[]>([])

const state = reactive({
    firstPage: 1,
    sourceUrl: '',
    active: "all",
    activeSide: "favorite",
    searchText: '',
    checkbox: false,
    checkAll: computed({
        get: () => {
            return webpageInfo.value.records.length === webpageInfo.value.records.filter(e => e.checked).length
        },
        set: (val) => {
            webpageInfo.value.records.forEach(item => item.checked = val)
            webpageInfo.value.records.forEach(item => item.checkboxVisible = val)
        }
    }),
    checkNum: computed(() => {
        return webpageInfo.value.records.filter(e => e.checked).length
    }),
    checkAllVisible: computed(() => {
        return webpageInfo.value.records.filter(e => e.checked).length > 0
    }),
})

const navState = reactive([
    {
        type: "all",
        name: "所有",
        nums: 0,
    },
    {
        type: "star",
        name: "星标",
        nums: 0,
    },
    {
        type: "today",
        name: "今日",
        nums: 0,
    },
])
const activeNav = reactive({
    type: "all",
    name: "所有",
    nums: 0
})

const contextmenuState = reactive({
    top: 0,
    left: 0,
    visible: false,
})

const webpage = ref<WebPage>({
    id: 0,
    groupId: 0,
    url: '',
    title: '',
    source: '',
    favicon: '',
    checked: false,
    checkboxVisible: false,
    description: '',
    updateTime: 0,
    createTime: 0
})

const visibleState = reactive({
    dialogVisible: false,
    addWebPageModalVisible: false,
})

onMounted(() => {
    resetState()
    getDetail()
    getCardList(activeNav.type, ++webpageInfo.value.page)
})

function handleScroll(e:any) {
    const { scrollTop, clientHeight, scrollHeight } = e.target
    if (scrollTop + clientHeight === scrollHeight) {
        if (webpageInfo.value.total != webpageList.value.length) {
            // getAllPages(++webpageInfo.value.page)
        }
    }
}

function resetState() {
    webpageList.value = []
    webpageInfo.value.page = 0
    webpageInfo.value.pages = 0
}

function resetSearchText() {
    state.searchText = ''
}

function handleNav(type:string) {
    for (let i = 0; i < navState.length; i++) {
        if (type === navState[i].type) {
            activeNav.name = navState[i].name
            activeNav.type = navState[i].type
            break
        }
    }
    resetState()
    resetSearchText()
    getDetail()
    getCardList(type, ++webpageInfo.value.page)
}

function handleClickSearch() {
    resetState()
    search()
}

async function getDetail() {
    const { data } = await webpageApi.detail()
    webpageDetail.value = data.data as WebPageDetail
    for (let i = 0; i < navState.length; i++) {
        if (navState[i].type === 'all') {
            navState[i].nums = data.data.allTotal
        }
        if (navState[i].type === 'star') {
            navState[i].nums = data.data.starTotal
        }
        if (navState[i].type === 'today') {
            navState[i].nums = data.data.todayTotal
        }
    }
}

async function getCardList(type:string, page:number) {
    let data 
    if (type === 'all') {
        data = await webpageApi.getAll(page)
    } else if (type === 'star') {
        data = await webpageApi.getStar(page)
    } else if (type === 'today') {
        data = await webpageApi.getToday(page)
    } else {
        return
    }
    const result = data.data.data
    if (page === state.firstPage) {
        webpageInfo.value.records = []
    }
    webpageInfo.value.records.push(...result.records)
    webpageInfo.value.pages = parseInt(result.pages)
    webpageInfo.value.records.forEach(item => item.checked = false)
    webpageInfo.value.records.forEach(item => item.checkboxVisible = false)
}

async function search() {
    const { data } = await webpageApi.search(state.searchText, ++webpageInfo.value.page)
    const result = data.data
    webpageInfo.value.records = []
    webpageInfo.value.records.push(...result.records)
    webpageInfo.value.records.forEach(item => item.checked = false)
    webpageInfo.value.records.forEach(item => item.checkboxVisible = false)
    webpageInfo.value.pages = parseInt(result.pages)
}

function showAddWebPageUrlModal() {
    state.sourceUrl = ''
    visibleState.addWebPageModalVisible = true
}

function closeAddWebPageUrlModal() {
    visibleState.addWebPageModalVisible = false
}

function openUrl(url: string) {
    visibleState.dialogVisible = true
    const wv = document.getElementById("webview")
    if (wv !== null) {
        wv.setAttribute('src', url)
    }
}

async function addWebPageUrl() {
    const { data } = await webpageApi.add({
        "url": state.sourceUrl
    }).finally(() => {
        visibleState.addWebPageModalVisible = false
    }) 
    success("添加成功")
    getDetail()
    getCardList('all', state.firstPage)
}

function handleCardRightClick(event:MouseEvent, refId:number) {
    const data = getWebPage(refId)
    if (data !== null) {
        webpage.value = data as WebPage
    }
    if (contextmenuState.visible) {
        contextmenuState.visible = false
        nextTick(()=> {
            contextmenuState.visible = true
            if (event.target) {
                contextmenuState.top = event.y
                contextmenuState.left = event.x
            }
        })
    } else {
        contextmenuState.visible = true
        if (event.target) {
            contextmenuState.top = event.y
            contextmenuState.left = event.x
        }
    }
}

function handleCardLeftClick(event:Event, refId:number) {
    if (state.checkAllVisible) {
        webpageInfo.value.records.forEach( item => {
            if (refId === item.id) {
                item.checked = !item.checked
                event.preventDefault()
            }
        })
    }
}

function handleCardMouseEnter(event:Event, refId:number) {
    webpageInfo.value.records.forEach( item => {
        if (refId === item.id) {
            if (!item.checkboxVisible) {
                item.checkboxVisible = true
            }
        }
    })
}

function handleCardMouseLeave(event:Event, refId:number) {
    if (!state.checkAllVisible) {
        webpageInfo.value.records.forEach( item => {
            if (refId === item.id) {
                if (item.checkboxVisible) {
                    item.checkboxVisible = false
                }
            }
        })
    }
}

function handleExitMoreOption() {
    webpageInfo.value.records.forEach(item => item.checked = false)
    webpageInfo.value.records.forEach(item => item.checkboxVisible = false)
}

function closeContentMenu() {
    contextmenuState.visible = false
}

function deleteWebpageCard(id: any) {
    ElMessageBox.confirm(
        '确认删除卡片吗?',
        '警告',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    ).then(async () => {
        await webpageApi.remove({id: id})
        handleNav(activeNav.type)
        success("删除成功")
    })
}

function batchDeleteWebpageCard() {
    ElMessageBox.confirm(
        '确认删除选中卡片吗?',
        '警告',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    ).then(async () => {
        const ids = webpageInfo.value.records
            .filter(e => e.checked)
            .map(e => e.id)
        await webpageApi.batchRemove(ids)
        handleNav(activeNav.type)
        success("删除成功")
    })
}

function copyUrl(url: string) {
    clipboard.writeText(url, 'selection')
}

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

function getWebPage(webpageId:number) {
    let webpage = null
    webpageInfo.value.records.forEach(item => {
        if (webpageId === item.id) {
            webpage = item
        }
    })
    return webpage
}

function success(message: string) {
    ElMessage({
        type: 'success',
        message: message,
    })
}

function warning(message: string) {
    ElMessage({
        type: 'warning',
        message: message,
    })
}

function error(message: string) {
    ElMessage({
        type: 'error',
        message: message,
    })
}

function info(message: string) {
    ElMessage({
        type: 'info',
        message: message,
    })
}


</script>

<style >
.contexmenu-enter-active {
    animation: contexmenu-in 0.2s;
}
.contexmenu-leave-active {
    animation: contexmenu-in 0.2s reverse;
}
@keyframes contexmenu-in {
    from{
        height: 0px;
    }
    to{
        height: 120px;
    }
}
</style>