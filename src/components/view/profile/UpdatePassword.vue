<template>
  <el-card class="box-card">
    <h1 class="title is-6 has-text-centered mt-4 pb-4 border-bottom">Protect Yourself</h1>
    <div class="is-clearfix">
      <div class="card-content is-flex is-horizontal-center">
        <div class="columns is-mobile is-clearfix">
          <div class="column">
            <div class="protect-icon">
              <i class="icon is-large el-icon-setting"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="columns is-centered is-clearfix is-multiline is-mobile my-4">
        <div class="column is-8">
          <el-form :model="updatePassword" :rules="rules" :show-message="false" ref="updatePassword">
            <div class="field">
              <div class="control">
                <el-form-item prop="newPassword">
                  <el-input type="password" placeholder="New Password" size="big" v-model="updatePassword.newPassword"
                    auto-complete="off"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="field">
              <div class="control">
                <el-form-item prop="confirmPassword">
                  <el-input type="password" placeholder="Confirm Password" size="big" v-model.number="updatePassword.confirmPassword"
                    auto-complete="off"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="field">
              <div class="control">
                <el-form-item>
                  <el-button size="big" class="w-100" type="primary" :loading="isSubmitted" @click.prevent="changePassword('updatePassword')">Update
                    Password</el-button>
                </el-form-item>
              </div>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import axios from "axios";
import firebase from "firebase";
import router from "@/router/index";
export default {
  data() {
    var validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please input the password"));
      } else {
        if (this.updatePassword.confirmPassword !== "") {
          this.$refs.updatePassword.validateField("confirmPassword");
        }
        callback();
      }
    };
    var validateConfirmPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please input the password again"));
      } else if (value !== this.updatePassword.newPassword) {
        callback(new Error("Passwords do not match!"));
      } else {
        callback();
      }
    };
    return {
      updatePassword: {
        newPassword: "",
        confirmPassword: ""
      },
      isSubmitted: false,
      rules: {
        newPassword: [
          {
            validator: validatePassword,
            trigger: ["blur", "change"]
          }
        ],
        confirmPassword: [
          {
            validator: validateConfirmPassword,
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  methods: {
    changePassword(formName) {
      let self = this;
      self.isSubmitted = true;
      this.$refs[formName].validate(valid => {
        if (valid) {
          let currentUser = firebase.auth().currentUser;
          let newPassword = this.updatePassword.newPassword;
          currentUser.updatePassword(newPassword).then(function() {
            setTimeout(() => {
              self.isSubmitted = false;
              self.$notify({
                title: "Success",
                message: "Password updated successfully",
                type: "success"
              });
              router.push({
                path: "/auth/login",
                query: { passChanged: "true" }
              });
            }, 1000);
          });
          // axios
          //   .post(
          //     "https://www.googleapis.com/identitytoolkit/v3/relyingparty/setAccountInfo?key=AIzaSyCVBcWw70-_TyeGHvNw69-cafaSzQ88LCU",
          //     {
          //       idToken: currentIdToken,
          //       password: this.updatePassword.newPassword,
          //       returnSecureToken: true
          //     }
          //   )
          //   .then(response => {
          //     setTimeout(() => {
          //       this.isSubmitted = false;
          //       this.$notify({
          //         title: "Success",
          //         message: "Password updated successfully",
          //         type: "success"
          //       });
          //       router.push({
          //         path: "/auth/login",
          //         query: { passChanged: "true" }
          //       });
          //     }, 1000);
          //   });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.protect-icon {
  width: 96px;
  height: 96px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 50%;
}

.protect-icon i {
  vertical-align: middle;
  display: inline-block;
  font-size: 30px;
  margin: 30px 0;
}
</style>
