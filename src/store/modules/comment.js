import db from '@/plugins/firebase/init'
import { Notification } from 'element-ui'

const state = {
  commentData: [],
  orderByCreation: 'createdAt',
  totalResult: 0,
  lastVisibleComment: {}
}
const getters = {
  comments (state) {
    return state.commentData
  },
  getTotalCommentResult (state) {
    return state.totalResult
  }
}
const mutations = {
  setCommentData (state, comment) {
    state.commentData = comment
  },
  setTotalCommentResult (state, comment) {
    state.totalResult = comment
  },
  setLastVisibleComment (state, lastComment) {
    state.lastVisibleComment = lastComment
  }
}
const actions = {
  totalCommentResultCount ({ commit }) {
    db.collection('comments')
      .get()
      .then(querySnapShot => {
        if (querySnapShot.docs.length > 0) {
          let totalResult = querySnapShot.docs.length
          commit('setTotalCommentResult', totalResult)
        }
      })
  },
  getCommentTableData ({ commit, state }, pageInfo) {
    let commentDbRef,
      pageLimit,
      searchTerm,
      endSearch,
      fetchDirection,
      resultStartDurationDate,
      resultEndDurationDate,
      paginationMode

    state.commentData.splice(0, state.commentData.length)

    if (pageInfo) {
      searchTerm = pageInfo.searchText || null
      endSearch = searchTerm + '\uf8ff'
      fetchDirection = pageInfo.orderDirection || 'desc'
      resultStartDurationDate = pageInfo.startDurationDate || ''
      resultEndDurationDate = pageInfo.endDurationDate || ''
      paginationMode = pageInfo.paginationMode
      pageLimit = pageInfo.limit || 10

      if (paginationMode) {
        commentDbRef = db
          .collection('comments')
          .orderBy(state.orderByCreation, fetchDirection)
          .startAfter(state.lastVisibleComment)
      } else if (searchTerm) {
        commentDbRef = db
          .collection('comments')
          .orderBy('text')
          .startAt(searchTerm)
          .endAt(endSearch)
      } else if (resultStartDurationDate) {
        commentDbRef = db
          .collection('comments')
          .orderBy(state.orderByCreation, fetchDirection)
          .where('createdAt', '>=', resultStartDurationDate)
          .where('createdAt', '<=', resultEndDurationDate)
      }
    } else {
      pageLimit = 10
      commentDbRef = db
        .collection('comments')
        .orderBy(state.orderByCreation, fetchDirection)
    }
    commentDbRef
      .limit(pageLimit)
      .get()
      .then(querySnapShot => {
        if (querySnapShot.docs.length > 0) {
          let lastComment = querySnapShot.docs[querySnapShot.docs.length - 1]
          commit('setLastVisibleComment', lastComment)
        }
        querySnapShot.forEach(doc => {
          let resultData = doc.data()
          let data = {
            commentId: resultData.id,
            commentText: resultData.text ? resultData.text : 'No comment',
            commentStatus: resultData.status ? resultData.status : 'published',
            commentUserId: resultData.userId,
            commentNewsId: resultData.newsId,
            commentPostDate: resultData.createdAt,
            commentUserName: null,
            commentNewsCategory: null,
            commentNewsType: null,
            commentNewsCity: null,
            commentNewsCountry: null,
            commentNewsThumbnail: null
          }
          state.commentData.push(data)
        })
      })
      .then(() => {
        state.commentData.forEach(commentItem => {
          db.collection('users')
            .doc(commentItem.commentUserId)
            .get()
            .then(function (doc) {
              commentItem.commentUserName = doc.data().name
                ? doc.data().name
                : 'No name'
            })
        })
      })
      .then(() => {
        state.commentData.forEach(commentItem => {
          db.collection('news')
            .doc(commentItem.commentNewsId)
            .get()
            .then(function (doc) {
              let resultData = doc.data()
              commentItem.commentNewsType =
                resultData.category || 'No category'
              commentItem.commentNewsCountry =
                resultData.country || 'No country'
              commentItem.commentNewsCity = resultData.city || 'No city'
              commentItem.commentNewsThumbnail = resultData.thumbnail
            })
            .catch(() => {
              commentItem.commentNewsType = 'No category'
              commentItem.commentNewsCountry = 'No country'
              commentItem.commentNewsCity = 'No city'
            })
        })
      })
  },
  clearLastVisibleComment ({ commit }) {
    let lastComment = {}
    commit('setLastVisibleComment', lastComment)
  },
  changeThisCommentStatus ({ commit }, commentStatusInfo) {
    const commentId = commentStatusInfo.commentId
    const commentStatus = commentStatusInfo.changeStatus
    let dbRef = db.collection('comments').doc(commentId)
    dbRef.update({ status: commentStatus }).then(() => {
      const findThisCommentIndex = state.commentData.findIndex(function (
        element
      ) {
        return element.commentId === commentId
      })
      state.commentData[findThisCommentIndex].commentStatus = commentStatus
      Notification({
        title: 'Success',
        message: `Comment ${commentStatus} successfully`,
        type: 'success'
      })
    })
  },
  onCommentSearchTextChanged ({ commit, state }, pageInfo) {
    let pageLimit = pageInfo.limit || 10
    let fetchDirection = pageInfo.orderDirection || 'desc'
    let searchTerm = pageInfo.searchText

    state.commentData.splice(0, state.commentData.length)

    if (searchTerm) {
      var split = searchTerm.split(' ')
      if (split.length > 0) {
        split.forEach(commentItem => {
          db
            .collection('comments')
            .limit(pageLimit)
            .where('keywords', 'array-contains', commentItem)
            .get()
            .then(querySnapShot => {
              if (querySnapShot.docs.length > 0) {
                let lastComment = querySnapShot.docs[querySnapShot.docs.length - 1]
                commit('setLastVisibleComment', lastComment)
              }
              querySnapShot.forEach(doc => {
                let resultData = doc.data()
                let data = {
                  commentId: resultData.id,
                  commentText: resultData.text ? resultData.text : 'No comment',
                  commentStatus: resultData.status ? resultData.status : 'published',
                  commentUserId: resultData.userId,
                  commentNewsId: resultData.newsId,
                  commentPostDate: resultData.createdAt,
                  commentUserName: null,
                  commentNewsCategory: null,
                  commentNewsType: null,
                  commentNewsCity: null,
                  commentNewsCountry: null,
                  commentNewsThumbnail: null
                }
                state.commentData.push(data)
              })
            })
            .then(() => {
              state.commentData.forEach(commentItem => {
                db.collection('users')
                  .doc(commentItem.commentUserId)
                  .get()
                  .then(function (doc) {
                    commentItem.commentUserName = doc.data().name
                      ? doc.data().name
                      : 'No name'
                  })
              })
            })
            .then(() => {
              state.commentData.forEach(commentItem => {
                db.collection('news')
                  .doc(commentItem.commentNewsId)
                  .get()
                  .then(function (doc) {
                    let resultData = doc.data()
                    commentItem.commentNewsType =
                resultData.category || 'No category'
                    commentItem.commentNewsCountry =
                resultData.country || 'No country'
                    commentItem.commentNewsCity = resultData.city || 'No city'
                    commentItem.commentNewsThumbnail = resultData.thumbnail
                  })
                  .catch(() => {
                    commentItem.commentNewsType = 'No category'
                    commentItem.commentNewsCountry = 'No country'
                    commentItem.commentNewsCity = 'No city'
                  })
              })
            })
        })
      }
    } else {
      db
        .collection('comments')
        .orderBy(state.orderByCreation, fetchDirection)
        .limit(pageLimit)
        .get()
        .then(querySnapShot => {
          if (querySnapShot.docs.length > 0) {
            let lastComment = querySnapShot.docs[querySnapShot.docs.length - 1]
            commit('setLastVisibleComment', lastComment)
          }
          querySnapShot.forEach(doc => {
            let resultData = doc.data()
            let data = {
              commentId: resultData.id,
              commentText: resultData.text ? resultData.text : 'No comment',
              commentStatus: resultData.status ? resultData.status : 'published',
              commentUserId: resultData.userId,
              commentNewsId: resultData.newsId,
              commentPostDate: resultData.createdAt,
              commentUserName: null,
              commentNewsCategory: null,
              commentNewsType: null,
              commentNewsCity: null,
              commentNewsCountry: null,
              commentNewsThumbnail: null
            }
            state.commentData.push(data)
          })
        })
        .then(() => {
          state.commentData.forEach(commentItem => {
            db.collection('users')
              .doc(commentItem.commentUserId)
              .get()
              .then(function (doc) {
                commentItem.commentUserName = doc.data().name
                  ? doc.data().name
                  : 'No name'
              })
          })
        })
        .then(() => {
          state.commentData.forEach(commentItem => {
            db.collection('news')
              .doc(commentItem.commentNewsId)
              .get()
              .then(function (doc) {
                let resultData = doc.data()
                commentItem.commentNewsType =
                resultData.category || 'No category'
                commentItem.commentNewsCountry =
                resultData.country || 'No country'
                commentItem.commentNewsCity = resultData.city || 'No city'
                commentItem.commentNewsThumbnail = resultData.thumbnail
              })
              .catch(() => {
                commentItem.commentNewsType = 'No category'
                commentItem.commentNewsCountry = 'No country'
                commentItem.commentNewsCity = 'No city'
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
