 <template>
  <div class="container-fluid my-4">
    <div class="is-clearfix" v-if="reports.length > 0">
      <div class="columns is-multiline my-1">
        <div class="column is-4 mb-4" v-for="report in reports" :key="report.reportId">
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
                <div class="columns is-clearfix is-multiline mt-4">
                  <div class="column is-6 is-pulled-left">
                    <p>{{ report.reportNewsViews }} Views</p>
                  </div>
                  <div class="column is-6 is-pulled-right">
                    <!-- <p class="has-text-right is-capitalized"> {{ report.reportCreatedAt | momentAgoFormatter }}</p> -->
                    <p class="has-text-right is-capitalized"> Reported {{ report.count }} times</p>
                  </div>
                </div>
              </div>
            </div>
            <footer class="card-footer">
                <el-button type="text" size="mini" @click.prevent="onReportActionChanged(report.reportId, report.reportNewsId, 'published')" class="card-footer-item is-uppercase has-text-success">Mark as OK</el-button>
              <el-button type="text" size="mini" @click.prevent="onReportActionChanged(report.reportId, report.reportNewsId, 'unpublished')" class="card-footer-item is-uppercase has-text-weight-semibold has-text-danger">Unpublish News</el-button>
            </footer>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <section class="hero is-light is-medium">
    <div class="hero-body">
      <div class="container has-text-centered">
        <p class="subtitle">
          No data found.
        </p>
      </div>
    </div>
  </section>
    </div>
  </div>
</template>

<script>
import ContentLoader from "@/components/view/loading/Loading";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      noDataFound: false
    }
  },
  components: {
    ContentLoader
  },
  computed: {
    ...mapGetters(["reports"])
  },
  created() {
    let pageInfo = {
      orderDirection: "desc"
    };
    this.$store.dispatch("totalReportResultCount");
    this.$store.dispatch("clearLastVisibleReport");
    this.$store.dispatch("getReportTableData", pageInfo);
  },
  beforeDestroy() {
    this.$store.dispatch("clearLastVisibleReport");
  },
  methods: {
    onReportActionChanged(thisReportId, thisReportNewsId, thisReportAction) {
      const reportInfo = {
        reportId: thisReportId,
        reportNewsId: thisReportNewsId,
        reportAction: thisReportAction
      };
      this.$store.dispatch("onReportActionChanged", reportInfo);
    }
  }
};
</script>