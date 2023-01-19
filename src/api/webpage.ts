import request from '../plugins/index'

export const webpageApi = {
    add: (data: any) => {
        return request.post('webpage/add', data)
    },
    addTag: (data: any) => {
        return request.post('webpage/addTag', data)
    },
    removeTag: (data: any) => {
        return request.post('webpage/removeTag', data)
    },
    changeGroup: (data: any) => {
        return request.post('webpage/changeGroup', data)
    },
    remove: (data: any) => {
        return request.post('webpage/remove', data)
    },
    batchRemove: (data: any) => {
        return request.post('webpage/batchRemove', data)
    },
    get: (id: number) => {
        return request.get(`webpage/get/${id}`)
    },
    detail: () => {
        return request.get('webpage/detail')
    },
    getAll: (page: number) => {
        return request.get( `webpage/list/all/${page}`)
    },
    getStar: (page: number) => {
        return request.get(`webpage/list/star/${page}`)
    },
    getToday: (page: number) => {
        return request.get(`webpage/list/today/${page}`)
    },
    search: (q: string, page: number, type?: string) => {
        return request.get(`webpage/search?type=${type}&q=${q}&page=${page}`)
    },
}