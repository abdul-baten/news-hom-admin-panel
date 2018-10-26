import Vue from 'vue'
import moment from 'moment'

Vue.filter('dateTimeFormatter', dateTime => {
  if (!dateTime) {
    return ''
  }
  return moment(dateTime * 1000).format('DD MMM YYYY')
})

Vue.filter('momentAgoFormatter', dateTime => {
  if (!dateTime) {
    return ''
  }
  return moment(dateTime).fromNow()
})
