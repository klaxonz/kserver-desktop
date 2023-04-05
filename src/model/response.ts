class Response {
  code: string
  desc: string
  timestamp: Date

  constructor(code: string, desc: string, timestamp: Date) {
    this.code = code
    this.desc = desc
    this.timestamp = timestamp
  }
}

export {}
