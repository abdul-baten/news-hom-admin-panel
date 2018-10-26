import db from '@/plugins/firebase/init'
import Slugify from 'slugify'
import { Notification } from 'element-ui'

const state = {
  newsData: [],
  orderByCreation: 'createdAt',
  totalNewsCount: 0,
  totalNewsLikesCount: [0],
  totalNewsLikesCountBasedOnDateRange: [0],
  totalNewsDislikesCountBasedOnDateRange: [0],
  totalNewsCommentsCountBasedOnDateRange: [0],
  totalNewsDislikesCount: [0],
  totalNewsFakeCount: [0],
  lastVisibleResult: null,
  singleNewsData: [],
  totalNewsCountForPagination: 0
}
const getters = {
  news (state) {
    return state.newsData
  },
  getTotalNewsResult (state) {
    return state.totalNewsCount
  },
  getTotalNewsCountForPagination (state) {
    return state.totalNewsCountForPagination
  },
  getTotalNewsLikesCount (state) {
    const reducer = (accumulator, currentValue) => accumulator + currentValue
    return state.totalNewsLikesCount.reduce(reducer)
  },
  getTotalNewsLikesCountBasedOnDateRange (state) {
    const reducer = (accumulator, currentValue) => accumulator + currentValue
    return state.totalNewsLikesCountBasedOnDateRange.reduce(reducer)
  },
  getTotalNewsDislikesCountBasedOnDateRange (state) {
    const reducer = (accumulator, currentValue) => accumulator + currentValue
    return state.totalNewsDislikesCountBasedOnDateRange.reduce(reducer)
  },
  getTotalNewsDislikesCount (state) {
    const reducer = (accumulator, currentValue) => accumulator + currentValue
    return state.totalNewsDislikesCount.reduce(reducer)
  },
  getTotalNewsCommentsCountBasedOnDateRange (state) {
    const reducer = (accumulator, currentValue) => accumulator + currentValue
    return state.totalNewsCommentsCountBasedOnDateRange.reduce(reducer)
  },
  getSingleNewsDetails (state) {
    return state.singleNewsData
  }
}
const mutations = {
  setNewsData (state, news) {
    state.newsData = news
  },
  setTotalNewsResult (state, news) {
    state.totalNewsCount = news
  },
  setTotalNewsCountForPagination (state, totalSearchResultCount) {
    state.totalNewsCountForPagination = totalSearchResultCount
  },
  setLastVisibleNews (state, lastVisible) {
    state.lastVisibleResult = lastVisible
  },
  setTotalNewsDataNull (state) {
    state.totalNewsLikesCount = [0]
    state.totalNewsDislikesCount = [0]
    state.totalNewsFakeCount = [0]
  },
  setTotalDataCountBasedOnDateRange (state) {
    state.totalNewsLikesCountBasedOnDateRange = [0]
    state.totalNewsDislikesCountBasedOnDateRange = [0]
    state.totalNewsCommentsCountBasedOnDateRange = [0]
  }
}
const actions = {
  totalNewsResultCount ({ commit }) {
    db.collection('news')
      .get()
      .then(querySnapShot => {
        if (querySnapShot.docs.length > 0) {
          let totalResult = querySnapShot.docs.length
          commit('setTotalNewsResult', totalResult)
        }
      })
  },
  getNewsTableData ({ commit, state }, pageInfo) {
    let newsDbRef
    let pageLimit = pageInfo.limit || 10
    let fetchDirection = pageInfo.orderDirection || 'desc'
    let resultStartDurationDate = pageInfo.startDurationDate || null
    let resultEndDurationDate = pageInfo.endDurationDate
    let countryName = pageInfo.changedCountryName || null
    let cityName = pageInfo.changedCityName || null
    // let searchTerm = pageInfo.searchText
    let paginationMode = pageInfo.paginationMode
    // let endSearchText = searchTerm + "\uf8ff";
    state.newsData.splice(0, state.newsData.length)
    if (paginationMode) {
      newsDbRef = db
        .collection('news')
        .orderBy(state.orderByCreation, fetchDirection)
        .limit(pageLimit)
        .startAfter(state.lastVisibleResult)
      console.log('last visible query')
    // } else if (searchTerm && searchTerm !== '') {
    //   var split = searchTerm.split(' ')
    //   if (split.length > 0) {
    //     for (let i = 0; i < split.length; i++) {
    //       newsDbRef = db
    //         .collection('news')
    //         .orderBy(state.orderByCreation, fetchDirection)
    //         .limit(pageLimit)
    //         .where('keywords', 'array-contains', split[i])

    //       console.log(split[i])
    //       console.log('---------')
    //     }
    //   }
    } else if (countryName && !cityName && !resultStartDurationDate) {
      newsDbRef = db
        .collection('news')
        .orderBy(state.orderByCreation, fetchDirection)
        .limit(pageLimit)
        .where('country', '==', countryName)
    } else if (cityName && !countryName && !resultStartDurationDate) {
      newsDbRef = db
        .collection('news')
        .orderBy(state.orderByCreation, fetchDirection)
        .limit(pageLimit)
        .where('city', '==', cityName)
    } else if (!cityName && !countryName && resultStartDurationDate) {
      newsDbRef = db
        .collection('news')
        .orderBy(state.orderByCreation, fetchDirection)
        .limit(pageLimit)
        .where('createdAt', '>=', resultStartDurationDate)
        .where('createdAt', '<=', resultEndDurationDate)
    } else if (cityName && countryName && !resultStartDurationDate) {
      newsDbRef = db
        .collection('news')
        .orderBy(state.orderByCreation, fetchDirection)
        .limit(pageLimit)
        .where('country', '==', countryName)
        .where('city', '==', cityName)
    } else if (countryName && !cityName && resultStartDurationDate) {
      newsDbRef = db
        .collection('news')
        .orderBy(state.orderByCreation, fetchDirection)
        .limit(pageLimit)
        .where('country', '==', countryName)
        .where('createdAt', '>=', resultStartDurationDate)
        .where('createdAt', '<=', resultEndDurationDate)
    } else if (resultStartDurationDate && cityName && !countryName) {
      newsDbRef = db
        .collection('news')
        .orderBy(state.orderByCreation, fetchDirection)
        .limit(pageLimit)
        .where('city', '==', cityName)
        .where('createdAt', '>=', resultStartDurationDate)
        .where('createdAt', '<=', resultEndDurationDate)
    } else if (resultStartDurationDate && cityName && countryName) {
      newsDbRef = db
        .collection('news')
        .orderBy(state.orderByCreation, fetchDirection)
        .limit(pageLimit)
        .where('country', '==', countryName)
        .where('city', '==', cityName)
        .where('createdAt', '>=', resultStartDurationDate)
        .where('createdAt', '<=', resultEndDurationDate)
      // } else if (cityName) {
      //   newsDbRef = db
      //     .collection("news")
      //     .orderBy(state.orderByCreation, fetchDirection)
      //     .limit(pageLimit)
      //     .where("country", "==", countryName)
      //     .where("city", "==", cityName);
    } else {
      newsDbRef = db
        .collection('news')
        .orderBy(state.orderByCreation, 'desc')
        .limit(pageLimit)

      console.log('normal query')
    }

    newsDbRef
      .get()
      .then(querySnapShot => {
        querySnapShot.forEach(doc => {
          const resultData = doc.data()
          let data = {
            newsId: resultData.id,
            newsTitle: resultData.title ? resultData.title : 'No title',
            newsSubTitle: resultData.subtitle
              ? resultData.subtitle
              : 'No title',
            newsDescription: resultData.description
              ? resultData.description
              : 'No description',
            newsThumbnail: resultData.thumbnail,
            newsType: resultData.category
              ? resultData.category
              : 'Un-categorised',
            newsStatus: resultData.status ? resultData.status : 'published',
            city: resultData.city ? resultData.city : 'No city',
            newsCountry: resultData.country ? resultData.country : 'No country',
            createdAt: resultData.createdAt,
            sharedUserId: resultData.postedBy,
            newsSlug: Slugify(resultData.title, {
              replacement: '-', // replace spaces with replacement
              remove: null, // regex to remove characters
              lower: true // result in lower case
            }),
            username: null,
            commentCount: null,
            likeCount: null,
            dislikeCount: null,
            shareCount: null,
            reportCount: null,
            viewCount: null
          }
          state.newsData.push(data)
        })
        let lastVisible = querySnapShot.docs[querySnapShot.docs.length - 1]
        commit('setLastVisibleNews', lastVisible)
      })
      .then(() => {
        state.newsData.forEach(newsItem => {
          db.collection('users')
            .doc(newsItem.sharedUserId)
            .get()
            .then(function (doc) {
              newsItem.username = doc.data().name || 'No name'
            })
            .catch(() => {
              newsItem.username = 'No name'
            })
        })
      })
      .then(() => {
        state.newsData.forEach(newsItem => {
          db.collection('news_stats')
            .doc(newsItem.newsId)
            .get()
            .then(doc => {
              const docData = doc.data()
              newsItem.likeCount = docData.likeCount || 0
              newsItem.dislikeCount = docData.dislikeCount || 0
              newsItem.shareCount = docData.shareCount || 0
              newsItem.commentCount = docData.commentCount || 0
              newsItem.reportCount = docData.reportCount || 0
              newsItem.viewCount = docData.viewCount || 0
            })
            .catch(() => {
              newsItem.likeCount = 0
              newsItem.dislikeCount = 0
              newsItem.shareCount = 0
              newsItem.commentCount = 0
              newsItem.reportCount = 0
              newsItem.viewCount = 0
            })
        })
      })
  },
  countTotalNewsData ({ commit, state }, dataInfo) {
    let dataInfoOption = dataInfo.dataFieldName
    let dbRef
    dbRef = db.collection('news')
    if (dataInfoOption === 'likeCount') {
      dbRef
        .get()
        .then(querySnapShot => {
          querySnapShot.forEach(result => {
            let data = result.data().likeCount
            state.totalNewsLikesCount.push(data)
          })
        })
        .then(() => {
          if (dataInfo.startDateAt && dataInfo.endDateAt) {
            dbRef = db
              .collection('news')
              .where('createdAt', '>=', dataInfo.startDateAt)
              .where('createdAt', '<=', dataInfo.endDateAt)
              .orderBy('createdAt')

            dbRef.get().then(querySnapShot => {
              querySnapShot.forEach(result => {
                let data = result.data().likeCount
                state.totalNewsLikesCountBasedOnDateRange.push(data)
              })
            })
          }
        })
        .catch(error => {
          Notification({
            title: 'Error',
            message: `${error}`,
            type: 'error'
          })
        })
    } else if (dataInfoOption === 'dislikeCount') {
      dbRef
        .get()
        .then(querySnapShot => {
          querySnapShot.forEach(result => {
            let data = result.data().dislikeCount
            state.totalNewsDislikesCount.push(data)
          })
        })
        .then(() => {
          if (dataInfo.startDateAt && dataInfo.endDateAt) {
            dbRef = db
              .collection('news')
              .where('createdAt', '>=', dataInfo.startDateAt)
              .where('createdAt', '<=', dataInfo.endDateAt)
              .orderBy('createdAt')

            dbRef.get().then(querySnapShot => {
              querySnapShot.forEach(result => {
                let data = result.data().dislikeCount
                state.totalNewsDislikesCountBasedOnDateRange.push(data)
              })
            })
          }
        })
        .catch(error => {
          Notification({
            title: 'Error',
            message: `${error}`,
            type: 'error'
          })
        })
    }
  },
  countTotalCommentsBasedOnDateRange ({ commit }, dataInfo) {
    db.collection('news')
      .where('createdAt', '>=', dataInfo.startDateAt)
      .where('createdAt', '<=', dataInfo.endDateAt)
      .orderBy('createdAt')
      .get()
      .then(querySnapShot => {
        querySnapShot.forEach(result => {
          let data = result.data().commentCount
          state.totalNewsCommentsCountBasedOnDateRange.push(data)
        })
      })
      .catch(error => {
        Notification({
          title: 'Error',
          message: `${error}`,
          type: 'error'
        })
      })
  },
  updateThisNewsStatus ({ commit }, newsStatusInfo) {
    let newsId = newsStatusInfo.thisNewsId
    let newsStatus = newsStatusInfo.thisNewsStatus
    let newsDbRef = db.collection('news').doc(newsId)

    newsDbRef
      .update({
        status: newsStatus
      })
      .then(() => {
        const thisNewsIndex = state.newsData.findIndex(function (element) {
          return element.newsId === newsId
        })
        state.newsData[thisNewsIndex].newsStatus = newsStatus
        Notification({
          title: 'Success',
          message: `News ${newsStatus} successfully`,
          type: 'success'
        })
      })
  },
  getNewsInformationBasedOnId ({ commit }, newsIdAndSlug) {
    let thisNewsId = newsIdAndSlug.newsId
    let newsInfoDbRef = db.collection('news').doc(thisNewsId)
    newsInfoDbRef.get().then(function (doc) {
      let singleNewsDetails = { singleNewsTitle: doc.data().title }
      state.singleNewsData.push(singleNewsDetails)
    })
  },
  clearTotalNewsData ({ commit }) {
    commit('setTotalNewsDataNull')
  },
  clearTotalDataCountBasedOnDateRange ({ commit }) {
    commit('setTotalDataCountBasedOnDateRange')
  },
  clearLastVisibleNews ({ commit }) {
    let lastVisible = {}
    commit('setLastVisibleNews', lastVisible)
  },
  onTotalNewsCountForPaginationLoaded ({ commit, state }, pageInfo) {
    let resultStartDurationDate,
      resultEndDurationDate,
      countryName,
      cityName,
      searchTerm,
      newsDbRef
    if (pageInfo) {
      resultStartDurationDate = pageInfo.startDurationDate
      resultEndDurationDate = pageInfo.endDurationDate
      countryName = pageInfo.changedCountryName
      cityName = pageInfo.changedCityName
      searchTerm = pageInfo.searchText
      if (searchTerm) {
        newsDbRef = db
          .collection('news')
          .where('keywords', 'array-contains', searchTerm)
      } else if (countryName && !cityName && !resultStartDurationDate) {
        newsDbRef = db
          .collection('news')
          .where('country', '==', countryName)
      } else if (cityName && !countryName && !resultStartDurationDate) {
        newsDbRef = db
          .collection('news')
          .where('city', '==', cityName)
      } else if (!cityName && !countryName && resultStartDurationDate) {
        newsDbRef = db
          .collection('news')
          .where('createdAt', '>=', resultStartDurationDate)
          .where('createdAt', '<=', resultEndDurationDate)
      } else if (cityName && countryName && !resultStartDurationDate) {
        newsDbRef = db
          .collection('news')
          .where('country', '==', countryName)
          .where('city', '==', cityName)
      } else if (countryName && !cityName && resultStartDurationDate) {
        newsDbRef = db
          .collection('news')
          .where('country', '==', countryName)
          .where('createdAt', '>=', resultStartDurationDate)
          .where('createdAt', '<=', resultEndDurationDate)
      } else if (resultStartDurationDate && cityName && !countryName) {
        newsDbRef = db
          .collection('news')
          .where('city', '==', cityName)
          .where('createdAt', '>=', resultStartDurationDate)
          .where('createdAt', '<=', resultEndDurationDate)
      } else if (resultStartDurationDate && cityName && countryName) {
        newsDbRef = db
          .collection('news')
          .where('country', '==', countryName)
          .where('city', '==', cityName)
          .where('createdAt', '>=', resultStartDurationDate)
          .where('createdAt', '<=', resultEndDurationDate)
      } else {
        newsDbRef = db.collection('news')
      }
    } else {
      newsDbRef = db.collection('news')
    }
    newsDbRef.get().then(querySnapShot => {
      let totalResult = querySnapShot.docs.length
      commit('setTotalNewsCountForPagination', totalResult)
    })
  },
  onNewsSearchTextChanged ({ commit, state }, pageInfo) {
    let pageLimit = pageInfo.limit || 10
    let fetchDirection = pageInfo.orderDirection || 'desc'
    let searchTerm = pageInfo.searchText
    state.newsData.splice(0, state.newsData.length)
    if (searchTerm && searchTerm !== '') {
      var split = searchTerm.split(' ')
      if (split.length > 0) {
        split.forEach(newsItem => {
          db
            .collection('news')
            .orderBy(state.orderByCreation, fetchDirection)
            .limit(pageLimit)
            .where('keywords', 'array-contains', newsItem)
            .get()
            .then(querySnapShot => {
              querySnapShot.forEach(doc => {
                const resultData = doc.data()
                let data = {
                  newsId: resultData.id,
                  newsTitle: resultData.title ? resultData.title : 'No title',
                  newsSubTitle: resultData.subtitle
                    ? resultData.subtitle
                    : 'No title',
                  newsDescription: resultData.description
                    ? resultData.description
                    : 'No description',
                  newsThumbnail: resultData.thumbnail,
                  newsType: resultData.category
                    ? resultData.category
                    : 'Un-categorised',
                  newsStatus: resultData.status ? resultData.status : 'published',
                  city: resultData.city ? resultData.city : 'No city',
                  newsCountry: resultData.country ? resultData.country : 'No country',
                  createdAt: resultData.createdAt,
                  sharedUserId: resultData.postedBy,
                  newsSlug: Slugify(resultData.title, {
                    replacement: '-', // replace spaces with replacement
                    remove: null, // regex to remove characters
                    lower: true // result in lower case
                  }),
                  username: null,
                  commentCount: null,
                  likeCount: null,
                  dislikeCount: null,
                  shareCount: null,
                  reportCount: null,
                  viewCount: null
                }
                state.newsData.push(data)
              })
              let lastVisible = querySnapShot.docs[querySnapShot.docs.length - 1]
              commit('setLastVisibleNews', lastVisible)
            })
            .then(() => {
              state.newsData.forEach(newsItem => {
                db.collection('users')
                  .doc(newsItem.sharedUserId)
                  .get()
                  .then(function (doc) {
                    newsItem.username = doc.data().name || 'No name'
                  })
                  .catch(() => {
                    newsItem.username = 'No name'
                  })
              })
            })
            .then(() => {
              state.newsData.forEach(newsItem => {
                db.collection('news_stats')
                  .doc(newsItem.newsId)
                  .get()
                  .then(doc => {
                    const docData = doc.data()
                    newsItem.likeCount = docData.likeCount || 0
                    newsItem.dislikeCount = docData.dislikeCount || 0
                    newsItem.shareCount = docData.shareCount || 0
                    newsItem.commentCount = docData.commentCount || 0
                    newsItem.reportCount = docData.reportCount || 0
                    newsItem.viewCount = docData.viewCount || 0
                  })
                  .catch(() => {
                    newsItem.likeCount = 0
                    newsItem.dislikeCount = 0
                    newsItem.shareCount = 0
                    newsItem.commentCount = 0
                    newsItem.reportCount = 0
                    newsItem.viewCount = 0
                  })
              })
            })
        })
      }
    } else {
      db
        .collection('news')
        .orderBy(state.orderByCreation, 'desc')
        .limit(pageLimit)
        .get()
        .then(querySnapShot => {
          querySnapShot.forEach(doc => {
            const resultData = doc.data()
            let data = {
              newsId: resultData.id,
              newsTitle: resultData.title ? resultData.title : 'No title',
              newsSubTitle: resultData.subtitle
                ? resultData.subtitle
                : 'No title',
              newsDescription: resultData.description
                ? resultData.description
                : 'No description',
              newsThumbnail: resultData.thumbnail,
              newsType: resultData.category
                ? resultData.category
                : 'Un-categorised',
              newsStatus: resultData.status ? resultData.status : 'published',
              city: resultData.city ? resultData.city : 'No city',
              newsCountry: resultData.country ? resultData.country : 'No country',
              createdAt: resultData.createdAt,
              sharedUserId: resultData.postedBy,
              newsSlug: Slugify(resultData.title, {
                replacement: '-', // replace spaces with replacement
                remove: null, // regex to remove characters
                lower: true // result in lower case
              }),
              username: null,
              commentCount: null,
              likeCount: null,
              dislikeCount: null,
              shareCount: null,
              reportCount: null,
              viewCount: null
            }
            state.newsData.push(data)
          })
          let lastVisible = querySnapShot.docs[querySnapShot.docs.length - 1]
          commit('setLastVisibleNews', lastVisible)
        })
        .then(() => {
          state.newsData.forEach(newsItem => {
            db.collection('users')
              .doc(newsItem.sharedUserId)
              .get()
              .then(function (doc) {
                newsItem.username = doc.data().name || 'No name'
              })
              .catch(() => {
                newsItem.username = 'No name'
              })
          })
        })
        .then(() => {
          state.newsData.forEach(newsItem => {
            db.collection('news_stats')
              .doc(newsItem.newsId)
              .get()
              .then(doc => {
                const docData = doc.data()
                newsItem.likeCount = docData.likeCount || 0
                newsItem.dislikeCount = docData.dislikeCount || 0
                newsItem.shareCount = docData.shareCount || 0
                newsItem.commentCount = docData.commentCount || 0
                newsItem.reportCount = docData.reportCount || 0
                newsItem.viewCount = docData.viewCount || 0
              })
              .catch(() => {
                newsItem.likeCount = 0
                newsItem.dislikeCount = 0
                newsItem.shareCount = 0
                newsItem.commentCount = 0
                newsItem.reportCount = 0
                newsItem.viewCount = 0
              })
          })
        })
    }
  }
}
export default {
  state,
  getters,
  mutations,
  actions
}
