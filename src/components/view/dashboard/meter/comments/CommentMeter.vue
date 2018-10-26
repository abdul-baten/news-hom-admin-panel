<template>
  <div class="is-clearfix my-3">
    <div class="columns is-clearfix has-background-white is-mobile my-1 py-2">
      <div class="column is-3 has-text-centered">
        <MessageReplyTextIcon title="" class="is-size-4 has-text-link" />
        <h6 class="subtitle is-7">Comments</h6>
      </div>
      <div class="column is-7">
        <h6 class="is-size-7 has-text-weight-bold mb-1"> {{ getTotalCommentResult }} </h6>
        <p>{{getTotalNewsCommentsCountBasedOnDateRange}} comments came in last 30 days</p>
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
import MessageReplyTextIcon from "vue-material-design-icons/MessageReplyText";
export default {
  components: {
    MessageReplyTextIcon
  },
  computed: {
    ...mapGetters([
      "getTotalCommentResult",
      "getTotalNewsCommentsCountBasedOnDateRange"
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
      startDateAt: dateInPreviousMonth,
      endDateAt: todaysDateTimeInMilliSeconds
    };
    this.$store.dispatch("totalCommentResultCount");
    this.$store.dispatch("countTotalCommentsBasedOnDateRange", dataInfo);
  },
  destroyed() {
    this.$store.dispatch("clearTotalDataCountBasedOnDateRange");
  }
};
</script>

