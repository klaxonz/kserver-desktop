import { defineStore } from 'pinia'
import { WebPageTaskCategory } from '@/type/web-page'

const categoryState: Array<WebPageTaskCategory> = [
  {
    num: 0,
    name: '下载中',
    type: 'downloading',
    selected: true
  },
  {
    num: 0,
    name: '等待中',
    type: 'waiting',
    selected: false
  },
  {
    num: 0,
    name: '已完成',
    type: 'downloaded',
    selected: false
  }
]

export const useWebpageTaskStore = defineStore({
  id: 'webpageTask',
  state: () => ({
    categoryState: categoryState,
    activatedCategory: categoryState[0]
  }),
  getters: {},
  actions: {}
})
