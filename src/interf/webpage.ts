import { useWebpageStore } from "../stores"
import { webpageApi } from "../api/webpage"
const store = useWebpageStore()

export async function getWebpageCardList(page: number, pageSize?: number) {
    const isFirstPage = page == 1
    pageSize = pageSize ? pageSize : 50
    const searchText = store.text
    const category = store.activatedCategory.type

    const data = await webpageApi.list({
        type: category,
        page: page,
        pageSize: pageSize
    }, searchText)
    const result = data.data.data

    if(isFirstPage) {
        store.clearWebpageList()
    }
    store.addWebpageList(result.records)
}

export async function getDetail() {
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