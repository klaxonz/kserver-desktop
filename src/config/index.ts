interface Config {
    url: String
}

const config:Config = {
    url: ''
}

if (process.env.NODE_ENV === 'production') {
    config.url = 'http://localhost:9323'
} else {
    config.url = 'http://localhost:9323'
}

export default config