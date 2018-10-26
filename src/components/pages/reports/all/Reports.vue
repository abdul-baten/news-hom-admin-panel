<template>
  <div class="is-clearfix">
    <div class="columns is-gapless is-clearfix is-multiline">
      <div class="sidebar-content is-pulled-left">
        <Sidebar />
      </div>
      <div class="area-content is-pulled-right">
        <Header />
        <el-container class="main-container">
          <div class="w-100 p-3 px-4 has-background-light">
            <h1 class="is-size-6">{{ getTotalReportResult }} Reports</h1>
          </div>
        </el-container>
        <el-container class="main-container">
          <el-main class="is-fullwidth">
            <ReportsFilter />
            <AllReportsTable />
          </el-main>
        </el-container>
        <el-container class="main-container">
          <el-main class="is-fullwidth">
            <ReportPagination :tableData="tableData" :tableClearData="tableClearData" :totalResult="getTotalReportResult"/>
          </el-main>
        </el-container>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import { mapGetters } from "vuex";
import Header from "@/components/shared/header/_Header";
import Sidebar from "@/components/shared/sidebar/_Sidebar";
import ReportsFilter from "@/components/filters/reports/ReportsFilter";
import AllReportsTable from "@/components/view/reports/AllReportsTable";
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
    AllReportsTable,
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
