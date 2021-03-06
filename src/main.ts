import Vue from 'vue'
import Component from 'vue-class-component'

import 'normalize.css'
import ElementUI from 'element-ui'
import SvgIcon from 'vue-svgicon'
import '@/styles/index.scss'
import '@/icons/components'
import http from '@/api'

/**
 * This project originally used easy-mock to simulate data requests,
 * but its official service is not stable.
 * So here We use Mock.js for a local emulation,
 * it will intercept your request and you won't see the request in the network.
 * If you remove `import '../mock'` it will automatically request easy-mock data.
 */
import '../mock' // simulation data requests

import App from '@/App.vue'
import router from '@/routes'
import '@/routes/permission'
import store from '@/store'
import '@/registerServiceWorker'

// console.log(http)
// console.log(http.user.checkUser({aa: '112asds'}))

Vue.use(ElementUI)
Vue.use(SvgIcon, {
  tagName: 'svg-icon',
  defaultWidth: '1em',
  defaultHeight: '1em'
})

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate'
])

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
