import firebase from 'firebase'
import db from '@/plugins/firebase/init'
import { Notification } from 'element-ui'

const state = {
  name: '',
  email: '',
  phone: '',
  bio: '',
  isFormSubmitted: false,
  pictureURL: '',
  progressIndicator: 0
}

const getters = {
  getProfileName (state) {
    return state.name
  },
  getProfileEmail (state) {
    return state.email
  },
  getProfilePhone (state) {
    return state.phone
  },
  getProfileBio (state) {
    return state.bio
  },
  getIfFormSubmitted (state) {
    return state.isFormSubmitted
  },
  getUploadProgressIndicator (state) {
    return state.progressIndicator
  },
  getProfilePictureURL (state) {
    return state.pictureURL
  }
}

const mutations = {
  checkIfFormSubmitted (state, isFormSubmitted) {
    state.isFormSubmitted = isFormSubmitted
  },
  setUploadProgressIndicator (state, progressIndicator) {
    state.progressIndicator = progressIndicator
  },
  setProfilePictureURL (state, imageURL) {
    state.pictureURL = imageURL
  }
}

const actions = {
  updateProfileInformation ({ commit }, profileData) {
    commit('checkIfFormSubmitted', true)
    let currentUserID = firebase.auth().currentUser.uid
    let dbRef = db.collection('users').doc(currentUserID)
    dbRef
      .update({
        name: profileData.name,
        email: profileData.email,
        phone: profileData.phone,
        bio: profileData.bio
      })
      .then(() => {
        commit('checkIfFormSubmitted', false)
        Notification({
          title: 'Success',
          message: 'Profile updated successfully.',
          type: 'success'
        })
      })
      .catch(error => {
        Notification({
          title: 'Error',
          message: `Something bad happened. Please try again. ${error}`,
          type: 'error'
        })
      })
  },
  deleteProfilePicture () {},
  uploadProfilePicture ({ commit }, pictureInformation) {
    let storageRef = firebase.storage().ref()
    let childRef = storageRef.child(
      'users/' + pictureInformation.renamedPicture
    )
    let uploadTask = childRef.put(pictureInformation.image)
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      function (snapshot) {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        commit('setUploadProgressIndicator', Math.floor(progress))
        console.log('Upload is ' + progress + '% done')
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused')
            break
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running')
            break
        }
      },
      function (error) {
        switch (error.code) {
          case 'storage/unauthorized':
            break

          case 'storage/canceled':
            break

          case 'storage/unknown':
            break
        }
      },
      function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          console.log('File available at', downloadURL)
          db.collection('users')
            .doc(pictureInformation.currentUID)
            .update({ picture: downloadURL })
        })
      }
    )
  },
  profilePictureURL ({ commit }, currentUserID) {
    db.collection('users')
      .doc(currentUserID)
      .get()
      .then(function (doc) {
        let imageURL = doc.data().picture
        commit('setProfilePictureURL', imageURL)
      })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
