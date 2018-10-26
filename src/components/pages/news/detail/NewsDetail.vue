<template>
  <div class="clearfix">
    <Header />
    <section class="has-background-black">
      <div class="has-text-centered">
        <vue-plyr>
          <video poster="https://firebasestorage.googleapis.com/v0/b/newsroom-197306.appspot.com/o/news%2FRkOb9Tqpdzi5TF1wRVeZ.jpg?alt=media&token=523b96f3-2c6f-4986-bcc8-6835c121f5d7"
            src="https://firebasestorage.googleapis.com/v0/b/newsroom-197306.appspot.com/o/001%20Introduction%20and%20The%20Goal%20of%20This%20Course.mp4?alt=media&token=8536c473-d6d8-467f-a398-c68d79587240">
            <source src="https://firebasestorage.googleapis.com/v0/b/newsroom-197306.appspot.com/o/001%20Introduction%20and%20The%20Goal%20of%20This%20Course.mp4?alt=media&token=8536c473-d6d8-467f-a398-c68d79587240"
              type="video/mp4" size="720">
            <source src="https://firebasestorage.googleapis.com/v0/b/newsroom-197306.appspot.com/o/001%20Introduction%20and%20The%20Goal%20of%20This%20Course.mp4?alt=media&token=8536c473-d6d8-467f-a398-c68d79587240"
              type="video/mp4" size="1080">
          </video>
        </vue-plyr>
      </div>
    </section>
    <div class="is-clearfix has-background-light box-shadow">
      <div class="container">
        <div class="is-clearfix py-2">
          <div class="columns is-multiline is-mobile">
            <div class="column is-8">
              <h3 class="title is-4 is-capitalized">{{ singleNewsTitle }}</h3>
            </div>
            <div class="column">
              <h3 class="subtitle is-7 mt-1 is-capitalized has-text-right">{{ singleNewsPostTime }}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="is-clearfix">
      <div class="container">
        <div class="columns is-multiline is-mobile">
          <div class="column is-8">
            <div class="is-clearfix border-bottom pb-3">
              <div class="columns is-mobile">
                <div class="column is-4">
                  <div class="columns is-mobile">
                    <div class="column is-6" style="margin-top: 12px !important;">
                      <p class="is-size-6 is-capitalized has-text-grey">{{ singleNewsViewCount }} Views</p>
                    </div>
                    <div class="column is-3">
                      <el-popover placement="top-start" title="Like this news?" width="300" trigger="click" content="Download the app to make your opinion count.">
                        <el-button type="text" size="mini" slot="reference">
                          <ThumbUpIcon title="" class="has-text-success abc mb-1" />
                          <span class="is-size-6 is-uppercase has-text-grey is-hidden-mobile" style="vertical-align: super;">{{
                            singleNewsLikeCount }}</span>
                        </el-button>
                      </el-popover>
                    </div>
                    <div class="column is-3">
                      <el-popover placement="top-start" title="Don't like this news?" width="300" trigger="click"
                        content="Download the app to make your opinion count.">
                        <el-button type="text" size="mini" slot="reference">
                          <ThumbDownIcon title="" class="has-text-danger abc mb-1" />
                          <span class="is-size-6 is-uppercase has-text-grey is-hidden-mobile" style="vertical-align: super;">{{
                            singleNewsDislikeCount
                            }}</span>
                        </el-button>
                      </el-popover>
                    </div>
                  </div>
                </div>
                <div class="column">
                  <div class="field is-grouped is-pulled-right">
                    <div class="control mr-5">
                      <el-popover placement="top-start" title="Need to report the news?" width="300" trigger="click"
                        content="Download the app to make your opinion count.">
                        <el-button type="text" size="mini" class="pt-3 pb-2" slot="reference">
                          <FlagVariantIcon title="" class="is-size-4 has-text-success mtm-1" style="vertical-align: middle" />
                          <span class="is-uppercase is-hidden-mobile">Report as inappropriate</span>
                        </el-button>
                      </el-popover>
                    </div>
                    <div class="control has-text-right">
                      <el-dropdown size="medium" trigger="click">
                        <el-button type="info" plain size="mini">
                          <ShareIcon title="" class="is-size-4 has-text-success mb-1" style="vertical-align: middle;" />
                          <span class="is-uppercase is-hidden-mobile" style="vertical-align: middle;">Share</span>
                        </el-button>


                        <el-dropdown-menu slot="dropdown">
                          <social-sharing :url="this.$route.fullpath" inline-template>
                            <div>
                              <el-dropdown-item>
                                <network network="facebook">
                                  Facebook
                                </network>
                              </el-dropdown-item>
                              <el-dropdown-item>
                                <network network="googleplus">
                                  <i class="fa fa-fw fa-google-plus"></i> Google +
                                </network>
                              </el-dropdown-item>
                              <el-dropdown-item>
                                <network network="linkedin">
                                  <i class="fa fa-fw fa-linkedin"></i> LinkedIn
                                </network>
                              </el-dropdown-item>
                              <el-dropdown-item>
                                <network network="pinterest">
                                  <i class="fa fa-fw fa-pinterest"></i> Pinterest
                                </network>
                              </el-dropdown-item>
                              <el-dropdown-item>
                                <network network="reddit">
                                  <i class="fa fa-fw fa-reddit"></i> Reddit
                                </network>
                              </el-dropdown-item>
                              <el-dropdown-item>
                                <network network="whatsapp">
                                  <i class="fa fa-fw fa-whatsapp"></i> Whatsapp
                                </network>
                              </el-dropdown-item>
                            </div>
                          </social-sharing>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="is-clearfix mt-3">
              <div class="is-clearfix border-bottom">
                <div v-if="singleNewsUserName">
                  <div class="columns is-multiline is-clearfix pb-3">
                    <div class="column is-10">
                      <div class="is-clearfix">
                        <article class="media">
                          <figure class="media-left">
                            <p class="image is-48x48">
                              <img class="is-rounded" v-if="singleNewsUserImage" :src="singleNewsUserImage">
                              <img class="is-rounded" v-else src="@/assets/images/user/user_profile.png">
                            </p>
                          </figure>
                          <div class="media-content">
                            <div class="content">
                              <h3 class="title is-5 is-capitalized">{{ singleNewsUserName }}</h3>
                              <h3 class="subtitle is-size-8 is-capitalized has-text-weight-semibold">{{
                                singleNewsUserFollowers }} Followers</h3>
                            </div>
                          </div>
                        </article>
                      </div>
                    </div>
                    <div class="column is-2">
                      <el-popover placement="top-start" title="Want to follow this user?" width="300" trigger="click"
                        content="Download the app to follow this user.">
                        <el-button type="danger" size="big" class="w-100 is-uppercase py-3" slot="reference">Follow</el-button>
                      </el-popover>
                    </div>
                  </div>
                </div>
                <div class="is-clearfix">
                  <!-- <vue-content-loading width="100%" :height="100">
                    <circle cx="30" cy="30" r="30" />
                    <rect x="75" y="13" rx="4" ry="4" width="100" height="10" />
                    <rect x="75" y="37" rx="4" ry="4" width="50" height="10" />
                  </vue-content-loading> -->
                </div>
              </div>
            </div>
            <div class="is-clearfix mt-3">
              <div class="is-clearfix" v-if="singleNewsCommentDetailsInfo.length > 0">
                <article class="media" v-for="commentInfo of singleNewsCommentDetailsInfo" :key="commentInfo.id">
                  <figure class="media-left">
                    <p class="image is-32x32">
                      <img class="is-rounded" v-if="commentInfo.singleNewsCommentUserPicture" :src="commentInfo.singleNewsCommentUserPicture">
                      <img class="is-rounded" v-else src="@/assets/images/user/user_profile.png">
                    </p>
                  </figure>
                  <div class="media-content">
                    <div class="content">
                      <h3 class="title is-6 is-capitalized">{{ commentInfo.singleNewsCommentUserName }} <span class="ml-2 is-size-7 has-text-grey has-text-weight-normal">{{
                          commentInfo.singleNewsCommentDate }}</span></h3>
                      <p class="is-size-8 mtm-2">{{ commentInfo.singleNewsCommentText }}</p>
                    </div>
                  </div>
                </article>
              </div>
              <div class="is-clearfix" v-else>
                <!-- <vue-content-loading width="100%">
                  <circle cx="20" cy="30" r="20" />
                  <rect x="55" y="13" rx="4" ry="4" width="100" height="10" />
                  <rect x="55" y="37" rx="4" ry="4" width="50" height="10" />
                </vue-content-loading> -->
              </div>
            </div>
          </div>
          <div class="column is-4">
            <div class="ui placeholder">
              <div class="paragraph">
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
              </div>
              <div class="paragraph">
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
              </div>
            </div>
            <div class="is-clearfix my-5 box" id="app-download">
              <h1 class="title has-text-centered is-5">Download App</h1>
              <DownloadSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";
