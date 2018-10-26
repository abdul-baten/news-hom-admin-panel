<template>
  <div class="main-container">
    <div class="is-clearfix mb-4">
      <h1 class="title is-6 is-capitalized">Recently Added</h1>
    </div>
    <div class="columns is-clearfix is-multiline">
      <div class="column is-3" v-for="user in users" :key="user.uid">
        <el-card class="box-card p-3" shadow="hover">
          <div class="is-centered has-text-centered">
            <figure class="image is-32x32 mx-auto">
              <img v-if="user.picture" class="image is-rounded" :src="user.picture">
              <img v-else class="image is-rounded" src="@/assets/images/user/user_profile.png">
            </figure>
            <div class="is-clearfix mt-2">
              <h4 class="title is-7 is-capitalized"> {{ user.name }}</h4>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["users"])
  },
  created() {
    var pageInfo = {
      limit: 12,
      orderDirection: "desc"
    };
    this.$store.dispatch("clearLastVisibleUser");
    this.$store.dispatch("getUserDataTable", pageInfo);
  }
};
</script>