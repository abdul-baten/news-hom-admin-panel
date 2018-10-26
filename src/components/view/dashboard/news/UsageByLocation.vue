<template>
  <div class="is-clearfix">
    <div class="is-clearfix mb-4">
      <div class="columns">
        <div class="column">
          <h1 class="title is-6 is-capitalized">Usage by Country/City</h1>
        </div>
        <div class="column">
          <div class="columns">
            <div class="column">
              <!-- <el-select v-model="value" placeholder="Country" size="mini">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select> -->
            </div>
            <div class="column">
              <!-- <el-select v-model="value" placeholder="City" size="mini">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select> -->
            </div>
          </div>
        </div>
      </div>
      <div class="is-clearfix">
        <UsageByCountryChart />
      </div>
    </div>
  </div>
</template>

<script>
import UsageByCountryChart from "@/components/view/dashboard/chart/UsageByCountryChart";
export default {
  components: {
    UsageByCountryChart
  }
};
</script>
