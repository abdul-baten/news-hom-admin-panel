<template>
  <div class="is-clearfix">
    <div class="has-text-centered" v-for="data in staticData" :key="data.id">
        <div class="columns">
          <div class="column">
            <span class="mx-4 is-pulled-right">
              <a :href="data.iphone" target="_blank">
                <el-tooltip effect="light" content="Download from Apple Store" placement="bottom-start">
                  <apple-icon class="is-size-1 has-text-link" title="" />
                </el-tooltip>
                <h1 class="title is-6 mt-3">iOS</h1>
              </a>
            </span>
          </div>
          <div class="column">
            <span class="mx-4 is-pulled-left">
              <a :href="data.android" target="_blank">
                <el-tooltip effect="light" content="Download from Google Play" placement="bottom-start">
                  <android-icon class="is-size-1 has-text-success" />
                </el-tooltip>
                <h1 class="title is-6 mt-3">Android</h1>
              </a>
            </span>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "@/plugins/firebase/init";
import AppleIcon from "vue-material-design-icons/Apple";
import AndroidIcon from "vue-material-design-icons/Android";
export default {
  data() {
    return {
      staticData: []
    };
  },
  components: {
    AppleIcon,
    AndroidIcon
  },
  created() {
    var documentReference = db.collection("download");
    documentReference.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        let data = {
          android: doc.data().android,
          iphone: doc.data().iphone
        };
        this.staticData.push(data);
      });
    });
  }
};
</script>