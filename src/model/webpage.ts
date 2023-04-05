class WebPage {
  id: number
  groupId: number
  url: string
  source: string
  title: string
  description: string
  createTime: Date
  updateTime: Date

  constructor(
    id: number,
    groupId: number,
    url: string,
    source: string,
    title: string,
    description: string,
    createTime: Date,
    updateTime: Date
  ) {
    this.id = id
    this.groupId = groupId
    this.url = url
    ;(this.source = source),
      (this.title = title),
      (this.description = description),
      (this.createTime = createTime),
      (this.updateTime = updateTime)
  }
}

export {}
