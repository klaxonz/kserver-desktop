import request from '../plugins/index'

export const webpageApi = {
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
    return request.get('web-page/count')
  },
  list: (data: any, q?: string) => {
    let api = 'web-page/list'
    if (q) {
      api += `?q=${q}`
    }
    return request.post(api, data)
  }
}
