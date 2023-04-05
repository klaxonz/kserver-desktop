import axios from 'axios'

const service = axios.create({
  baseURL: '/',
  timeout: 10000
})

service.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    const res = response.data
    if (res.code !== '0000000') {
      return Promise.reject(new Error(res.desc || 'Error'))
    } else {
      return res
    }
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default service
