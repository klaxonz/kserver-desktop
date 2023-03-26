<template>
    <div class="flex flex-row h-full"
        style="font-family: PingFang SC,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji">
        <WebPageSideBar />
        <WebPageDrawer />
        <WebPageContent />

        <WebPageAddDialog />

        <WebPageWebview />

        <WebPageContentCardItemOperation />
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { webpageApi } from '../api/webpage'
import { accountApi } from '../api/account'
import { message } from '../utils/message'
import { ElMessageBox } from 'element-plus'
import WebPageSideBar from '../components/webpage/WebPageSideBar.vue'
import WebPageDrawer from '../components/webpage/WebPageDrawer.vue'
import WebPageContent from '../components/webpage/WebPageContent.vue'
import WebPageAddDialog from '../components/webpage/WebPageAddDialog.vue'
import WebPageWebview from '../components/webpage/WebPageWebview.vue'
import { useWebpageStore } from '../stores'
import { getWebpageCardList } from '../interf/webpage'
import WebPageContentCardItemOperation from '../components/webpage/WebPageContentCardItemOperation.vue'


const router = useRouter()
const store = useWebpageStore()


const state = reactive({
    firstPage: 1,
    sourceUrl: '',
    searchText: '',
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
    getWebpageCardList(1)
})



function resetState() {
    store.text = ''
    store.webpageList = []
}

async function getDetail() {
    const { data } = await webpageApi.detail()
    for (let i = 0; i < store.categoryState.length; i++) {
        if (store.categoryState[i].type === 'all') {
            store.categoryState[i].num = data.data.allTotal
        }
        if (store.categoryState[i].type === 'star') {
            store.categoryState[i].num = data.data.starTotal
        }
        if (store.categoryState[i].type === 'today') {
            store.categoryState[i].num = data.data.todayTotal
        }
    }
}

function showAddWebPageUrlModal() {
    state.sourceUrl = ''
    visibleState.addWebPageModalVisible = true
}



async function addWebPageUrl() {
    await webpageApi.add({
        "url": state.sourceUrl
    }).finally(() => {
        visibleState.addWebPageModalVisible = false
    })
    getDetail()
    // getCardList(categorySelectedState.type, state.firstPage)

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