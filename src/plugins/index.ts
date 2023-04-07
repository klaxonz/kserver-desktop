import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import config from '../config/index'

type Result<T> = {
  code: number
  desc: string
  data: T
  timestamp: Date
}

export class Request {
  instance: AxiosInstance
  baseConfig: AxiosRequestConfig = { baseURL: `${config.getHttpRequestPath()}/`, timeout: 60000 }

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(Object.assign(this.baseConfig, config))

    this.instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        const token = localStorage.getItem('token') as string
        if (token) {
          config.headers!.authorization = token
        }

        return config
      },
      (err: any) => {
        return Promise.reject(err)
      }
    )

    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        if (res.data.code !== '0000000') {
          return Promise.reject(res)
        }
        if (res.headers.authorization) {
          localStorage.setItem('token', res.headers.authorization)
        }
        return res
      },
      (err: any) => {
        this.handleResponse(err)
        return Promise.reject(err.response)
      }
    )
  }

  private handleResponse(error: any) {
    const status = error.response.status
    let message = ''
    if (status === 400) {
      message = '请求错误(400)'
    } else if (status === 401) {
      message = '未授权，请重新登录(401)'
    } else if (status === 403) {
      message = '拒绝访问(403)'
    } else if (status === 404) {
      message = '请求出错(404)'
    } else if (status === 408) {
      message = '请求超时(408)'
    } else if (status === 500) {
      message = '服务器错误(500)'
    } else if (status === 501) {
      message = '服务未实现(501)'
    } else if (status === 502) {
      message = '网络错误(502)'
    } else if (status === 503) {
      message = '服务不可用(503)'
    } else if (status === 504) {
      message = '网络超时(504)'
    } else if (status === 505) {
      message = 'HTTPS版本不受支持(505)'
    } else {
      message = `连接出错(${error.response.status})!`
    }
    ElMessage({
      showClose: true,
      message: `${message}，请检查网络或联系管理员！`,
      type: 'error'
    })
  }

  public request(config: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.instance.request(config)
  }

  public get<T = never>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<Result<T>>> {
    return this.instance.get(url, config)
  }

  public post<T = never>(url: string, data?: never, config?: AxiosRequestConfig): Promise<AxiosResponse<Result<T>>> {
    return this.instance.post(url, data, config)
  }

  public put<T = never>(url: string, data?: never, config?: AxiosRequestConfig): Promise<AxiosResponse<Result<T>>> {
    return this.instance.put(url, data, config)
  }

  public delete<T = never>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<Result<T>>> {
    return this.instance.delete(url, config)
  }
}

export default new Request({})
