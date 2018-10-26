<template>
  <div class="is-clearfix my-3">
    <div class="columns is-clearfix has-background-white is-mobile my-1 py-2">
      <div class="column is-3 has-text-centered">
        <ThumbUpIcon title="" class="is-size-4 has-text-success" />
        <h6 class="subtitle is-7">Like</h6>
      </div>
      <div class="column is-7">
        <h6 class="is-size-7 has-text-weight-bold mb-1"> {{ getTotalNewsLikesCount }} </h6>
        <p>{{getTotalNewsLikesCountBasedOnDateRange}} likes came in last 30 days</p>
      </div>
      <div class="column is-2">
        <trend :data="[0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0]" :gradient="['#6fa8dc', '#42b983', '#2c3e50']"
          auto-draw smooth :autoDrawDuration="5000" class="mt-3">
        </trend>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ThumbUpIcon from "vue-material-design-icons/ThumbUp";
export default {
  data() {
    return {
      abc: 10
    };
  },
  components: {
    ThumbUpIcon
  },
  computed: {
    ...mapGetters([
      "getTotalNewsLikesCount",
      "getTotalNewsLikesCountBasedOnDateRange"
    ])
  },
  created() {
    let date = new Date();
    let dateInPreviousMonth = date.setMonth(date.getMonth() - 1);
    let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    let previousMonthsTimeInMilliSeconds = new Date(
      dateInPreviousMonth
    ).getTime();
    let todaysDateTimeInMilliSeconds = new Date().getTime();
    let dataInfo = {
      dataFieldName: "likeCount",
      startDateAt: dateInPreviousMonth,
      endDateAt: todaysDateTimeInMilliSeconds
    };

    this.$store.dispatch("totalNewsResultCount");
    this.$store.dispatch("countTotalNewsData", dataInfo);
  },
  destroyed() {
    this.$store.dispatch("clearTotalDataCountBasedOnDateRange");
  }
};
</script>