import Header from "@/components/shared/header/_Header";
import db from "@/plugins/firebase/init";
import ThumbUpIcon from "vue-material-design-icons/ThumbUp";
import ThumbDownIcon from "vue-material-design-icons/ThumbDown";
import FlagVariantIcon from "vue-material-design-icons/FlagVariant";
import ShareIcon from "vue-material-design-icons/Share";
import jump from "jump.js";
import DownloadSection from "@/components/view/home/DownloadSection";
// import VueContentLoading from "vue-content-loading";
export default {
  data() {
    return {
      singleNewsTitle: "",
      singleNewsPostTime: "",
      singleNewsViewCount: 0,
      singleNewsLikeCount: 0,
      singleNewsDislikeCount: 0,
      singleNewsUserId: null,
      singleNewsUserName: "",
      singleNewsUserImage: "",
      singleNewsUserFollowers: 0,
      singleNewsCommentUserImage: "",
      singleNewsCommentText: "",
      singleNewsCommentDetailsInfo: []
    };
  },
  components: {
    Header,
    ThumbUpIcon,
    ThumbDownIcon,
    FlagVariantIcon,
    ShareIcon,
    DownloadSection
    // VueContentLoading
  },
  created() {
    this.getNewsInformationBasedOnId();
  },
  methods: {
    getNewsInformationBasedOnId() {
      var self = this;
      var thisNewsId = this.$route.params.newsId;
      var newsInfoDbRef = db
        .collection("news")
        .doc(thisNewsId)
        .get()
        .then(function(doc) {
          self.singleNewsTitle = doc.data().title;
          self.singleNewsPostTime = doc.data().createdAt;
          self.singleNewsViewCount = doc.data().viewCount;
          self.singleNewsLikeCount = doc.data().likeCount;
          self.singleNewsDislikeCount = doc.data().dislikeCount;
          self.singleNewsUserId = doc.data().postedBy;

          var userId = self.singleNewsUserId;
          return userId;
        })
        .then(userId => {
          var singleNewsUserDbRef = db.collection("users").doc(userId);
          singleNewsUserDbRef.get().then(function(doc) {
            self.singleNewsUserName = doc.data().name;
            self.singleNewsUserImage = doc.data().picture;
            self.singleNewsUserFollowers = doc.data().followerCount;
          });
          var currentNewsId = this.$route.params.newsId;
          return currentNewsId;
        })
        .then(currentNewsId => {
          var singleNewsCommentDbRef = db
            .collection("comments")
            .where("newsId", "==", currentNewsId)
            .orderBy("createdAt", "desc")
            .limit(10);
          singleNewsCommentDbRef
            .get()
            .then(querySnapShot => {
              console.log(querySnapShot.docs.length);
              if (querySnapShot.docs.length > 0) {
                querySnapShot.forEach(element => {
                  var singleNewsCommentInfo = {
                    singleNewsCommentText: element.data().text,
                    singleNewsCommentDate: moment(
                      element.data().createdAt
                    ).fromNow(),
                    singleNewsCommentUserId: element.data().userId,
                    singleNewsCommentUserName: "",
                    singleNewsCommentUserPicture: ""
                  };
                  self.singleNewsCommentDetailsInfo.push(singleNewsCommentInfo);
                });
              }
            })
            .then(() => {
              self.singleNewsCommentDetailsInfo.forEach(userId => {
                db.collection("users")
                  .doc(userId.singleNewsCommentUserId)
                  .get()
                  .then(function(doc) {
                    userId.singleNewsCommentUserName = doc.data().name;
                    userId.singleNewsCommentUserPicture = doc.data().picture;
                  });
              });
            });
        });
    }
  }
};
</script>


<style scoped>
.abc {
  text-align: center;
  -webkit-align-items: left;
  align-items: left;
  -ms-flex-pack: left;
  -webkit-justify-content: left;
  justify-content: left;
  position: relative;
  vertical-align: text-bottom;
  stroke: none;
  width: 24px;
  height: 24px;
  font-size: 22px;
}
</style>