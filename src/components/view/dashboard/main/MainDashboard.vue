<template>
  <div class="is-clearfix">
    <section class="section p-3">
      <div class="has-background-white section pa-3">
        <div class="is-clearfix">
          <UserActivity />
        </div>
      </div>
    </section>
    <section class="section pa-3">
      <div class="columns is-clearfix">
        <div class="column is-8 has-background-white section p-4">
          <UsageByLocation />
        </div>
        <div class="column is-4 has-background-white-bis section p-4">
          <PopularityMeter />
        </div>
      </div>
    </section>
    <section class="section pa-3">
      <div class="columns is-clearfix is-multiline">
        <div class="column is-6 has-background-white section p-4">
          <TopPublisher />
        </div>
        <div class="column is-6 has-background-white-bis section p-4">
          <RecentlyAdded />
        </div>
      </div>
    </section>
    <section class="section mtm-3">
      <PopularNews />
    </section>
    <section class="section mtm-7">
      <Reports />
    </section>
  </div>
</template>


<script>
import UserActivity from "@/components/view/dashboard/users/UserActivity";
import UsageByLocation from "@/components/view/dashboard/news/UsageByLocation";
import TopPublisher from "@/components/view/dashboard/users/TopPublisher";
import RecentlyAdded from "@/components/view/dashboard/users/RecentlyAdded";
import PopularNews from "@/components/view/dashboard/news/PopularNews";
import Reports from "@/components/view/dashboard/reports/Reports";
import PopularityMeter from "@/components/view/dashboard/meter/Popularity";
export default {
  components: {
    UserActivity,
    UsageByLocation,
    TopPublisher,
    RecentlyAdded,
    PopularNews,
    Reports,
    PopularityMeter
  }
};
</script>