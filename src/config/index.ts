interface Config {
  url: string
}

const config: Config = {
  url: ''
}

if (process.env.NODE_ENV === 'production') {
  config.url = 'http://localhost:9001'
} else {
  config.url = 'http://localhost:9001'
}

export default config
