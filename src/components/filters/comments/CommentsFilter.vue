<template>
  <el-form :model="ruleForm" :show-message="false" :rules="rules" ref="ruleForm" class="border-bottom">
    <div class="columns is-clearfix is-multiline my-1">
      <div class="column is-4">
        <el-form-item prop="commentText">
          <el-input suffix-icon="el-icon-search" placeholder="Type to search" clearable v-model.lazy.trim="commentText">
          </el-input>
        </el-form-item>
      </div>
      <div class="column is-4 is-hidden-mobile"></div>
      <div class="column is-2">
        <el-form-item prop="timeDuration">
          <el-select placeholder="Select time" size="big" class="w-100" v-model="ruleForm.timeDuration" @change="changeDateDuration">
            <el-option :value="dateDuration.value" :label="dateDuration.label" v-for="(dateDuration, index) in options" :key="index"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="column is-2 mb-3">
        <el-button icon="el-icon-sort" @click.prevent="resetForm('ruleForm')" type="info" plain class="w-100">Reset</el-button>
      </div>
    </div>
  </el-form>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";
import { debounce } from "debounce";
export default {
  data() {
    return {
      ruleForm: {
        timeDuration: ""
      },
      commentText: null,
      options: [
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
      rules: {
        timeDuration: [
          {
            required: true,
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  watch: {
    commentText: function(value) {
      this.changeSearchTerm(value);
    }
  },
  methods: {
    resetForm(formName) {
      let pageInfo = {
        orderDirection: "desc"
      };
      this.$refs[formName].resetFields();
      this.$store.dispatch("totalCommentResultCount");
      this.$store.dispatch("clearLastVisibleComment");
      this.$store.dispatch("getCommentTableData", pageInfo);
    },
    changeDateDuration: function(value) {
      let changedDate = new Date(value);
      changedDate.setHours(0);
      changedDate.setMinutes(0);
      changedDate.setSeconds(0);
      let pageInfo = {
        startDurationDate: Number(new Date(changedDate).getTime() / 1000),
        endDurationDate: Number(new Date().getTime() / 1000)
      };
      this.$store.dispatch("getCommentTableData", pageInfo);
    },
    changeSearchTerm: debounce(function(value) {
      let pageInfo = {
        searchText: value
      };
      this.$store.dispatch("onCommentSearchTextChanged", pageInfo);
      this.$store.dispatch("getCommentTableData", pageInfo);
    }, 1000)
  }
};
</script>