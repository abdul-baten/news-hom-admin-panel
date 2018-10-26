<template>
  <div class="is-clearfix has-background-light">
    <div class="columns is-gapless is-clearfix is-multiline">
      <div class="sidebar-content is-pulled-left">
        <Sidebar />
      </div>
      <div class="area-content is-pulled-right">
        <Header />
        <el-container class="main-container">
          <UpdateProfileInfo />
        </el-container>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import Header from "@/components/shared/header/_Header";
import Sidebar from "@/components/shared/sidebar/_Sidebar";
import UpdateProfileInfo from "@/components/view/profile/UpdateProfileInfo";

export default {
  components: {
    Header,
    Sidebar,
    UpdateProfileInfo
  },
  metaInfo: {
    title: "Profile"
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
