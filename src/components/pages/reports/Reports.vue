<template>
  <router-view></router-view>
</template>

<script>
import firebase from "firebase";
import { mapGetters } from "vuex";
import Header from "@/components/shared/header/_Header";
import Sidebar from "@/components/shared/sidebar/_Sidebar";
import ReportsFilter from "@/components/filters/reports/ReportsFilter";
import ReportsTable from "@/components/view/reports/ReportsTable";
import ReportPagination from "@/components/view/pagination/Pagination";
export default {
  data() {
    return {
      tableData: "getReportTableData",
      tableClearData: "clearLastVisibleReport"
    };
  },
  metaInfo: {
    title: "Reports"
  },
  components: {
    Header,
    Sidebar,
    ReportsFilter,
    ReportsTable,
    ReportPagination
  },
  computed: {
    ...mapGetters(["getTotalReportResult"])
  },
  beforeRouteEnter(to, from, next) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        next();
      } else {
        next("/auth/login");
      }
    });
  }
};
</script>
