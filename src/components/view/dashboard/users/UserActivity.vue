<template>
  <div class="is-clearfix">
    <div class="is-clearfix mb-3">
      <div class="columns my-1 py-2">
        <div class="column is-3">
          <h1 class="title is-6 is-capitalized">User Activity</h1>
        </div>
        <div class="column is-9">
          <DashboardFilter />
        </div>
      </div>
      <div class="is-clearfix">
        <UserActivityChart />
      </div>
    </div>
  </div>
</template>

<script>
import DashboardFilter from "@/components/filters/dashboard/DashboardFilter";
import UserActivityChart from "@/components/view/dashboard/chart/UserActivityChart";
export default {
  components: {
    DashboardFilter,
    UserActivityChart
  }
};
</script>
