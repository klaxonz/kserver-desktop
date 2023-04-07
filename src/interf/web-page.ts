import { webPageApi } from '@/api/web-page'

const webPageInterface = {
  getWebPageDrawerDetail: async () => {
    const { data } = await webPageApi.count()
    return data.data
  },
  getWebPageCardList: async (type: string, page: number, pageSize?: number, query?: string) => {
    const requestBody = {
      type: type,
      page: page,
      query: query,
      pageSize: pageSize ?? 50
    }
    const { data } = await webPageApi.list(requestBody)
    return data.data
  }
}

export default webPageInterface
