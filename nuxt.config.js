export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'my-forum',
    htmlAttrs: {
      lang: 'zh-CN'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'google', content: 'notranslate' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'ant-design-vue/dist/antd.css',
    '~/assets/iconfont/svg.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/antd-ui',
    '~/plugins/axios'
  ],
  router: {
    middleware: 'auth'
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // 挂载nuxt模块
    '@nuxtjs/style-resources',
    'cookie-universal-nuxt', ['cookie-universal-nuxt', {
      parseJSON: true
    }]
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // 配置模块
  styleResources: {
    less: [
      './assets/config.less',
    ] 
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
