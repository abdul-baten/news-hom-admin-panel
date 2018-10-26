<template>
  <div class="is-clearfix">
    <div class="columns is-gapless is-clearfix is-multiline">
      <div class="sidebar-content is-pulled-left">
        <Sidebar />
      </div>
      <div class="area-content is-pulled-right">
        <Header />
        <el-container class="main-container">
          <el-main class="is-fullwidth">
            <div class="my-2">
              <el-button type="text" icon="el-icon-arrow-left" @click.prevent="goBackWard"> Cancel</el-button>
            </div>
            <div class="columns">
              <div class="column is-8 mx-auto">
                <section class="section">
                  <div class="box">
                    <el-form :show-message="false" :rules="rules">
                      <div class="m-5 is-clearfix">
                        <div class="is-clearfix border-bottom">
                          <el-form-item label="Edit Word" label-position="top" prop="newWord">
                            <el-input v-model.lazy.trim="editThisWord" autocomplete="off" autofocus size="big"></el-input>
                          </el-form-item>
                        </div>
                        <div class="mt-4">
                          <div class="field is-grouped">
                            <div class="control is-hidden-mobile">
                              <el-button @click.prevent="goBackWard">Cancel</el-button>
                            </div>
                            <div class="control">
                              <el-button type="primary" @click.prevent="editThisBadWord"><i class="el-icon-edit"></i>
                                Update</el-button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </el-form>
                  </div>
                </section>
              </div>
            </div>
          </el-main>
        </el-container>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    mapGetters
  } from "vuex";
  import db from '@/plugins/firebase/init'
  import Header from "@/components/shared/header/_Header";
  import Sidebar from "@/components/shared/sidebar/_Sidebar";
  export default {
    name: "EditThisWord",
    data() {
      return {
        editThisWord: '',
        rules: {
          editThisWord: [{
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
    // computed: {
    //   ...mapGetters(["editThisWord"])
    // },
    components: {
      Header,
      Sidebar
    },
    created() {
      var self = this;
      let badWordId = self.$route.params.wordId;
      // this.$store.dispatch("getBadWordInfoById", badWordId);

      db.collection("bad_words")
        .doc(badWordId)
        .get()
        .then(function (doc) {
          self.editThisWord = doc.data().text ? doc.data().text : "";
        });
    },
    methods: {
      goBackWard: function () {
        this.$router.replace({
          path: "/admin/reports/word-list"
        });
      },
      editThisBadWord: function () {
        let badWordInfo = {
          badWordId: this.$route.params.wordId,
          badWordText: this.editThisWord
        };
        this.$store.dispatch("updateThisBadWord", badWordInfo);
      }
    }
  };

</script>
