interface Config {
  host: string
  port: string

  getHttpRequestPath(): string

  getHttpsRequestPath(): string

  getWebSocketRequestPath(): string
}

class AppConfig implements Config {
  host: string
  port: string

  constructor(host: string, port: string) {
    this.host = host
    this.port = port
  }

  getHttpRequestPath(): string {
    return 'http://' + this.host + ':' + this.port
  }

  getHttpsRequestPath(): string {
    return 'http://' + this.host + ':' + this.port
  }

  getWebSocketRequestPath(): string {
    return 'ws://' + this.host + ':' + this.port
  }
}

export default process.env.NODE_ENV === 'production'
  ? new AppConfig('localhost', '9001')
  : new AppConfig('localhost', '9001')
