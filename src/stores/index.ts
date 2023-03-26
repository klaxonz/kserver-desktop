// src/stores/index.ts
import { defineStore } from 'pinia'

const defaultWebpage: WebPage = {
  id: 0,
  userId: 0,
  groupId: 0,
  url: '',
  title: '',
  source: '',
  isStar: '',
  favicon: '',
  description: '',
  updateTime: '',
  createTime: '',
  checked: false,
  checkboxVisible: false
}

const categoryState: Array<WebPageCategory> = [
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
]

export const useWebpageStore = defineStore({
  id: 'webpage',
  state: () => ({
    sourceUrl: '',

    text: '',
    page: 1,
    pageSize: 50,
    webpageList: [] as WebPage[],
    activatedSideBar: '',
    activatedCategory: categoryState[0],

    top: 0,
    left: 0,
    visible: false,
    webpage: defaultWebpage,

    dialogVisible: false,
    addWebPageModalVisible: false,
    loginDialogVisible: false,
    accountModalVisible: false,

    categoryState: categoryState
  }),
  getters: {
    checkNum(): number {
      return this.webpageList.filter(item => item.checked).length
    },
    checkAll(): Boolean {
      return this.webpageList.filter(item => item.checked).length == this.webpageList.length
    },
    checkAllVisible(): Boolean {
      return this.checkNum > 0
    }
  },
  actions: {
    change(text: string) {
      this.text = text
    },
    changeCategory(caregory: WebPageCategory) {
      this.activatedCategory = caregory
    },
    clearWebpageList() {
      this.webpageList = []
    },
    addWebpage(webpage: WebPage) {
      this.webpageList.push(webpage)
    },
    addWebpageList(list: WebPage[]) {
      this.webpageList.push(...list)
    },
    updateCheckAll(checked: Boolean) {
      if (checked) {
        this.webpageList.forEach(item => item.checked = true)
      } else {
        this.webpageList.forEach(item => item.checked = false)
      }
    }
  }
})
