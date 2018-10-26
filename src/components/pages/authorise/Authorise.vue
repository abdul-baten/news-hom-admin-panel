<template>
  <section class="hero is-info is-fullheight">
    <div class="hero-head">
      <header class="navbar is-fixed-top">
        <div class="container">
          <div class="navbar-brand">
            <el-button icon="el-icon-arrow-left" type="text" class="has-text-white" @click.prevent="goBackward">Go back</el-button>
          </div>
        </div>
      </header>
    </div>
    <div class="hero-body">
      <div class="container has-text-centered">
        <p class="title is-1">
          <AlarmLightIcon />
          503
        </p>
        <p class="subtitle">
          Sorry, you're not authorised to access on this page.
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import AlarmLightIcon from "vue-material-design-icons/AlarmLight";
export default {
  metaInfo: {
    title: "Not authorised"
  },
  components: {
    AlarmLightIcon
  },
  methods: {
    goBackward() {
      this.$router.replace({ name: "Login" });
    }
  }
};
</script>