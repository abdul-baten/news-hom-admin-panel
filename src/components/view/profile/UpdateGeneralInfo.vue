<template>
  <el-card class="box-card">
    <div class="is-clearfix">
      <h1 class="title is-6 has-text-centered mt-4 border-bottom pb-4">General Info</h1>
        <div class="is-clearfix">
          <UpdateProfilePicture />
        </div>
        <div class="columns is-centered is-clearfix is-multiline is-mobile mb-4">
          <div class="column is-9">
            <el-form :model="updateGeneralInfo" :show-message="false" :rules="rules" ref="updateGeneralInfo">
              <div class="field">
                <div class="control">
                  <el-form-item prop="name">
                    <el-input type="text" placeholder="Name" size="big" v-model="updateGeneralInfo.name" auto-complete="off"></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <el-form-item prop="email">
                    <el-input type="email" placeholder="Email" size="big" v-model="updateGeneralInfo.email"
                      auto-complete="off"></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <el-form-item prop="phone">
                    <el-input type="text" placeholder="Phone" size="big" v-model="updateGeneralInfo.phone"></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <el-form-item prop="bio">
                    <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 20}" placeholder="Describe Yourself" v-model="updateGeneralInfo.bio"></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <el-form-item>
                    <el-button size="big" class="w-100" type="primary" :loading="getIfFormSubmitted" @click.prevent="updateProfileInfo('updateGeneralInfo')">Update
                      Profile</el-button>
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
import { mapGetters } from "vuex";
import UpdateProfilePicture from "@/components/view/profile/UpdateProfilePicture";
import firebase from "firebase";
import db from "@/plugins/firebase/init";
export default {
  data() {
    return {
      updateGeneralInfo: {
        name: "",
        email: "",
        phone: "",
        bio: ""
      },
      rules: {
        name: [
          {
            required: true,
            trigger: ["blur", "change"]
          },
          {
            min: 6,
            trigger: ["blur", "change"]
          }
        ],
        email: [
          {
            required: true,
            trigger: ["blur", "change"]
          },
          {
            type: "email",
            trigger: ["blur", "change"]
          }
        ],
        phone: [
          {
            required: true,
            trigger: ["blur", "change"]
          }
        ],
        bio: [
          {
            required: true,
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  components: {
    UpdateProfilePicture
  },
  computed: {
    ...mapGetters(["getIfFormSubmitted"])
  },
  created() {
    var self = this;
    var currentUserID = firebase.auth().currentUser.uid;
    var dbRef = db.collection("users").doc(currentUserID);
    dbRef.get().then(function(doc) {
      self.updateGeneralInfo.name = doc.data().name;
      self.updateGeneralInfo.email = doc.data().email;
      self.updateGeneralInfo.phone = doc.data().phone;
      self.updateGeneralInfo.bio = doc.data().bio;
    });
  },
  methods: {
    updateProfileInfo(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let profileData = {
            name: this.updateGeneralInfo.name,
            email: this.updateGeneralInfo.email,
            phone: this.updateGeneralInfo.phone,
            bio: this.updateGeneralInfo.bio
          };
          this.$store.dispatch("updateProfileInformation", profileData);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
