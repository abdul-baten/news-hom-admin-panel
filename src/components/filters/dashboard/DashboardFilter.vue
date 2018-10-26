<template>
  <el-form :model="ruleForm" :show-message="false" :rules="rules" ref="ruleForm">
    <div class="columns is-clearfix is-multiline">
      <div class="column is-2">
        <el-form-item prop="countryName">
          <el-select placeholder="Country" size="big" class="w-100" v-model="ruleForm.countryName" @change="changeCountryName">
            <el-option :value="countryName" :label="countryName" v-for="countryName in getCountriesNames" :key="countryName"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="column is-2">
        <el-form-item prop="cityName">
          <el-select placeholder="City" size="big" class="w-100" v-model="ruleForm.cityName" @change="changeCityName">
            <el-option :value="cityName" :label="cityName" v-for="cityName in getCitiesNames" :key="cityName"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="column is-3">
        <el-form-item prop="startDate">
          <el-date-picker type="date" placeholder="Pick a start date" v-model="ruleForm.startDate" class="w-100"></el-date-picker>
        </el-form-item>
      </div>
      <div class="column is-3">
        <el-form-item prop="endDate">
          <el-date-picker type="date" placeholder="Pick an end date" v-model="ruleForm.endDate" class="w-100"></el-date-picker>
        </el-form-item>
      </div>
      <!-- <div class="column is-4">
        <div class="columns">
          <div class="column is-4">
            <el-button @click="resetForm('ruleForm')" class="w-100">Reset</el-button>
          </div>
          <div class="column is-8">
            <el-button icon="el-icon-sort" @click.prevent="filterDashboardData('ruleForm')" class="w-100" type='primary'>Filter</el-button>
          </div>
        </div>
      </div> -->
      <div class="column is-2">
        <el-button icon="el-icon-sort" @click.prevent="filterDashboardData('ruleForm')" class="w-100" type='primary'>Filter</el-button>
      </div>
    </div>
  </el-form>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      ruleForm: {
        startDate: "",
        endDate: "",
        countryName: "",
        cityName: ""
      },
      rules: {
        startDate: [
          {
            type: "date",
            required: true,
            trigger: ["blur", "change"]
          }
        ],
        endDate: [
          {
            type: "date",
            required: true,
            trigger: ["blur", "change"]
          }
        ],
        countryName: [
          {
            required: true,
            trigger: ["blur", "change"]
          }
        ],
        cityName: [
          {
            required: true,
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["getCountriesNames", "getCitiesNames"])
  },
  mounted() {
    this.$store.dispatch("getAllCountriesNames");
    this.$store.dispatch("getAllCitiesNames");
  },
  methods: {
    filterDashboardData(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var userActivityInfo = {
            firstDateOfRange: new Date(this.ruleForm.startDate).getTime(),
            lastDateOfRange: new Date(this.ruleForm.endDate).getTime()
          };
          this.$store.dispatch("getUserActivityChart", userActivityInfo);
          this.$refs[formName].resetFields();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    changeCountryName(value) {
      this.countryName = value;
    },
    changeCityName(value) {
      this.cityName = value;
      console.log(this.cityName);
    }
  }
};
</script>