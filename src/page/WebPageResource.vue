<template>
    <div class="flex flex-row h-full"
        style="font-family: PingFang SC,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji">
        <WebPageSideBar :topNavs="topNavs" :bottomNavs="bottomNavs" />
        <WebPageDrawer :categoryState="categoryState" @category-selected="handleNav" />
        <WebPageContent :search-text="state.searchText" :operation-state="operationState" :web-page-list="webpageInfo.records"
            @add-page="showAddWebPageUrlModal" 
            @search="handleClickSearch" 
            @update-search-value="value => state.searchText = value"
            @left-click="handleCardLeftClick"
            @right-click="handleCardRightClick"
            @batch-star-operation=""
            @batch-delete-operation="" 
            @batch-exit-operation="handleExitMoreOption"
        />  

        <WebPageAddDialog :source="state.searchText" :visible="visibleState.addWebPageModalVisible"
            @close-modal="closeAddWebPageUrlModal"
            @confirm-add-page="addWebPageUrl"
            @input="value => state.searchText = value"/>

        <WebPageWebview :visible="visibleState.dialogVisible" @update:visible="(value) => visibleState.dialogVisible = value"/>

        <transition name="contexmenu">
            <div v-if="contextmenuState.visible"
                class="absolute h-120px w-140px bg-light-50 rounded-md shadow-md text-sm text-gray-500 pt-4px overflow-hidden"
                v-bind:style="{ top: contextmenuState.top + 'px', left: contextmenuState.left + 'px', zIndex: 1000 }">
                <div class="hover:bg-gray-200 hover:rounded-md hover:cursor-pointer h-30px flex justify-start items-center ml-6px mr-4px mt-4px"
                    @click="openUrl(contextmenuState.webpage.url)">
                    <div class="flex justify-start items-center">
                        <View style="width: 1.2em; height: 1.2em; margin-left: 12px; margin-right: 8px" />
                        <p class="ml-4px">访问网页</p>
                    </div>
                </div>
                <div class="hover:bg-gray-200 hover:rounded-md hover:cursor-pointer h-30px flex justify-start items-center ml-6px mr-4px mt-4px"
                    @click="copyUrl(contextmenuState.webpage.url)">
                    <div class="flex justify-start items-center">
                        <Link style="width: 1.2em; height: 1.2em; margin-left: 12px; margin-right: 8px" />
                        <p class="ml-4px">复制链接</p>
                    </div>
                </div>
                <div class="hover:bg-gray-200 hover:rounded-md hover:cursor-pointer h-30px flex justify-start items-center ml-6px mr-4px mt-4px"
                    @click="deleteCard(contextmenuState.webpage.id)">
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
import { onMounted, reactive, nextTick, computed } from 'vue'
import { useRouter } from 'vue-router'
import { webpageApi } from '../api/webpage'
import { accountApi } from '../api/account'
import { message } from '../utils/message'
import { clipboard } from 'electron'
import { ElMessageBox } from 'element-plus'
import WebPageSideBar from '../components/webpage/WebPageSideBar.vue'
import WebPageDrawer from '../components/webpage/WebPageDrawer.vue'
import WebPageContent from '../components/webpage/WebPageContent.vue'
import WebPageAddDialog from '../components/webpage/WebPageAddDialog.vue'
import WebPageWebview from '../components/webpage/WebPageWebview.vue'
import RightClickMenu from '../components/webpage/RightClickMenu.vue'

import { View, Link, DeleteFilled } from '@element-plus/icons-vue'

const router = useRouter()

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

const categoryState = reactive<Array<WebPageCategory>>([
    {
        num: 0,
        name: "所有",
        type: "all",
        selected: true
    },
    {
        num: 0,
        name: "星标",
        type: "star",
        selected: false
    },
    {
        num: 0,
        name: "今日",
        type: "today",
        selected: false
    }
])

const categorySelectedState = reactive({
    type: computed(() => {
        return categoryState.filter(item => item.selected)
    }).value[0].type,

    selectedCategory: computed(() => {
        return categoryState.filter(item => item.selected)
    }).value[0]
})

const webpageInfo = reactive<WebPageInfo>({
    page: 0,
    pages: 0,
    total: 0,
    records: []
})

const operationState = reactive<WebPageCardOperationState>({
    checkAll: computed({
        get: () => {
            return webpageInfo.records.length === webpageInfo.records.filter(e => e.checked).length
        },
        set: (val) => {
            webpageInfo.records.forEach(item => item.checked = val)
            webpageInfo.records.forEach(item => item.checkboxVisible = val)
        }
    }).value,

    checkNum: computed(() => {
        return webpageInfo.records.filter(e => e.checked).length
    }).value,

    checkAllVisible: computed(() => {
        return webpageInfo.records.filter(e => e.checked).length > 0
    }).value,

    categoryName: computed(() => {
        return categoryState.filter(e => e.selected)[0].name
    }).value
})

const state = reactive({
    firstPage: 1,
    sourceUrl: '',
    searchText: '',
})

const activeNav = reactive({
    type: "all",
    name: "所有",
    nums: 0
})

const contextmenuState = reactive({
    top: 0,
    left: 0,
    visible: false,
    webpage: null
})

const visibleState = reactive({
    dialogVisible: false,
    addWebPageModalVisible: false,
    loginDialogVisible: false,
    accountModalVisible: false,
})

