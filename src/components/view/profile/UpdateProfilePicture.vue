<template>
  <div class="card-content is-flex is-horizontal-center">
    <div class="columns is-mobile is-clearfix">
      <div class="column">
        <figure class="image is-96x96 mx-auto">
          <img v-if="getProfilePictureURL" class="is-rounded is-fullwidth profile-image has-background-light" :src="getProfilePictureURL">
          <img v-else class="is-rounded is-fullwidth profile-image" src="@/assets/images/user/user_profile.png">
        </figure>
        <div class="field mt-3">
          <el-button type="info" size="big" round @click.prevent="changeDialogStatus(true)">Change Profile Picture</el-button>
        </div>
      </div>
    </div>
    <UploadPicture />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import firebase from "firebase";
import db from "@/plugins/firebase/init";
import UploadPicture from "@/components/view/dialogs/UploadPicture";
export default {
  data() {
    return {};
  },
  components: {
    UploadPicture
  },
  computed: {
    ...mapGetters(["getProfilePictureURL"])
  },
  methods: {
    changeDialogStatus: function(value) {
      let setModalStatus = value;
      this.$store.dispatch("onModalStatusChanged", setModalStatus);
    }
  },
  created() {
    var currentUserID = firebase.auth().currentUser.uid;
    this.$store.dispatch("profilePictureURL", currentUserID);
  }
};
</script>

<style scoped>
.profile-image {
  width: 100%;
  height: 100%;
}
</style>
