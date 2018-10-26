<template>
  <el-dialog :show-close="false" :close-on-press-escape="false" :close-on-click-modal="false" :visible.sync="getModalWindowStatus"
    class="w-100">
    <span slot="title">
      <h1 class="title is-6">Change Profile Picture</h1>
    </span>
    <div class="is-clearfix">
      <div v-if="getUploadProgressIndicator > 0 && getUploadProgressIndicator < 100">
        <el-progress :text-inside="true" :stroke-width="18" :percentage="getUploadProgressIndicator" status="success"></el-progress>
      </div>
    </div>
    <div class="is-clearfix">
      <div class="field">
        <div class="file is-large is-boxed is-centered my-4">
          <label class="file-label">
            <input class="file-input is-invisible" type="file" accept="images/*" @change="onPictureChange">
            <span class="file-cta p-5">
              <span class="file-icon has-text-success">
                <i class="el-icon-upload2"></i>
              </span>
              <span class="file-label">
                Upload Profie Picture
              </span>
            </span>
          </label>
        </div>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click.prevent="changeDialogStatus(false)">Cancel</el-button>
      <el-button icon="el-icon-upload2" type="success" @click.prevent="dialogVisible" :loading="getUploadProgressIndicator > 0 && getUploadProgressIndicator < 100">Upload</el-button>
    </div>
  </el-dialog>
</template>

<script>
import firebase from "firebase";
import db from "@/plugins/firebase/init";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      imageName: null
    };
  },
  computed: {
    ...mapGetters(["getModalWindowStatus", "getUploadProgressIndicator"])
  },
  methods: {
    changeDialogStatus: function(value) {
      let setModalStatus = value;
      this.$store.dispatch("onModalStatusChanged", setModalStatus);
    },
    onPictureChange(event) {
      this.imageName = event.target.files[0];
    },
    dialogVisible() {
      if (!this.imageName) {
        return;
      }
      var splitImageName = this.imageName.name;
      var currentUserID = firebase.auth().currentUser.uid;
      var renameFilename =
        currentUserID + "." + splitImageName.split(".").pop();

      var pictureInformation = {
        image: this.imageName,
        renamedPicture: renameFilename,
        currentUID: currentUserID
      };

      var storageRef = firebase.storage().ref();
      var childRef = storageRef.child("users/" + renameFilename);

      if (childRef.exists) {
        childRef
          .delete()
          .then(function() {
            this.$store
              .dispatch("uploadProfilePicture", pictureInformation)
              .then(success => {
                this.$store.dispatch("profilePictureURL", currentUserID);
                this.imageName = null;
              });
          })
          .catch(function(error) {});
      } else {
        this.$store
          .dispatch("uploadProfilePicture", pictureInformation)
          .then(success => {
            this.$store.dispatch("profilePictureURL", currentUserID);
            this.imageName = null;
          });
      }
    }
  }
};
</script>

<style scoped>
/* .upload-indicator {
  position: absolute;
  top: 60px;
  left: 0;
  width: 100%;
  right: 0;
} */
</style>
