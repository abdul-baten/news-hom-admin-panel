import db from "@/plugins/firebase/init";
import moment from "moment";

const state = {
  timestamps: [],
  dates: [],
  newLikesCount: [],
  newDislikesCount: [],
  newCommentsCount: []
};

const getters = {
  getNewDatesCountData(state) {
    return state.dates;
  },
  getNewLikesCountData(state) {
    return state.newLikesCount;
  },
  getNewDisikesCountData(state) {
    return state.newDislikesCount;
  },
  getNewCommentsCountData(state) {
    return state.newCommentsCount;
  }
};

const mutations = {
  clearAllInfo(state) {
    state.newLikesCount = [];
    state.newDislikesCount = [];
    state.newCommentsCount = [];
    state.dates = [];
  }
};

const actions = {
  getUserActivityChart({ commit }, userActivityInfo) {
    var self = this;
    var date = new Date();
    var startDate = userActivityInfo.firstDateOfRange;
    var endDate = userActivityInfo.lastDateOfRange;
    var likesDbRef = db.collection("likes");
    var dislikesDbRef = db.collection("dislikes");
    var commentsDbRef = db.collection("comments");

    for (var i = 1; i <= endDate.getDate(); i++) {
      var tm = date.setDate(date.getDate() - 1, 0);
      state.timestamps.push(tm);
    }

    for (var i = 0; i < state.timestamps.length - 1; i++) {
      let start, end, ab, cd;
      ab = i;
      cd = ab + 1;
      start = state.timestamps[ab];
      end = state.timestamps[cd];
      state.dates.push(moment(state.timestamps[ab]).format("MMM DD"));
      likesDbRef
        .where("createdAt", ">", end)
        .where("createdAt", "<", start)
        .get()
        .then(querySnapShot => {
          var likesData = querySnapShot.docs.length;
          state.newLikesCount.push(likesData);
        });
      dislikesDbRef
        .where("createdAt", ">", end)
        .where("createdAt", "<", start)
        .get()
        .then(querySnapShot => {
          var dislikesData = querySnapShot.docs.length;
          state.newDislikesCount.push(dislikesData);
        });
      commentsDbRef
        .where("createdAt", ">", end)
        .where("createdAt", "<", start)
        .get()
        .then(querySnapShot => {
          var commentsData = querySnapShot.docs.length;
          state.newCommentsCount.push(commentsData);
        });
    }
  },
  clearAllUserActivityInfo({ commit }) {
    commit("clearAllInfo");
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
