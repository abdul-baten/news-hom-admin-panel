import db from '@/plugins/firebase/init'
import {
  Notification
} from 'element-ui'

const state = {
  badWordsData: [],
  orderByCreation: 'createdAt',
  totalBadWord: null
}
const getters = {
  badWords (state) {
    return state.badWordsData
  },
  editThisWord (state) {
    return state.badWordInfo
  },
  totalBadWordCount (state) {
    return state.totalBadWord
  }
}
const mutations = {
  setTotalWordCount (state, total) {
    state.totalBadWord = total
  }
}
const actions = {
  countTotalBadWord ({commit}) {
    let wordDbRef = db.collection('bad_words')
    wordDbRef.get().then(querySnapShot => {
      let total = querySnapShot.docs.length || 0
      commit('setTotalWordCount', total)
    })
  },
  addNewBadWord ({
    commit
  }, newBadWord) {
    let timeNow = new Date().getTime() / 1000
    let wordDbRef = db.collection('bad_words')
    let newWord = newBadWord
    let endWord = newWord + '\uf8ff'
    wordDbRef
      .orderBy('text')
      .startAt(newWord)
      .endAt(endWord)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.docs.length > 0) {
          Notification({
            title: 'Warning',
            message: 'This word already exists',
            type: 'warning'
          })
        } else {
          wordDbRef
            .add({
              text: newBadWord,
              createdAt: timeNow,
              updatedAt: timeNow
            })
            .then(function (docRef) {
              wordDbRef
                .doc(docRef.id)
                .update({
                  id: docRef.id
                })
                .then(() => {
                  const data = {
                    wordId: docRef.id,
                    wordText: newBadWord,
                    wordCreatedAt: timeNow,
                    wordUpdatedAt: timeNow
                  }
                  state.badWordsData.unshift(data)
                  Notification({
                    title: 'Success',
                    message: 'Word added successfully',
                    type: 'success'
                  })
                })
            })
            .catch(function (error) {
              Notification({
                title: 'Error',
                message: `Error adding document ${error}`,
                type: 'error'
              })
            })
        }
      })
  },
  getBadWordsDataTable ({
    commit
  }, badWordInfo) {
    let searchText
    let endSearchText
    let fetchDirection
    let data
    let wordDbRef
    let pageLimit = badWordInfo.limit || 10
    fetchDirection = badWordInfo.orderDirection || 'desc'
    searchText = badWordInfo.searchTerm
    endSearchText = searchText + '\uf8ff'
    state.badWordsData.splice(0, state.badWordsData.length)
    if (searchText) {
      wordDbRef = db.collection('bad_words')
        .orderBy('text')
        .startAt(searchText)
        .endAt(endSearchText)

      console.log(searchText)
    } else {
      wordDbRef = db.collection('bad_words')
        .orderBy(state.orderByCreation, fetchDirection)
    }

    wordDbRef
      .limit(pageLimit)
      .get()
      .then(querySnapShot => {
        if (querySnapShot.size > 0) {
          querySnapShot.forEach(doc => {
            let resultData = doc.data()
            data = {
              wordId: resultData.id,
              wordText: resultData.text,
              wordCreatedAt: resultData.createdAt,
              wordUpdatedAt: resultData.updatedAt
            }
            state.badWordsData.push(data)
          })
        }
      })
  },
  deleteThisBadWord ({
    commit
  }, thisBadWord) {
    let wordDbRef = db.collection('bad_words').doc(thisBadWord.wordId)
    let findIndex = state.badWordsData.findIndex(element => element.wordId === thisBadWord.wordId)
    wordDbRef
      .delete()
      .then(function () {
        state.badWordsData.splice(findIndex, 1)
        Notification({
          title: 'Success',
          message: 'Word deleted successfully.',
          type: 'success'
        })
      })
      .catch(function (error) {
        Notification({
          title: 'Error',
          message: `Something bad happened, ${error}`,
          type: 'error'
        })
      })
  },
  clearBadWordsData ({
    commit
  }) {
    state.badWordsData = []
  },
  getBadWordInfoById ({
    commit
  }, badWordId) {
    db.collection('bad_words').doc(badWordId).get().then(function (doc) {
      commit('setThisBadWordInfo', doc.data().text)
    })
  },
  updateThisBadWord ({
    commit
  }, badWordInfo) {
    let wordId = badWordInfo.badWordId
    let wordUpdatedAt = Number(new Date().getTime() / 1000)
    let wordEditedText = badWordInfo.badWordText
    console.log(wordId)
    console.log(wordEditedText)
    db.collection('bad_words').doc(wordId).update({
      text: (wordEditedText).toLowerCase(),
      updatedAt: wordUpdatedAt
    })
      .then(() => {
        Notification({
          title: 'Success',
          message: 'Word updated successfully.',
          type: 'success'
        })
      })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