onMounted(() => {
    resetState()
    getDetail()
    getCardList(activeNav.type, ++webpageInfo.page)
})



function handleNav(category: WebPageCategory) {
    categoryState.forEach(item => {
        item.selected = item.type === category.type
    })
    resetState()
    resetSearchText()
    getDetail()
    getCardList(category.type, ++webpageInfo.page)
}

function resetState() {
    webpageInfo.page = 0
    webpageInfo.pages = 0
    webpageInfo.records = []
}

function resetSearchText() {
    state.searchText = ''
}

function handleClickSearch() {
    resetState()
    search()
}

async function getDetail() {
    const { data } = await webpageApi.detail()
    for (let i = 0; i < categoryState.length; i++) {
        if (categoryState[i].type === 'all') {
            categoryState[i].num = data.data.allTotal
        }
        if (categoryState[i].type === 'star') {
            categoryState[i].num = data.data.starTotal
        }
        if (categoryState[i].type === 'today') {
            categoryState[i].num = data.data.todayTotal
        }
    }
}

async function getCardList(type: string, page: number) {
    let data = await webpageApi.list({
        type: type,
        page: page,
        pageSize: 50
    })
    if (page === 1) {
        webpageInfo.records = []
    }
    const result = data.data.data
    webpageInfo.records.push(...result.records)
    webpageInfo.pages = parseInt(result.pages)
    webpageInfo.records.forEach(item => item.checked = false)
    webpageInfo.records.forEach(item => item.checkboxVisible = false)
}

async function search() {
    const { data } = await webpageApi.search(state.searchText, ++webpageInfo.page)
    const result = data.data
    webpageInfo.records = []
    webpageInfo.records.push(...result.records)
    webpageInfo.records.forEach(item => item.checked = false)
    webpageInfo.records.forEach(item => item.checkboxVisible = false)
    webpageInfo.pages = parseInt(result.pages)
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
    closeContentMenu()
    nextTick(() => {
        const wv = document.getElementById("webview")
        if (wv !== null) {
            wv.setAttribute('src', url)
        }
    })
    
}

async function addWebPageUrl() {
    await webpageApi.add({
        "url": state.sourceUrl
    }).finally(() => {
        visibleState.addWebPageModalVisible = false
    })
    getDetail()
    getCardList(categorySelectedState.type, state.firstPage)
 
}

function handleCardRightClick(event: MouseEvent, refId: number) {
    const webpage = getWebPage(refId)
    
    if (contextmenuState.visible) {
        contextmenuState.visible = false
        nextTick(() => {
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
    contextmenuState.webpage = webpage
}

function handleCardLeftClick(event: Event, refId: number) {
    if (operationState.checkAllVisible) {
        webpageInfo.records.forEach(item => {
            if (refId === item.id) {
                item.checked = !item.checked
                event.preventDefault()
            }
        })
    }
}

function handleCardMouseEnter(event: Event, refId: number) {
    webpageInfo.records.forEach(item => {
        if (refId === item.id) {
            if (!item.checkboxVisible) {
                item.checkboxVisible = true
            }
        }
    })
}

function handleCardMouseLeave(event: Event, refId: number) {
    if (!state.checkAllVisible) {
        webpageInfo.records.forEach(item => {
            if (refId === item.id) {
                if (item.checkboxVisible) {
                    item.checkboxVisible = false
                }
            }
        })
    }
}

function handleExitMoreOption() {
    webpageInfo.records.forEach(item => item.checked = false)
    webpageInfo.records.forEach(item => item.checkboxVisible = false)
}

function closeContentMenu() {
    contextmenuState.visible = false
}

function deleteCard(id: any) {
    ElMessageBox.confirm(
        '确认删除卡片吗?',
        '警告',
        {
            type: 'warning',
            cancelButtonText: '取消',
            confirmButtonText: '确认',
        }
    ).then(async () => {
        await webpageApi.remove({ id: id })
        handleNav(categorySelectedState.selectedCategory)
        closeContentMenu()
        message.success("删除成功")
    })
}

function batchDeleteWebpageCard() {
    ElMessageBox.confirm(
        '确认删除选中卡片吗?',
        '警告',
        {
            type: 'warning',
            cancelButtonText: '取消',
            confirmButtonText: '确认',
        }
    ).then(async () => {
        const ids = webpageInfo.records
            .filter(e => e.checked)
            .map(e => e.id)
        await webpageApi.batchRemove(ids)
        handleNav(categorySelectedState.selectedCategory)
        closeContentMenu()
        message.success("删除成功")
    })
}

function copyUrl(url: string) {
    clipboard.writeText(url, 'selection')
    closeContentMenu()
    message.success("链接已成功复制到粘贴板")
}


function getWebPage(webpageId: number) {
    let webpage = null
    webpageInfo.records.forEach(item => {
        if (webpageId === item.id) {
            webpage = item
        }
    })
    return webpage
}

function handleLogout() {
    accountApi.logout().then(resp => {
        router.push({ name: 'Login' })
    })
}

</script>

<style>
.bg-my {
    background: aqua;
}

.contexmenu-enter-active {
    animation: contexmenu-in 0.2s;
}

.contexmenu-leave-active {
    animation: contexmenu-in 0.2s reverse;
}

@keyframes contexmenu-in {
    from {
        height: 0px;
    }

    to {
        height: 120px;
    }
}
</style>