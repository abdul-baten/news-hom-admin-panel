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
            <h1 class="is-size-6">{{ totalBadWordCount }} Words</h1>
          </div>
        </el-container>
        <el-container class="main-container">
          <el-main class="is-fullwidth">
            <ReportBadWordsFilter />
            <ReportBadWordsTable />
          </el-main>
        </el-container>
        <el-container class="main-container">
          <el-main class="is-fullwidth">
            <WordPagination :tableData="tableData" :tableClearData='tableClearData' :totalResult="totalBadWordCount" />
          </el-main>
        </el-container> 
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import Header from "@/components/shared/header/_Header";
import Sidebar from "@/components/shared/sidebar/_Sidebar";
import ReportBadWordsFilter from "@/components/filters/reports/BadWordsFilter";
import ReportBadWordsTable from "@/components/view/reports/BadWordsTable";
import WordPagination from "@/components/view/pagination/Pagination";
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      tableData: "getBadWordsDataTable",
      tableClearData: "clearBadWordsData"
    };
  },
  name: "WordsList",
  metaInfo: {
    title: "List of Bad Words"
  },
  computed: {
    ...mapGetters(['totalBadWordCount'])
  },
  created() {
    this.$store.dispatch('countTotalBadWord')
  },
  components: {
    Header,
    Sidebar,
    ReportBadWordsFilter,
    ReportBadWordsTable,
    WordPagination
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