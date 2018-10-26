<template>
  <el-form :model="ruleForm" ref="ruleForm" class="border-bottom">
    <div class="columns is-clearfix is-multiline my-1">
      <div class="column is-3">
        <el-form-item prop="searchText">
          <el-input suffix-icon="el-icon-search" clearable placeholder="Type to search news" v-model.lazy.trim="searchText"></el-input>
        </el-form-item>
      </div>
      <div class="column is-1 is-hidden-mobile"></div>
      <div class="column is-2">
        <el-form-item prop="countryName">
          <el-select placeholder="Select Country" size="big" class="w-100 is-capitalized" v-model="ruleForm.countryName" @change="onCountryChanged">
            <el-option class="is-capitalized" :value="countryName" :label="countryName" v-for="(countryName, index) in getAllCountryNames"
              :key="index"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="column is-2">
        <el-form-item prop="cityName">
          <el-select placeholder="Select City" size="big" class="w-100 is-capitalized" v-model="ruleForm.cityName" 
            @change="onCityChanged">
            <el-option class="is-capitalized" :value="cityName" :label="cityName" v-for="(cityName, index) in getAllCityNames" :key="index"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="column is-2">
        <el-form-item prop="timeDuration">
          <el-select placeholder="Posted on" size="big" class="w-100" v-model="ruleForm.timeDuration" @change="changeDateDuration">
            <el-option :value="dateDuration.value" :label="dateDuration.label" v-for="(dateDuration, index) in selectOptions"
              :key="index"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="column is-2 mb-3">
        <el-button icon="el-icon-sort" @click="resetForm('ruleForm')" type="info" class="w-100">Reset</el-button>
      </div>
    </div>
  </el-form>
</template>

<script>
import moment from "moment";
import { mapGetters } from "vuex";
import { debounce } from "debounce";
export default {
  data() {
    return {
      ruleForm: {
        timeDuration: "",
        countryName: "",
        cityName: ""
      },
      searchText: "",
      selectOptions: [
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
      ]
    };
  },
  computed: {
    ...mapGetters(["getAllCountryNames", "getAllCityNames"])
  },
  watch: {
    searchText: function(value) {
      this.changeNewsSearchText(value);
    }
  },
  created() {
    this.$store.dispatch("onColuntryNamesLoaded");
    this.$store.dispatch("onCityNamesLoaded");
  },
  beforeDestroy() {
    this.disabledSelectOption = true;
    this.$store.dispatch("onLoadedCountryNamesCleared");
  },
  methods: {
    resetForm: function(formName) {
      this.$refs[formName].resetFields();
      this.disabledSelectOption = true;
      let pageInfo = {
        orderDirection: "desc"
      };
      this.$store.dispatch("clearLastVisibleNews");
      this.$store.dispatch("getNewsTableData", pageInfo);
      this.$store.dispatch("onTotalNewsCountForPaginationLoaded");
    },
    onCountryChanged: function(countryName) {
      this.ruleForm.cityName = "";
      this.ruleForm.timeDuration = "";
      this.ruleForm.countryName = countryName;
      let changedDate = new Date(this.ruleForm.timeDuration);
      changedDate.setHours(0);
      changedDate.setMinutes(0);
      changedDate.setSeconds(0);
      let pageInfo = {
        changedCountryName: this.ruleForm.countryName,
        changedCityName: this.ruleForm.cityName,
        startDurationDate: Number(changedDate.getTime() / 1000),
        endDurationDate: Number(new Date().getTime() / 1000),
        orderDirection: "desc"
      };
      this.$store.dispatch("getNewsTableData", pageInfo);
      this.$store.dispatch("onLoadedCityNamesCleared");
      this.$store.dispatch("onCityNamesLoaded", this.ruleForm.countryName);
      this.$store.dispatch("onTotalNewsCountForPaginationLoaded", pageInfo);
    },
    onCityChanged: function(cityName) {
      this.ruleForm.cityName = cityName;
      let changedDate = new Date(this.ruleForm.timeDuration);
      changedDate.setHours(0);
      changedDate.setMinutes(0);
      changedDate.setSeconds(0);
      let pageInfo = {
        changedCountryName: this.ruleForm.countryName,
        changedCityName: this.ruleForm.cityName,
        startDurationDate: Number(changedDate.getTime() / 1000),
        endDurationDate: Number(new Date().getTime() / 1000),
        orderDirection: "desc"
      };
      this.$store.dispatch("getNewsTableData", pageInfo);
      this.$store.dispatch("onTotalNewsCountForPaginationLoaded", pageInfo);
    },
    changeDateDuration: function(value) {
      this.ruleForm.timeDuration = value;
      let changedDate = new Date(value);
      changedDate.setHours(0);
      changedDate.setMinutes(0);
      changedDate.setSeconds(0);
      let pageInfo = {
        changedCountryName: this.ruleForm.countryName,
        changedCityName: this.ruleForm.cityName,
        startDurationDate: Number(changedDate.getTime() / 1000),
        endDurationDate: Number(new Date().getTime() / 1000),
        orderDirection: "desc"
      };
      this.$store.dispatch("getNewsTableData", pageInfo);
      this.$store.dispatch("onTotalNewsCountForPaginationLoaded", pageInfo);
    },
    changeNewsSearchText: debounce(function(value) {
      let pageInfo = {
        searchText: value
      };
      this.$store.dispatch("onNewsSearchTextChanged", pageInfo);
      this.$store.dispatch("onTotalNewsCountForPaginationLoaded", pageInfo);
    }, 1000)
  }
};
</script>
