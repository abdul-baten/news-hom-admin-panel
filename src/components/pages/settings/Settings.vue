<template>
  
</template>

<script>
import firebase from "firebase";
export default {
  beforeRouteEnter(to, from, next) {
    // var self = this;
    // var currentIdToken = localStorage.getItem("currentIdToken");
    // var currentUserID = localStorage.getItem("currentUserID");
    // var currentTokenExpire = localStorage.getItem("currentTokenExpireTime");
    // var currentTokenExpireTime = new Date(currentTokenExpire).getTime();
    // var currentTime = Date.now();
    // if (currentTime < currentTokenExpireTime) {
    //   if (currentIdToken && currentUserID) {
    //     next();
    //   } else {
    //     next("/auth/login");
    //   }
    // } else {
    //   next(vm => {
    //     vm.$store.dispatch('logUserOut')
    //   });
    // }
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

