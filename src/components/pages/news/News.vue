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
            <h1 class="is-size-6">{{ getTotalNewsResult }} News</h1>
          </div>
        </el-container>
        <el-container class="main-container">
          <el-main class="is-fullwidth">
            <NewsFilter />
            <NewsTable />
          </el-main>
        </el-container>
        <el-container class="main-container">
          <el-main class="is-fullwidth">
            <NewsPagination :tableData="tableData" :tableClearData="tableClearData" :totalResult="getTotalNewsCountForPagination" />
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
import NewsFilter from "@/components/filters/news/NewsFilter";
import NewsTable from "@/components/view/news/NewsTable";
import NewsPagination from "@/components/view/pagination/Pagination";
export default {
  data() {
    return {
      tableData: "getNewsTableData",
      tableClearData: "clearLastVisibleNews"
    };
  },
  components: { Header, Sidebar, NewsFilter, NewsTable, NewsPagination },
  metaInfo: {
    title: "News"
  },
  computed: {
    ...mapGetters(["getTotalNewsResult", "getTotalNewsCountForPagination"])
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