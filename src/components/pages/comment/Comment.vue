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
            <h1 class="is-size-6">{{ getTotalCommentResult }} Comments</h1>
          </div>
        </el-container>
        <el-container class="main-container">
          <el-main class="is-fullwidth">
            <CommentsFilter />
            <CommentsTable />
          </el-main>
        </el-container>
        <el-container class="main-container">
          <el-main class="is-fullwidth">
            <CommentPagination :tableData="tableData" :tableClearData="tableClearData" :totalResult="getTotalCommentResult" />
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
import CommentsFilter from "@/components/filters/comments/CommentsFilter";
import CommentsTable from "@/components/view/comments/CommentsTable";
import CommentPagination from "@/components/view/pagination/Pagination";
export default {
  data() {
    return {
      tableData: "getCommentTableData",
      tableClearData: "clearLastVisibleComment"
    };
  },
  components: {
    Header,
    Sidebar,
    CommentsFilter,
    CommentsTable,
    CommentPagination
  },
  metaInfo: {
    title: "Comments"
  },
  computed: {
    ...mapGetters(["getTotalCommentResult"])
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