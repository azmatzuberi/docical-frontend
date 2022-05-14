const env = require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

console.log("ENV", process.env.NODE_ENV)

export default {
	publicRuntimeConfig: {
		app: {
			backend_URL: process.env.BACKEND_URL
		}
	},
	app: {
		privateRuntimeConfig: {
			backend_URL_Secret: process.env.BACKEND_URL
		},
	},
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Prove authenticity of your documents | Docical',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [ '~assets/scss/main.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
		{ src: '@/plugins/pdf', mode: 'client' },
		{ src: '@/plugins/signaturePad', mode: 'client' },
		{ src: '@/plugins/interact', mode: 'client' },
		{ src: '@/plugins/vue-html2pdf', mode: 'client' }
	],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/buefy
    'nuxt-buefy',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
		'@nuxtjs/auth-next'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
	auth: {
		strategies: {
			local: {
				scheme: 'refresh',
				token: {
					property: 'access_token',
					maxAge: 1800,
					global: true,
					type: '',
					max: 60 * 10
				},
				refreshToken: {
					property: 'refresh_token',
					data: 'refresh_token',
					maxAge: 60 * 60 * 24 * 7
				},
				user: {
					property: 'user',
				 // autoFetch: true
				},
				endpoints: {
					login: { url: `${process.env.BACKEND_URL}/api/users`, method: 'post' },
					refresh: { url: `${process.env.BACKEND_URL}/api/users/refresh`, method: 'post' },
					user: { url: `${process.env.BACKEND_URL}/api/users/user`, method: 'get' },
					logout: { url: `${process.env.BACKEND_URL}/api/users/logout`, method: 'delete' }
				},
				// autoLogout: false
			}
		}
	}	
}
