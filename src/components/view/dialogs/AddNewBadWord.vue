<template>
  <el-form :model="ruleForm" :show-message="false" :rules="rules" ref="ruleForm" class="border-bottom">
    <el-dialog title="Add a new word" :visible.sync="getModalWindowStatus" :show-close="false" :close-on-press-escape="false" :close-on-click-modal="false" >
      <div class="is-clearfix mx-5">
        <el-form-item label="Add Word" label-position="top" prop="newWord">
          <el-input v-model="ruleForm.newWord" autocomplete="off" autofocus placeholder="Enter word"></el-input>
        </el-form-item>
      </div>
      <span slot="footer" class="dialog-footer is-clearfix">
        <el-button @click.prevent="changeDialogStatus(false)">Cancel</el-button>
        <el-button type="success" @click.prevent="addNewBadWord('ruleForm')"><i class="el-icon-plus"></i> Add</el-button>
      </span>
    </el-dialog>
  </el-form>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      ruleForm: {
        newWord: ""
      },
      rules: {
        newWord: [
          {
            required: true,
            trigger: ["blur", "change"]
          },
          {
            min: 3,
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["getModalWindowStatus"])
  },
  methods: {
    changeDialogStatus: function(value) {
      let setModalStatus = value;
      this.$store.dispatch("onModalStatusChanged", setModalStatus);
    },
    addNewBadWord: function(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let newBadWord = this.ruleForm.newWord;
          this.$store.dispatch("addNewBadWord", newBadWord);
        }
      });
    }
  }
};
</script>