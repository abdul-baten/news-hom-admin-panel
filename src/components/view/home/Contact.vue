<template>
  <div class="is-clearfix" id="app-contact">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" :show-message="false" label-position="top">
      <div class="field">
        <div class="control">
          <el-form-item label="Your Name" prop="name">
            <el-input v-model="ruleForm.name" size="big" autocomplete="off" placeholder="Enter Your Name"></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="field">
        <div class="control">
          <el-form-item label="Your Email" prop="name">
            <el-input v-model="ruleForm.name" size="big" autocomplete="off" placeholder="Enter Your Email Address"></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="field">
        <div class="control">
          <el-form-item label="Your Message" prop="desc">
            <el-input type="textarea" v-model="ruleForm.desc" :autosize="{ minRows: 4, maxRows: 10}" placeholder="Enter Your Message"></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="field">
        <div class="control">
          <el-form-item>
            <el-button icon="el-icon-upload2" type="danger" size="big" @click.prevent="submitForm('ruleForm')">Submit</el-button>
            <el-button size="big" @click="resetForm('ruleForm')">Reset</el-button>
          </el-form-item>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        email: "",
        desc: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "Please input your name",
            trigger: "blur"
          },
          {
            min: 3,
            message: "Name should be at least 3 characters",
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            message: "Please input your email address",
            trigger: "blur"
          },
          {
            type: "email",
            message: "Email address is not valid",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>