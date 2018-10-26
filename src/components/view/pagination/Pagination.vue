<template>
  <div class="columns is-clearfix is-multiline mb-5" v-if="totalResult > limitCounter">
    <div class="column is-3">
      <div class="is-pulled-left">
        <el-select v-model="viewLimit" placeholder="Show per page" size="medium" @change="changeViewLimit">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </div>
    </div>
    <div class="column is-9">
      <div class="has-text-centered is-pulled-right">
        <el-pagination background @prev-click="showPreviousPage" @next-click="showNextPage" :page-size.sync="viewLimit"
          layout="prev, next" :total="totalResult" size="big">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      limitCounter: 10,
      viewLimit: 10,
      options: [
        {
          value: 10,
          label: "10"
        },
        {
          value: 20,
          label: "20"
        },
        {
          value: 50,
          label: "50"
        },
        {
          value: 100,
          label: "100"
        }
      ]
    };
  },
  props: ["tableData", "tableClearData", "totalResult"],
  methods: {
    changeViewLimit: function(value) {
      let limitCounter = this.viewLimit;
      let pageInfo = {
        limit: limitCounter,
        orderDirection: "desc"
      };
      this.$store.dispatch(this.tableClearData);
      this.$store.dispatch(this.tableData, pageInfo);
    },
    showNextPage() {
      let limitCounter = this.viewLimit;
      let pageInfo = {
        limit: limitCounter,
        orderDirection: "desc",
        paginationMode: "next"
      };
      this.$store.dispatch(this.tableData, pageInfo);
    },
    showPreviousPage() {
      let limitCounter = this.viewLimit;
      let pageInfo = {
        limit: limitCounter,
        orderDirection: "asc",
        paginationMode: "previous"
      };
      this.$store.dispatch(this.tableData, pageInfo);
    }
  }
};
</script>