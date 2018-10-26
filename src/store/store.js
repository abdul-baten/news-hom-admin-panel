import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import profile from './modules/profile'
import user from './modules/user'
import news from './modules/news'
import comment from './modules/comment'
import reports from './modules/reports'
import badWords from './modules/bad_words'
import modal from './modules/modal'
import content from './modules/content'
import countries from './modules/countries'
import cities from './modules/cities'
import charts from './modules/charts'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    profile,
    user,
    comment,
    reports,
    badWords,
    news,
    modal,
    content,
    countries,
    cities,
    charts
  }
})
