<template>
  <div class="hero is-fullheight intro">
    <div class="container">
      <div class="columns is-clearfix">
        <div class="column is-6 is-inline">
          <div class="intro-content">
            <h1 class="title is-size-1 has-text-black home-main-title default-title mb-3">Unlimited News Powerful News</h1>
            <p class="subtitle is-size-5 mt-4 sub-heading">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.</p>
            <div class="app-download-area" v-for="data in staticData" :key="data.id">
                <div class="columns">
                  <div class="column is-4">
                    <h4 class="title is-5 home-main-title mt-3"><span class="mr-4 has-text-danger">Download App</span>
              </h4>
                  </div>
                  <div class="column">
                    <span class="mr-4">
                  <a :href="data.iphone" target="_blank">
                    <el-tooltip effect="light" content="Download from Apple Store" placement="bottom-start">
                      <apple-icon class="is-size-2 has-text-link" title="" />
                    </el-tooltip>
                  </a>
                </span>
                <span class="mx-2">
                  <a :href="data.android" target="_blank">
                    <el-tooltip effect="light" content="Download from Google Play" placement="bottom-start">
                      <android-icon class="is-size-3 has-text-success" title="" />
                    </el-tooltip>
                  </a>
                </span>
                  </div>
                </div>
            </div>
          </div>
        </div>
        <div class="column is-6 has-text-right is-hidden-mobile">
          <div class="intro-screen">
            <img src="@/assets/images/mock-main.png" alt="iphone image">
          </div>
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
    var self = this;
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
  },
  methods: {}
};
</script>

<style scoped>
.intro-content {
  display: inline-block;
  flex-grow: 1;
  flex-shrink: 0;
  padding: 5rem 0;
}

@media (max-width: 768px) {
  .intro-content {
    text-align: center;
  }
}

.material-design-icon > .material-design-icon__svg {
  bottom: -0.3em !important;
}
</style>