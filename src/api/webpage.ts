import request from '../plugins/request'
import config from '../config/index'
import { pa } from 'element-plus/es/locale'

export const webpageApi = {
    add: (data: any) => {
        return request({
            url: `${config.url}/webpage/add/`,
            method: 'post',
            data
        })
    },
    addTag: (data: any) => {
        return request({
            url: `${config.url}/webpage/addTag`,
            method: 'post',
            data
        })
    },
    removeTag: (data: any) => {
        return request({
            url: `${config.url}/webpage/removeTag`,
            method: 'post',
            data
        })
    },
    changeGroup: (data: any) => {
        return request({
            url: `${config.url}/webpage/changeGroup`,
            method: 'post',
            data
        })
    },
    remove: (data: any) => {
        return request({
            url: `${config.url}/webpage/remove`,
            method: 'post',
            data
        })
    },
    get: (id: number) => {
        return request({
            url: `${config.url}/webpage/get/${id}`,
            method: 'get'
        })
    },
    detail: () => {
        return request({
            url: `${config.url}/webpage/detail`,
            method: 'get'
        })
    },
    getAll: (page: number) => {
        return request({
            url: `${config.url}/webpage/list/all/${page}`,
            method: 'get'
        })
    },
    getStar: (page: number) => {
        return request({
            url: `${config.url}/webpage/list/star/${page}`,
            method: 'get'
        })
    },
    getToday: (page: number) => {
        return request({
            url: `${config.url}/webpage/list/today/${page}`,
            method: 'get'
        })
    },
    search: (type: string, q: string, page: number) => {
        return request({
            url: `${config.url}/webpage/search?type=${type}&q=${q}&page=${page}`,
            method: 'get'
        })
    },
}