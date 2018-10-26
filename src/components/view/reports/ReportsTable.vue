<template>
  <div class="container-fluid my-4">
    <div class="is-clearfix" v-if="reports.length > 0">
      <div class="columns is-multiline is-desktop">
        <div class="column is-4" v-for="report in reports" :key="report.reportId">
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <img v-if="report.reportNewsThumbnail" :src="report.reportNewsThumbnail">
                <img v-else src="@/assets/images/news/news_placeholder.png">
              </figure>
            </div>
            <div class="card-content">
              <div class="content">
                <p class="title is-6"> {{ report.reportNewsTitle }} </p>
                <div class="columns is-clearfix">
                  <div class="column is-6 is-pulled-left">
                    <p>{{ report.reportNewsViewCount }} Views</p>
                  </div>
                  <div class="column is-6 is-pulled-right">
                    <p class="has-text-right is-capitalized"> {{ report.reportCreatedAt | momentAgoFormatter }}</p>
                  </div>
                </div>
              </div>
            </div>
            <footer class="card-footer">
              <el-tooltip class="item" effect="dark" content="Keep the News" placement="top">
                <el-button type="text" size="mini" class="card-footer-item is-uppercase has-text-weight-semibold has-text-success">Keep
                  It</el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="Delete the News" placement="top">
                <el-button type="text" size="mini" @click.prevent="deleteThisReport(report.reportId, report.reportNewsId)" class="card-footer-item is-uppercase has-text-weight-semibold has-text-danger">Delete</el-button>
              </el-tooltip>
            </footer>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="my-5 is-centered has-text-centered">
        <ContentLoader />
      </div>
    </div>
  </div>
</template>

<script>
import ContentLoader from "@/components/view/loading/Loading";
import { mapGetters } from "vuex";
export default {
  props: ["reportStatus"],
  components: {
    ContentLoader
  },
  computed: {
    ...mapGetters(["reports"])
  },
  created() {
    var pageInfo = {
      orderDirection: "desc",
      reportStatus: this.reportStatus
    };
    this.$store.dispatch("totalReportResultCount");
    this.$store.dispatch("clearLastVisibleReport");
    this.$store.dispatch("getReportTableData", pageInfo);
  },
  beforeDestroy() {
    this.$store.dispatch("clearLastVisibleReport");
  },
  methods: {
    deleteThisReport(thisReportId, thisReportNewsId) {
      const reportInfo = {
        reportId: thisReportId,
        reportNewsId: thisReportNewsId
      };
      console.log(thisReportId);
      this.$store.dispatch("removeThisReportAndNews", reportInfo);
    }
  }
};
</script>