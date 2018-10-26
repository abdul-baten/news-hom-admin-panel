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
            <h1 class="is-size-6">{{ getTotalUserResult }} Users</h1>
          </div>
        </el-container>
        <el-container class="main-container">
          <el-main class="is-fullwidth">
            <UserFilter />
            <UserTable />
          </el-main>
        </el-container>
        <el-container class="main-container">
          <el-main class="is-fullwidth">
            <UserPagination :tableData="tableData" :tableClearData='tableClearData' :totalResult="getTotalUserCountForPagination" />
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
import UserFilter from "@/components/filters/users/UserFilter";
import UserTable from "@/components/view/users/UserTable";
import UserPagination from "@/components/view/pagination/Pagination";
import db from "@/plugins/firebase/init";
export default {
  data() {
    return {
      tableData: "getUserDataTable",
      tableClearData: "clearLastVisibleUser"
    };
  },
  components: {
    Header,
    Sidebar,
    UserFilter,
    UserTable,
    UserPagination
  },
  metaInfo: {
    title: "Users"
  },
  computed: {
    ...mapGetters(["getTotalUserResult", "getTotalUserCountForPagination"])
  },
  beforeDestroy() {
    this.$store.dispatch("clearLastVisibleUser");
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
