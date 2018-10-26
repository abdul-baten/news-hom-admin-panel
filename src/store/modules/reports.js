import db from "@/plugins/firebase/init";

const state = {
  reportData: [],
  orderByCreation: "createdAt",
  totalResult: 0,
  totalNewsReportsCountBasedOnDateRange: 0,
  lastVisibleReport: {}
};
const getters = {
  reports(state) {
    let ids = [];
    let news = [];
    state.reportData.forEach(item => {
      if (!ids.includes(item.reportNewsId)) {
        ids.push(item.reportNewsId);
        news.push({ ...item, count: 1 });
      } else {
        let INDEX = -1;
        news.forEach((ITEM, index) => {
          if (ITEM.reportNewsId === item.reportNewsId) {
            INDEX = index;
          }
        });
        news[INDEX].count = news[INDEX].count + 1;
      }
    });
    return news;
  },
  getTotalReportResult(state) {
    return state.totalResult;
  },
  getTotalNewsReportsCountBasedOnDateRange(state) {
    return state.totalNewsReportsCountBasedOnDateRange;
  }
};
const mutations = {
  setReportData(state, report) {
    state.reportData = report;
  },
  setTotalReportResult(state, report) {
    state.totalResult = report;
  },
  setLastVisibleReport(state, lastReport) {
    state.lastVisibleReport = lastReport;
  },
  setTotalReportsCountBaseOnDateRange(state, dataResult) {
    state.totalNewsReportsCountBasedOnDateRange = dataResult;
  }
};
const actions = {
  totalReportResultCount({ commit }) {
    db.collection("reports")
      .get()
      .then(querySnapshot => {
        if (querySnapshot.docs.length > 0) {
          let totalResult = querySnapshot.docs.length;
          commit("setTotalReportResult", totalResult);
        }
      });
  },
  getReportTableData({ commit, state }, pageInfo) {
    let reportDbRef;
    let fetchDirection = pageInfo.orderDirection || "desc";
    let changedReportGenerateType = pageInfo.changedReportGenerateType;
    let changedReportType = pageInfo.changedReportType;
    let resultStartDurationDate = pageInfo.startDurationDate;
    let resultEndDurationDate = pageInfo.endDurationDate;
    state.reportData.splice(0, state.reportData.length);

    if (pageInfo) {
      if (
        changedReportGenerateType &&
        !changedReportType &&
        !resultStartDurationDate
      ) {
        if (changedReportGenerateType === "system") {
          reportDbRef = db
            .collection("reports")
            .where("reportedBy", "==", "system")
            .orderBy(state.orderByCreation, fetchDirection);
        } else if (changedReportGenerateType === "userGenerated") {
          reportDbRef = db
            .collection("reports")
            .where("reportedBy", "<", "system");
        } else {
          reportDbRef = db
            .collection("reports")
            .orderBy(state.orderByCreation, fetchDirection);
        }
      } else if (
        changedReportGenerateType &&
        changedReportType &&
        !resultStartDurationDate
      ) {
        if (changedReportGenerateType === "system") {
          reportDbRef = db
            .collection("reports")
            .where("reportedBy", "==", "system")
            .where("reason", "==", changedReportType)
            .orderBy(state.orderByCreation, fetchDirection);
        } else if (changedReportGenerateType === "userGenerated") {
          reportDbRef = db
            .collection("reports")
            .where("reason", "==", changedReportType)
            .where("reportedBy", "<", "system")
            .orderBy("reportedBy", fetchDirection);
        } else {
          reportDbRef = db
            .collection("reports")
            .where("reason", "==", changedReportType)
            .orderBy(state.orderByCreation, fetchDirection);
        }
      } else if (
        changedReportGenerateType &&
        resultStartDurationDate &&
        !changedReportType
      ) {
        if (changedReportGenerateType === "system") {
          reportDbRef = db
            .collection("reports")
            .where("reportedBy", "==", "system")
            .where("createdAt", ">=", resultStartDurationDate)            
            .where("createdAt", "<=", resultEndDurationDate)
            .orderBy(state.orderByCreation, fetchDirection);

            console.log('query happened here')
        } else if (changedReportGenerateType === "userGenerated") {
          reportDbRef = db
            .collection("reports")
            // .where("reportedBy", "<", "system")
            .where("createdAt", ">=", resultStartDurationDate)            
            .where("createdAt", "<=", resultEndDurationDate)
            .orderBy(state.orderByCreation, fetchDirection);
        } else {
          reportDbRef = db
            .collection("reports")
            .where("createdAt", ">=", resultStartDurationDate)
            .where("createdAt", "<=", resultEndDurationDate)
            .orderBy(state.orderByCreation, fetchDirection);
        }
      } else if (
        changedReportType &&
        !resultStartDurationDate &&
        !changedReportGenerateType
      ) {
        reportDbRef = db
          .collection("reports")
          .where("reason", "==", changedReportType)
          .orderBy(state.orderByCreation, fetchDirection);
      } else if (
        !changedReportGenerateType &&
        !changedReportType &&
        resultStartDurationDate
      ) {
        reportDbRef = db
          .collection("reports")
          .where("createdAt", ">=", resultStartDurationDate)
          .where("createdAt", "<=", resultEndDurationDate)
          .orderBy(state.orderByCreation, fetchDirection);
      } else if (
        changedReportGenerateType &&
        changedReportType &&
        resultStartDurationDate
      ) {
        if (changedReportGenerateType === "system") {
          reportDbRef = db
            .collection("reports")
            .where("reportedBy", "==", "system")
            .where("reason", "==", changedReportType)
            .where("createdAt", ">=", resultStartDurationDate)
            .where("createdAt", "<=", resultEndDurationDate)
            .orderBy(state.orderByCreation, fetchDirection);
        } else if (changedReportGenerateType === "userGenerated") {
          reportDbRef = db
            .collection("reports")
            // .where("reportedBy", "<", "system")
            .where("reason", "==", changedReportType)
            .where("createdAt", ">", resultStartDurationDate)
            .orderBy(state.orderByCreation, fetchDirection);
        } else {
          reportDbRef = db
            .collection("reports")
            .where("reason", "==", changedReportType)
            .where("createdAt", ">=", resultStartDurationDate)
            .where("createdAt", "<=", resultEndDurationDate)
            .orderBy(state.orderByCreation, fetchDirection);
        }
      } else if (
        changedReportType &&
        resultStartDurationDate &&
        !changedReportGenerateType
      ) {
        reportDbRef = db
          .collection("reports")
          .where("reason", "==", changedReportType)
          .where("createdAt", ">=", resultStartDurationDate)
          .where("createdAt", "<=", resultEndDurationDate)
          .orderBy(state.orderByCreation, fetchDirection);
      } else {
        reportDbRef = db
          .collection("reports")
          .orderBy(state.orderByCreation, fetchDirection);
      }
    } else {
      reportDbRef = db
        .collection("reports")
        .orderBy(state.orderByCreation, fetchDirection);
    }
        
    reportDbRef
      .where("adminAction", "==", "pending")
      .get()
      .then(querySnapShot => {
        querySnapShot.forEach(doc => {
          let resultData = doc.data();
          let data = {
            reportId: resultData.id,
            reportNewsId: resultData.newsId,
            reportNewsTitle: null,
            reportNewsViews: null,
            reportNewsThumbnail: null
          };
          state.reportData.push(data);
        });
      })
      .then(() => {
        state.reportData.forEach(reportItem => {
          db.collection("news")
            .doc(reportItem.reportNewsId)
            .get()
            .then(doc => {
              reportItem.reportNewsTitle = doc.data().title;
              reportItem.reportNewsThumbnail = doc.data().thumbnail;
            });
        });
      })
      .then(() => {
        state.reportData.forEach(reportItem => {
          db.collection("news_stats")
            .doc(reportItem.reportNewsId)
            .get()
            .then(doc => {
              reportItem.reportNewsViews = doc.data().viewCount;
            });
        });
      });
  },
  countTotalReportssBasedOnDateRange({ commit }, dataInfo) {
    db.collection("reports")
      .where("createdAt", ">=", dataInfo.startDateAt)
      .where("createdAt", "<=", dataInfo.endDateAt)
      .orderBy("createdAt")
      .get()
      .then(querySnapShot => {
        let dataResult = querySnapShot.docs.length;
        commit("setTotalReportsCountBaseOnDateRange", dataResult);
      })
      .catch(err => {
        console.log(err);
      });
  },
  clearLastVisibleReport({ commit }) {
    let lastReport = {};
    commit("setLastVisibleReport", lastReport);
  },
  onReportActionChanged({ commit }, reportInfo) {
    let reportId = reportInfo.reportId;
    let newsId = reportInfo.reportNewsId;
    let reportAction = reportInfo.reportAction
    db.collection("reports")
      .doc(reportId)
      .update({
        adminAction: reportAction
      })
      .then(() => {
        db.collection("news")
          .doc(newsId)
          .update({
            status: reportAction
          })
          .then(() => {
            let findIndex = state.reportData.findIndex(
              element => element.reportId === reportId
            );
            state.reportData.splice(findIndex, 1);
          });
      });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
