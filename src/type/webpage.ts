export interface WebPageSideBarNav {
  name: string
  label: string
  selected: boolean
}

export interface WebPageCategory {
  num: number
  name: string
  type: string
  selected: boolean
}

export interface WebPageCardOperationState {
  checkNum: number
  checkAll: boolean
  categoryName: string
  checkAllVisible: boolean
}

export interface WebPageInfo {
  page: number
  pages: number
  total: number
  records: Array<WebPage>
}

export interface WebPage {
  id: number
  userId: number
  groupId: number
  url: string
  title: string
  source: string
  isStar: string
  favicon: string
  description: string
  updateTime: string
  createTime: string
  checked: boolean
  checkboxVisible: boolean
}

export interface WebPageTaskCategory {
  num: number
  name: string
  type: string
  selected: boolean
}
