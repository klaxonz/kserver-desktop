import request from '../plugins/index'

export const accountApi = {
  login: (data: never) => {
    return request.post('account/login', data)
  },
  logout: () => {
    return request.post('account/logout')
  },
  register: (data: never) => {
    return request.post('account/register', data)
  }
}
