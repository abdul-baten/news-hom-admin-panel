import db from '@/plugins/firebase/init'
import { Notification } from 'element-ui'

const state = {
  userData: [],
  topPublisher: [],
  orderByCreation: 'createdAt',
  totalResult: 0,
  lastResultId: {},
  totalUserCountForPagination: 0
}

const getters = {
  users (state) {
    return state.userData
  },
  publisher (state) {
    return state.topPublisher
  },
  getTotalUserResult (state) {
    return state.totalResult
  },
  getCurrentPage (state) {
    return state.pageNumber
  },
  getTotalUserCountForPagination (state) {
    return state.totalUserCountForPagination
  }
}

const mutations = {
  setUserInfo (state, userInfo) {
    state.userData = userInfo
  },
  setTotalResult (state, totalResult) {
    state.totalResult = totalResult
  },
  setLastVisibleUser (state, lastVisible) {
    state.lastResultId = lastVisible
  },
  setTotalUserCountForPagination (state, totalUserCountForPagination) {
    state.totalUserCountForPagination = totalUserCountForPagination
  }
}

const actions = {
  totalUserResultCount ({ commit }) {
    db.collection('users')
      .get()
      .then(querySnapShot => {
        if (querySnapShot.docs.length > 0) {
          let totalResult = querySnapShot.docs.length
          commit('setTotalResult', totalResult)
        }
      })
  },
  getUserDataTable ({ commit, state }, pageInfo) {
    let userDbRef
    let pageLimit = pageInfo.limit || 10
    let fetchDirection = pageInfo.orderDirection || 'desc'
    let resultStartDurationDate = pageInfo.startDurationDate
    let resultEndDurationDate = pageInfo.endDurationDate
    let paginationMode = pageInfo.paginationMode
    state.userData.splice(0, state.userData.length)
    if (paginationMode) {
      userDbRef = db
        .collection('users')
        .orderBy(state.orderByCreation, fetchDirection)
        .limit(pageLimit)
        .startAfter(state.lastVisibleResult)
    } else if (resultStartDurationDate) {
      userDbRef = db
        .collection('users')
        .orderBy(state.orderByCreation, fetchDirection)
        .limit(pageLimit)
        .where('createdAt', '>=', resultStartDurationDate)
        .where('createdAt', '<=', resultEndDurationDate)
    } else {
      userDbRef = db
        .collection('users')
        .orderBy(state.orderByCreation, fetchDirection)
        .limit(pageLimit)
    }

    userDbRef
      .get()
      .then(querySnapShot => {
        if (querySnapShot.size > 0) {
          querySnapShot.forEach(doc => {
            let resultData = doc.data()
            let data = {
              uid: resultData.uid,
              name: resultData.name ? resultData.name : 'No name',
              picture: resultData.picture,
              email: resultData.email ? resultData.email : 'No email',
              bio: resultData.bio ? resultData.bio : 'No information given',
              joined: resultData.createdAt,
              fakeCount: resultData.fakeCount ? resultData.newsCount : 0,
              userRole: resultData.role ? resultData.role : 'user',
              status: resultData.status ? resultData.status : 'active',
              follower: null,
              following: null,
              newsCount: null
            }
            state.userData.push(data)
          })
          let lastVisible = querySnapShot.docs[querySnapShot.docs.length - 1]
          commit('setLastVisibleUser', lastVisible)
        }
      })
      .then(() => {
        state.userData.forEach(user => {
          db.collection('user_stats')
            .doc(user.uid)
            .get()
            .then(doc => {
              user.follower = doc.data().followerCount || 0
              user.following = doc.data().followingCount || 0
              user.newsCount = doc.data().newsCount || 0
            })
            .catch(() => {
              user.follower = 0
              user.following = 0
              user.newsCount = 0
            })
        })
      })
  },
  changeThisUserStatus ({ commit }, userStatusInfo) {
    let userId = userStatusInfo.thisUserId
    let userStatus = userStatusInfo.thisUserChangedStatus
    let userDbRef = db.collection('users').doc(userId)
    userDbRef.update({ status: userStatus }).then(() => {
      let findIndex = state.userData.findIndex(function (element) {
        return element.uid === userId
      })

      state.userData[findIndex].status = userStatus

      Notification({
        title: 'Success',
        message: `User status changed to ${userStatus} successfully.`,
        type: 'success'
      })
    })
  },
  changeThisUserRole ({ commit }, userRoleInfo) {
    let userId = userRoleInfo.thisUserId
    let userRole = userRoleInfo.thisUserChangedRole
    let userDbRef = db.collection('users').doc(userId)
    userDbRef.update({ role: userRole }).then(() => {
      let findIndex = state.userData.findIndex(
        element => element.uid === userId
      )

      state.userData[findIndex].userRole = userRole

      Notification({
        title: 'Success',
        message: `User status changed to ${userRole} successfully.`,
        type: 'success'
      })
    })
  },
  getTopNewsPublisher ({ commit, state }, pageInfo) {
    let userDbRef
    let pageLimit = pageInfo.limit ? pageInfo.limit : 5
    let fetchDirection = pageInfo.orderDirection
    state.topPublisher.splice(0, state.topPublisher.length)
    userDbRef = db
      .collection('users')
      .orderBy('newsCount', fetchDirection)
      .limit(pageLimit)

    userDbRef.get().then(querySnapShot => {
      if (querySnapShot.size > 0) {
        querySnapShot.forEach(doc => {
          let resultData = doc.data()
          let data = {
            uid: resultData.uid,
            name: resultData.name ? resultData.name : 'No name',
            picture: resultData.picture,
            newsCount: resultData.newsCount ? resultData.newsCount : 0
          }
          state.topPublisher.push(data)
        })
      }
    })
  },
  clearLastVisibleUser ({ commit }) {
    let lastVisible = {}
    commit('setLastVisibleUser', lastVisible)
  },
  onTotalUserCountForPaginationLoaded ({ commit, state }, pageInfo) {
    let userDbRef,
      resultStartDurationDate,
      resultEndDurationDate,
      startText,
      endText
    if (pageInfo) {
      resultStartDurationDate = pageInfo.startDurationDate
      resultEndDurationDate = pageInfo.endDurationDate
      startText = pageInfo.searchTerm
      endText = startText + '\uf8ff'
      if (startText) {
        userDbRef = db
          .collection('users')
          .orderBy('name')
          .startAt(startText)
          .endAt(endText)
      } else if (resultStartDurationDate) {
        userDbRef = db
          .collection('users')
          .where('createdAt', '>=', resultStartDurationDate)
          .where('createdAt', '<=', resultEndDurationDate)
      }
    } else {
      userDbRef = db.collection('users')
    }

    userDbRef.get().then(querySnapShot => {
      let totalResult = querySnapShot.docs.length
      commit('setTotalUserCountForPagination', totalResult)
      console.log(querySnapShot.docs.length)
    })
  },
  onUserSearchTextChanged ({ commit, state }, pageInfo) {
    let pageLimit = pageInfo.limit || 10
    let fetchDirection = pageInfo.orderDirection || 'desc'
    let searchText = pageInfo.searchTerm
    state.userData.splice(0, state.userData.length)
    if (searchText) {
      var split = searchText.split(' ')
      if (split.length > 0) {
        split.forEach(userItem => {
          db
            .collection('users')
            .limit(pageLimit)
            .where('keywords', 'array-contains', userItem)
            .get()
            .then(querySnapShot => {
              if (querySnapShot.size > 0) {
                querySnapShot.forEach(doc => {
                  let resultData = doc.data()
                  let data = {
                    uid: resultData.uid,
                    name: resultData.name ? resultData.name : 'No name',
                    picture: resultData.picture,
                    email: resultData.email ? resultData.email : 'No email',
                    bio: resultData.bio ? resultData.bio : 'No information given',
                    joined: resultData.createdAt,
                    fakeCount: resultData.fakeCount ? resultData.newsCount : 0,
                    userRole: resultData.role ? resultData.role : 'user',
                    status: resultData.status ? resultData.status : 'active',
                    follower: null,
                    following: null,
                    newsCount: null
                  }
                  state.userData.push(data)
                })
                let lastVisible = querySnapShot.docs[querySnapShot.docs.length - 1]
                commit('setLastVisibleUser', lastVisible)
              }
            })
            .then(() => {
              state.userData.forEach(user => {
                db.collection('user_stats')
                  .doc(user.uid)
                  .get()
                  .then(doc => {
                    user.follower = doc.data().followerCount || 0
                    user.following = doc.data().followingCount || 0
                    user.newsCount = doc.data().newsCount || 0
                  })
                  .catch(() => {
                    user.follower = 0
                    user.following = 0
                    user.newsCount = 0
                  })
              })
            })
        })
      }
    } else {
      db
        .collection('users')
        .orderBy(state.orderByCreation, fetchDirection)
        .limit(pageLimit)
        .get()
        .then(querySnapShot => {
          if (querySnapShot.size > 0) {
            querySnapShot.forEach(doc => {
              let resultData = doc.data()
              let data = {
                uid: resultData.uid,
                name: resultData.name ? resultData.name : 'No name',
                picture: resultData.picture,
                email: resultData.email ? resultData.email : 'No email',
                bio: resultData.bio ? resultData.bio : 'No information given',
                joined: resultData.createdAt,
                fakeCount: resultData.fakeCount ? resultData.newsCount : 0,
                userRole: resultData.role ? resultData.role : 'user',
                status: resultData.status ? resultData.status : 'active',
                follower: null,
                following: null,
                newsCount: null
              }
              state.userData.push(data)
            })
            let lastVisible = querySnapShot.docs[querySnapShot.docs.length - 1]
            commit('setLastVisibleUser', lastVisible)
          }
        })
        .then(() => {
          state.userData.forEach(user => {
            db.collection('user_stats')
              .doc(user.uid)
              .get()
              .then(doc => {
                user.follower = doc.data().followerCount || 0
                user.following = doc.data().followingCount || 0
                user.newsCount = doc.data().newsCount || 0
              })
              .catch(() => {
                user.follower = 0
                user.following = 0
                user.newsCount = 0
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
