import router from "@/router/index";
import firebase from "firebase";
import db from "@/plugins/firebase/init";

const state = {
  isLoggedIn: false,
  loggedInUserName: null,
  loggedInUserRole: null
};

const getters = {
  isLoggedIn(state) {
    return state.isLoggedIn;
  },
  loggedInUserName(state) {
    return state.loggedInUserName;
  },
  loggedInUserRole(state) {
    return state.loggedInUserRole;
  }
};

const mutations = {
  checkIfLoggedIn(state, isLoggedIn) {
    state.isLoggedIn = isLoggedIn;
  },
  setLoggedInUserInfo(state, userInfo) {
    state.loggedInUserName = userInfo.userName;
    state.loggedInUserRole = userInfo.userRole;
  }
};

const actions = {
  userSignIn({ commit }, authData) {
    firebase
      .auth()
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(() => {
        const user = firebase.auth().currentUser;
        const userId = user.uid;
        if (user) {
          db.collection("users")
            .doc(userId)
            .get()
            .then(doc => {
              const userRole = doc.data().role;
              return userRole;
            })
            .then(userRole => {
              if (userRole === "user") {
                firebase
                  .auth()
                  .signOut()
                  .then(function() {
                    router.push({
                      name: "NotAuthorised"
                    });
                  });
                console.log(userRole);
              } else {
                router.push({ name: "Dashboard" });
              }
            });
        }
      })
      .catch(function(error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        if (errorCode == "auth/weak-password") {
          alert("The password is too weak.");
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
  },

  logUserOut({ commit }) {
    firebase
      .auth()
      .signOut()
      .then(function() {
        router.push({ name: "Login" });
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  loggedInUserInfo({ commit }) {
    let currentUserID = firebase.auth().currentUser.uid;
    if (currentUserID) {
      commit("checkIfLoggedIn", true);
      db.collection("users")
        .doc(currentUserID)
        .get()
        .then(function(doc) {
          const userInfo = {
            userName: doc.data().name,
            userRole: doc.data().role
          };
          commit("setLoggedInUserInfo", userInfo);
        });
    } else {
      commit("checkIfLoggedIn", false);
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
