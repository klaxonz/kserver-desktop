import request from '../plugins/index'

export const taskApi = {
  list: (data: any) => {
    return request.post('web-page-task/list', data)
  },
  pause: (data: any) => {
    return request.post('web-page-task/pause', data)
  },
  retry: (data: any) => {
    return request.post('web-page-task/retry', data)
  },
  remove: (data: any) => {
    return request.post('web-page-task/remove', data)
  }
}
