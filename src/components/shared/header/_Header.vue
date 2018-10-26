<template>
  <div class="header">
    <div class="columns is-mobile is-clearfix is-marginless">
      <div class="column is-6 is-pulled-left">
        <a href="/">
          <figure class="mt-1">
            <img src="@/assets/images/logo/logo.png" class="logo-img">
          </figure>
        </a>
      </div>
      <div class="column is-6 is-pulled-right">
        <div class="is-clearfix" v-if="isLoggedIn">
          <el-dropdown class="is-fullwidth is-pulled-right" size="medium" trigger="click">
            <el-button round size="small">
              <span class="is-capitalized">{{ loggedInUserName }}</span>
              <i class="el-icon-arrow-down"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <router-link to="/admin/profile" exact>Profile</router-link>
              </el-dropdown-item>
              <el-dropdown-item divided><a @click.prevent="logUserOut">Logout</a></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="is-clearfix" v-else>
          <a href="#app-download">
          <el-button type="primary" round size="big" class="is-pulled-right" style="margin-top: -2px">
              <i class="el-icon-download"></i>
              <span class="is-capitalized">Download App</span>
            </el-button>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  methods: {
    ...mapActions(["logUserOut"])
  },
  computed: {
    ...mapGetters(["isLoggedIn", "loggedInUserName"])
  },
  created() {
    this.$store.dispatch("loggedInUserInfo");
  }
};
</script>
