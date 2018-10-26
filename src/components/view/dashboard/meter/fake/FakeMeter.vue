<template>
  <div class="is-clearfix my-3">
    <div class="columns is-clearfix has-background-white is-mobile my-1 py-2">
      <div class="column is-3 has-text-centered">
        <AlertDecagramIcon title="" class="is-size-4 has-text-danger" />
        <h6 class="subtitle is-7">Reports</h6>
      </div>
      <div class="column is-7">
        <h6 class="is-size-7 has-text-weight-bold mb-1"> {{ getTotalReportResult }} </h6>
        <p>{{getTotalNewsReportsCountBasedOnDateRange}} reports came in last 30 days</p>
      </div>
      <div class="column is-2">
        <trend :data="[0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 29, 0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0]" :gradient="['#c3222a', '#c3222a', '#c3222a']"
          auto-draw smooth :autoDrawDuration="5000" class="mt-3">
        </trend>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import db from "@/plugins/firebase/init";
import AlertDecagramIcon from "vue-material-design-icons/AlertDecagram";
export default {
  components: {
    AlertDecagramIcon
  },
  computed: {
    ...mapGetters([
      "getTotalReportResult",
      "getTotalNewsResult",
      "getTotalNewsReportsCountBasedOnDateRange"
    ])
  },
  created() {
    let date = new Date();
    let dateInPreviousMonth = date.setMonth(date.getMonth() - 1);
    let previousMonthsTimeInMilliSeconds = new Date(dateInPreviousMonth);
    let todaysDateTimeInMilliSeconds = new Date();
    let dataInfo = {
      startDateAt: previousMonthsTimeInMilliSeconds,
      endDateAt: todaysDateTimeInMilliSeconds
    };
    // console.log(todaysDateTimeInMilliSeconds);
    this.$store.dispatch("totalNewsResultCount");
    this.$store.dispatch("totalReportResultCount");
    this.$store.dispatch("countTotalReportssBasedOnDateRange", dataInfo);
  },
  destroyed() {
    this.$store.dispatch("clearTotalNewsData");
  }
};
</script>