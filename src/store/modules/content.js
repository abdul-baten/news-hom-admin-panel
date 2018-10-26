import db from "@/plugins/firebase/init";

const state = {
  contentUpdated: null
};

const getters = {
  contentUpdateStatus(state) {
    return state.contentUpdated;
  }
};

const mutations = {
  setContentUpdateStatus(state, isContentupdated) {
    state.contentUpdated = isContentupdated;
  }
};

const actions = {
  updatePrivacyContent({ commit }, staticContentData) {
    var docRef = db.collection("content").doc("static");
    docRef
      .update({ privacy: staticContentData.staticContent })
      .then(success => {
        console.log("okay");
        setTimeout(() => {
          var isContentupdated = "true";
          commit("setContentUpdateStatus", isContentupdated);
        }, 1500);
      })
      .catch(function(error) {
        var isContentupdated = "false";
        commit("setContentUpdateStatus", isContentupdated);
      });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
