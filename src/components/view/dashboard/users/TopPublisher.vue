<template>
  <div class="main-container">
    <div class="is-clearfix mb-4">
      <h1 class="title is-6 is-capitalized">Top News Publisher</h1>
    </div>
    <div class="is-clearfix">
      <el-table :data="publisher" fit>
          <el-table-column width="50">
            <template slot-scope="scope">
              <figure class="image is-32x32">
                    <img v-if="scope.row.picture" class="image is-rounded" :src="scope.row.picture">
                    <img v-else class="image is-rounded" src="@/assets/images/user/user_profile.png">
                  </figure>
            </template>
          </el-table-column>
          <el-table-column label="Name" prop="name" value="name" class-name="is-capitalized"></el-table-column>
          <el-table-column label="News Count" value="newsCount" prop="newsCount"></el-table-column>
      </el-table>
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
    ...mapGetters(["publisher"])
  },
  created() {
    var pageInfo = {
      limit: 5,
      orderDirection: "desc"
    };
    this.$store.dispatch("clearLastVisibleUser");
    this.$store.dispatch("getTopNewsPublisher", pageInfo);
  }
};
</script>