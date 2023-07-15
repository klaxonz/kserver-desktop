import request from '../plugins/index'

export const accountApi = {
  login: (data: any) => {
    return request.post('account/login', data)
  },
  logout: () => {
    return request.post('account/logout')
  },
  register: (data: any) => {
    return request.post('account/register', data)
  }
}
