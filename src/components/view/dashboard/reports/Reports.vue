<template>
  <div class="is-clearfix">
    <div class="columns is-clearfix">
      <div class="column is-half is-pulled-left">
        <h1 class="title is-6 is-uppercase">Reported</h1>
      </div>
      <div class="column is-half is-pulled-right">
        <router-link to="/admin/reports">
          <el-button round class="is-pulled-right" size="mini">View all</el-button>
        </router-link>
      </div>
    </div>
    <ReportsTable />
  </div>
</template>
<script>
import ReportsTable from "@/components/view/reports/ReportsTable";
export default {
  components: {
    ReportsTable
  }
};
</script>