<template>
  <el-form :model="ruleForm" :show-message="false" ref="ruleForm" class="border-bottom">
        <div class="columns is-clearfix is-multiline my-1">
          <div class="column">
        <el-form-item prop="reportGenerateType">
          <el-select placeholder="All Reports" size="big" class="w-100" v-model="ruleForm.reportGenerateType" @change="onReportGenerateTypeChanged">
            <el-option :value="reportGenerateOption.value" :label="reportGenerateOption.label" v-for="(reportGenerateOption, index) in reportGenerateOptions"
              :key="index"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="column">
        <el-form-item prop="reportType">
          <el-select placeholder="Report Type" size="big" class="w-100" v-model="ruleForm.reportType" @change="onReportTypeChanged">
            <el-option :value="reportTypeOption.value" :label="reportTypeOption.label" v-for="(reportTypeOption, index) in reportTypeOptions"
              :key="index"></el-option>
          </el-select>
        </el-form-item>
      </div>
          <div class="column">
        <el-form-item prop="timeDuration">
          <el-select placeholder="Reported on" size="big" class="w-100" v-model="ruleForm.timeDuration" @change="onReportDateRangeChanged">
            <el-option :value="dateRangeOption.value" :label="dateRangeOption.label" v-for="(dateRangeOption, index) in reportDateRangeOptions"
              :key="index"></el-option>
          </el-select>
        </el-form-item>
      </div>
          <div class="column mb-3">
        <el-button icon="el-icon-sort" @click.prevent="resetForm('ruleForm')" type="info" class="w-100">Reset</el-button>
      </div>
        </div>
  </el-form>
</template>


<script>
import { mapGetters } from "vuex";
import moment from "moment";
export default {
  data() {
    return {
      ruleForm: {
        timeDuration: "",
        reportType: "",
        reportGenerateType: ""
      },
      reportDateRangeOptions: [
        {
          label: "Today",
          value: new Date().getTime()
        },
        {
          label: "This week",
          value: new Date(
            moment()
              .subtract(7, "days")
              .calendar()
          ).getTime()
        },
        {
          label: "This month",
          value: new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            1
          ).getTime()
        }
      ],
      reportTypeOptions: [
        {
          label: "Fake",
          value: "Fake"
        },
        {
          label: "Inappropriate",
          value: "Inappropriate"
        },
        {
          label: "Against Religion / Race",
          value: "Against Religion/Race"
        }
      ],
      reportGenerateOptions: [
        {
          label: "All Reports",
          value: "All Reports"
        },
        {
          label: "Automated",
          value: "system"
        },
        {
          label: "User Generated",
          value: "userGenerated"
        }
      ]
    };
  },
  methods: {
    resetForm(formName) {
      let pageInfo = {
      orderDirection: "desc"
    };
      this.$refs[formName].resetFields();
      this.$store.dispatch("getReportTableData", pageInfo);
    },
    onReportGenerateTypeChanged: function(reportGenerateType) {
      this.ruleForm.reportGenerateType = reportGenerateType;
      let changedDate = new Date(this.ruleForm.timeDuration);
      changedDate.setHours(0);
      changedDate.setMinutes(0);
      changedDate.setSeconds(0);
      let pageInfo = {
        changedReportGenerateType: this.ruleForm.reportGenerateType,
        changedReportType: this.ruleForm.reportType,
        startDurationDate: Number(changedDate.getTime() / 1000),
        endDurationDate: Number(new Date().getTime() / 1000),
        orderDirection: "desc"
      };
      this.$store.dispatch("getReportTableData", pageInfo);
    },
    onReportTypeChanged: function(reportType) {
      this.ruleForm.reportType = reportType;
      let changedDate = new Date(this.ruleForm.timeDuration);
      changedDate.setHours(0);
      changedDate.setMinutes(0);
      changedDate.setSeconds(0);
      let pageInfo = {
        changedReportGenerateType: this.ruleForm.reportGenerateType,
        changedReportType: this.ruleForm.reportType,
        startDurationDate: Number(changedDate.getTime() / 1000),
        endDurationDate: Number(new Date().getTime() / 1000),
        orderDirection: "desc"
      };
      this.$store.dispatch("getReportTableData", pageInfo);
    },
    onReportDateRangeChanged: function(timeDuration) {
      this.ruleForm.timeDuration = timeDuration;
      let changedDate = new Date(timeDuration);
      changedDate.setHours(0);
      changedDate.setMinutes(0);
      changedDate.setSeconds(0);
      let pageInfo = {
        changedReportGenerateType: this.ruleForm.reportGenerateType,
        changedReportType: this.ruleForm.reportType,
        startDurationDate: Number(changedDate.getTime() / 1000),
        endDurationDate: Number(new Date().getTime() / 1000),
        orderDirection: "desc"
      };
      this.$store.dispatch("getReportTableData", pageInfo);
    }
  }
};
</script>