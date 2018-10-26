<template>
  <div class="is-clearfix">
    <div class="columns is-clearfix">
      <div class="column">
        <h1 class="title is-6 is-capitalized">Popular News</h1>
      </div>
      <div class="column is-pulled-right is-hidden-mobile">
        <el-select v-model="value" placeholder="Select" size="medium" class="is-pulled-right" @change="changePopularNewsOption">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="is-clearfix" v-if="news.length > 0">
      <div class="columns is-clearfix is-multiline">
      <div class="column is-3" v-for="newsItem in news" :key="newsItem.newsId">
        <el-col>
          <el-card class="mb-2">
            <div class="is-clear">
              <img v-if="newsItem.thumbnail" :src="newsItem.thumbnail" class="image">
              <img v-else src="https://bulma.io/images/placeholders/480x480.png" class="image">
            </div>
            <div class="m-3">
              <h2 class="title is-6  is-capitalized">{{newsItem.newsTitle}}</h2>
              <div class="bottom clearfix">
                <div class="columns is-clearfix">
                  <div class="column is-6 is-pulled-left">
                    <p>{{ newsItem.viewCount }} Views</p>
                  </div>
                  <div class="column is-6 is-pulled-right">
                    <p class="has-text-right is-capitalized">{{ newsItem.createdAt | momentAgoFilter }}</p>
                  </div>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
      </div>
    </div>
    </div>
    <div class="is-clearfix" v-else>
      <loadingBar :loadingItem=4></loadingBar>
    </div>
  </div>
</template>

<script>
import LoadingBar from "@/components/view/loading/Loading";
import { mapGetters } from "vuex";
import moment from "moment";
export default {
  components: {
    LoadingBar
  },
  data() {
    return {
      value: "",
      fullscreenLoading: false,
      options: [
        {
          label: "By Like",
          value: "likeCount"
        },
        {
          label: "By View",
          value: "viewCount"
        },
        {
          label: "By Comment",
          value: "commentCount"
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["news"])
  },
  created() {
    let pageInfo = {
      limit: 8,
      orderDirection: "desc"
    };
    this.$store.dispatch("clearLastVisibleNews");
    this.$store.dispatch("getNewsTableData", pageInfo);
  },
  filters: {
    momentAgoFilter: function(value) {
      return moment(value * 1000).fromNow();
    }
  },
  methods: {
    changePopularNewsOption() {
      let pageInfo = {
        limit: 8,
        orderDirection: "desc",
        orderBy: this.value
      };
      this.fullscreenLoading = true;
      setTimeout(() => {
        this.$store.dispatch("clearLastVisibleNews");
        this.$store.dispatch("getNewsTableData", pageInfo);
        this.fullscreenLoading = false;
      }, 2000);
    }
  }
};
</script>