// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Meta from 'vue-meta'

import VuePlyr from 'vue-plyr'

import Trend from 'vuetrend'

import store from '@/store/store'

import SocialSharing from 'vue-social-sharing'

// import Cookies from 'js-cookie'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'

import VueCarousel from 'vue-carousel'

import 'normalize.css/normalize.css'
import 'bulma/css/bulma.min.css'
import '@/assets/css/index.scss'

import 'vue-material-design-icons/styles.css'
import 'vue-plyr/dist/vue-plyr.css'

import './filter/global.filter'

Vue.use(Meta)
Vue.use(Element, {
  locale
})
Vue.use(VueCarousel)
Vue.use(Trend)
Vue.use(VuePlyr)
Vue.use(SocialSharing)
// Vue.use(bulmaCarousel)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>',
  render: h => h(App)
})
