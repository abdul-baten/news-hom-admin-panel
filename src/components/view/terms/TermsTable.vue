<template>
  <el-main class="is-fullwidth">
    <div class="is-clearfix">
      <div class="main-container">
        <div class="container">
          <div class="columns is-centered is-clearfix">
            <div class="column is-10">
              <el-card class="box-card p-5">
                <h1 class="title is-5 has-text-centered">Terms & Condition</h1>
                <el-form status-icon>
                  <div class="field">
                    <div class="control">
                      <vue-editor v-model="content" :editorToolbar="customToolbar"></vue-editor>
                    </div>
                  </div>
                  <div class="field mt-2">
                    <div class="control">
                      <div class="columns is-centered is-clearfix">
                        <div class="column is-4">
                          <el-button size="large" class="w-100" type="primary" @click.prevent="updateData">Update Now</el-button>
                        </div>
                      </div>
                    </div>
                  </div>
                </el-form>
              </el-card>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-main>
</template>

<script>
import Header from "@/components/shared/header/_Header";
import Sidebar from "@/components/shared/sidebar/_Sidebar";
import { VueEditor } from "vue2-editor";

import firebase from "firebase";
import db from "@/plugins/firebase/init";

export default {
  components: {
    Header,
    Sidebar,
    VueEditor
  },
  data() {
    return {
      content: "",
      customToolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link"]
      ]
    };
  },
  created() {
    var self = this;
    db.collection("content")
      .doc("static")
      .get()
      .then(function(doc) {
        if (doc.exists) {
          self.content = doc.data().terms;
        } else {
          self.content = "";
        }
      });
  },
  methods: {
    getData() {},
    updateData() {
      var docRef = db.collection("content").doc("static");
      docRef
        .update({
          terms: this.content
        })
        .then(function() {
          console.log("Document successfully written!");
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
    }
  }
};
</script>
