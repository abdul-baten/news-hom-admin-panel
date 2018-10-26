<template>
  <div class="container-fluid my-4">
    <div class="is-clearfix container-fluid">
      <el-table :data="news" fit>
        <el-table-column label="Thumbnail" width="100">
          <template slot-scope="scope">
            <figure class="image is-2by1">
              <img v-if="scope.row.newsThumbnail" class="image" :src="scope.row.newsThumbnail">
              <img v-else class="image" src="@/assets/images/news/news_placeholder.png">
            </figure>
          </template>
        </el-table-column>
        <el-table-column label="Title" prop="newsTitle" value="newsTitle" sortable class-name="is-capitalized" width="200"></el-table-column>
        <el-table-column label="Subtitle" prop="newsSubTitle" value="newsSubTitle" sortable class-name="is-capitalized"
          width="200"></el-table-column>
        <el-table-column label="Description" prop="newsDescription" value="newsDescription" sortable class-name="is-capitalized"
          width="200"></el-table-column>
        <el-table-column label="Category" prop="newsType" value="newsType" sortable class-name="is-capitalized" width="150"></el-table-column>
        <el-table-column label="Posted By" prop="username" value="username" sortable class-name="is-capitalized" width="120"></el-table-column>
        <el-table-column label="Posted on" width="120">
          <template slot-scope="scope">
            {{ scope.row.createdAt | dateTimeFormatter }}
          </template>
        </el-table-column>
        <el-table-column label="Country" prop="newsCountry" value="newsCountry" sortable class-name="is-capitalized"
          width="150"></el-table-column>
        <el-table-column label="City" prop="city" value="city" sortable class-name="is-capitalized" width="100"></el-table-column>
        <el-table-column label="Views" prop="viewCount" value="viewCount" sortable width="100"></el-table-column>
        <el-table-column label="Likes" prop="likeCount" value="likeCount" sortable width="100"></el-table-column>
        <el-table-column label="Dislikes" prop="dislikeCount" value="dislikeCount" sortable class-name="is-capitalized"
          width="100"></el-table-column>
        <el-table-column label="Reports" prop="reportCount" value="reportCount" sortable class-name="is-capitalized"
          width="100"></el-table-column>
        <el-table-column label="Shares" prop="shareCount" value="shareCount" sortable class-name="is-capitalized" width="100"></el-table-column>
        <el-table-column label="Comments" prop="commentCount" value="commentCount" sortable width="120"></el-table-column>
        <el-table-column label="Status" prop="newsStatus" value="newsStatus" class-name="is-capitalized" sortable width="150">
          <template slot-scope="scope">
            <el-dropdown size="medium" trigger="click">
              <el-tag size="medium" class="is-capitalized" :type="scope.row.newsStatus === 'published' ? 'success' : 'danger'"
                plain><span>{{ scope.row.newsStatus }}</span></el-tag>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-if="scope.row.newsStatus === 'published'">
                  <p @click.prevent="updateThisNewsStatus(scope.row.newsId, 'unpublished')"><i class="el-icon-edit mr-1"></i><span
                      class="is-capitalized">Unpublish this news</span></p>
                </el-dropdown-item>
                <el-dropdown-item v-else>
                  <p @click.prevent="updateThisNewsStatus(scope.row.newsId, 'published')"><i class="el-icon-edit mr-1"></i><span
                      class="is-capitalized">Publish this news</span></p>
                </el-dropdown-item>
                <el-dropdown-item divided>
                  <router-link :to="`/news/${scope.row.newsId}/${scope.row.newsSlug}`"><i class="el-icon-view mr-1"></i><span
                      class="is-capitalized">View this news</span></router-link>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["news"])
  },
  created() {
    let pageInfo = {
      orderDirection: "desc"
    };
    this.$store.dispatch("totalNewsResultCount");
    this.$store.dispatch("clearLastVisibleNews");
    this.$store.dispatch("getNewsTableData", pageInfo);
    this.$store.dispatch("onTotalNewsCountForPaginationLoaded");
  },
  beforeDestroy() {
    this.$store.dispatch("clearLastVisibleNews");
  },
  methods: {
    updateThisNewsStatus(newsId, newsStatus) {
      const newsStatusInfo = {
        thisNewsId: newsId,
        thisNewsStatus: newsStatus
      };
      this.$store.dispatch("updateThisNewsStatus", newsStatusInfo);
    }
  }
};
</script>