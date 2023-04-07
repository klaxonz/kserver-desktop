import request from '../plugins/index'
import { WebPage, WebPageDrawerNavDetail } from '@/type/web-page'

interface PageValue<T> {
  page: number
  size: number
  total: number
  list: T[]
}

export const webPageApi = {
  create: (data: any) => {
    return request.post('web-page/create', data)
  },
  delete: (data: any) => {
    return request.post('web-page/delete', data)
  },
  batchDelete: (data: any) => {
    return request.post('web-page/batch-delete', data)
  },
  count: () => {
    return request.get<WebPageDrawerNavDetail>('web-page/count')
  },
  list: (data: any) => {
    return request.post<PageValue<WebPage>>('web-page/list', data)
  }
}
