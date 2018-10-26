<template>
  <div class="container">
    <section class="section">
      <div class="columns is-clearfix is-multinile is-centered">
        <div class="column is-6">
          <div class="is-horizontal-center">
            <div class="has-text-centered is-centered" style="margin-bottom: 30px; text-align: center !important">
              <a href="/">
                <figure>
                <img src="@/assets/images/logo/logo.png">
              </figure>
              </a>
            </div>
          </div>
          <div class="box">
            <LoginForm />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import firebase from "firebase";
import LoginForm from "@/components/view/auth/signin/Login";
export default {
  name: "login",
  metaInfo: {
    title: "Login"
  },
  components: { LoginForm },
  beforeRouteEnter(to, from, next) {
    // firebase.auth().onAuthStateChanged(user => {
    //   if (!user) {
    //     next();
    //   } else {
    //     next("/admin/dashboard");
    //   }
    // });
    next(vm => {
      vm.$store.dispatch("logUserOut");
    });
  }
};
</script>
