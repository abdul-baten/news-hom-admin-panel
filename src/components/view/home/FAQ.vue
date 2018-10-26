<template>
  <div id="app-faq">
    <div class="container py-9">
    <div class="is-clearfix">
      <h4 class="title is-2 has-text-centered is-capitalized mb-5 has-text-black home-main-title sub-title">Frequently Asked Questions</h4>
    </div>
    <div class="is-clearfix">
      <el-collapse v-model="activeName" accordion v-for="content in contents" :key="content.id">
          <el-collapse-item title="What is our Terms and Condition?" name="1">
            <div v-html="content.terms"></div>
          </el-collapse-item>
          <el-collapse-item title="What is our Policy regarding Privacy?" name="2">
            <div v-html="content.privacy"></div>
          </el-collapse-item>
        </el-collapse>
    </div>
  </div>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "@/plugins/firebase/init";

export default {
  data() {
    return {
      activeName: "1",
      contents: []
    };
  },
  created() {
    var documentReference = db.collection("content");
    documentReference.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        let data = {
          privacy: doc.data().privacy,
          terms: doc.data().terms
        };
        this.contents.push(data);
      });
    });
  }
};
</script>
