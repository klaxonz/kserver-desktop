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

// 导出Request，可以用来自定义传递配置来创建实例
export class Request {
  // axios 实例
  instance: AxiosInstance
  // 基础配置，url和超时时间
  baseConfig: AxiosRequestConfig = { baseURL: `${config.url}/`, timeout: 60000 }

  constructor(config: AxiosRequestConfig) {
    // 使用axios.create创建axios实例，配置为基础配置和我们传递进来的配置
    this.instance = axios.create(Object.assign(this.baseConfig, config))

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        // 一般会请求拦截里面加token，用于后端的验证
        const token = localStorage.getItem('token') as string
        if (token) {
          config.headers!.authorization = token
        }

        return config
      },
      (err: any) => {
        // 请求错误，这里可以用全局提示框进行提示
        return Promise.reject(err)
      }
    )

    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        // 直接返回res，当然你也可以只返回res.data
        if (res.data.code !== '0000000') {
          return Promise.reject(res)
        }
        if (res.headers.authorization) {
          localStorage.setItem('token', res.headers.authorization)
        }
        // 系统如果有自定义code也可以在这里处理
        return res
      },
      (err: any) => {
        this.handleResponse(err)
        // 这里是AxiosError类型，所以一般我们只reject我们需要的响应即可
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
    // 这里错误消息可以使用全局弹框展示出来
    ElMessage({
      showClose: true,
      message: `${message}，请检查网络或联系管理员！`,
      type: 'error'
    })
  }

  // 定义请求方法
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

// 默认导出Request实例
export default new Request({})
