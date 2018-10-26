<template>
  <div class="container-fluid my-4">
    <div class="is-clearfix container-fluid">
      <el-table :data="comments" fit>
        <el-table-column label="News Thumbnail" width="150">
          <template slot-scope="scope">
            <figure class="image is-2by1">
              <img v-if="scope.row.commentNewsThumbnail" class="image" :src="scope.row.commentNewsThumbnail">
              <img v-else class="image" src="@/assets/images/comments/comment_placeholder.png">
            </figure>
          </template>
        </el-table-column>
        <el-table-column label="News Type" prop="commentNewsType" value="commentNewsType" class-name="is-capitalized"
          sortable width="120"></el-table-column>
        <el-table-column label="Commented By" prop="commentUserName" value="commentUserName" class-name="is-capitalized"
          sortable width="150"></el-table-column>
        <el-table-column label="Country" prop="commentNewsCountry" value="commentNewsCountry" class-name="is-capitalized"
          sortable width="150"></el-table-column>
        <el-table-column label="City" prop="commentNewsCity" value="commentNewsCity" class-name="is-capitalized"
          sortable width="100"></el-table-column>
        <el-table-column label="Comments" prop="commentText" value="commentText" class-name="is-capitalized" width="290"></el-table-column>
        <el-table-column label="Commented on" width="120">
          <template slot-scope="scope">
            {{ scope.row.commentPostDate | dateTimeFormatter }}
          </template>
        </el-table-column>
        <el-table-column label="Status" prop="commentStatus" value="commentStatus" class-name="is-capitalized" sortable
          width="150">
          <template slot-scope="scope">
            <el-dropdown size="medium" trigger="click">
              <el-tag size="medium" class="is-capitalized" :type="scope.row.commentStatus === 'published' ? 'success' : 'danger'"
                plain>{{ scope.row.commentStatus }}</el-tag>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-if="scope.row.commentStatus === 'published'">
                  <p @click.prevent="changeCommentStatus(scope.row.commentId, 'unpublished')"><i class="el-icon-circle-close-outline mr-1"></i>
                    <span class="is-capitalized">Unpublish Comment</span></p>
                </el-dropdown-item>
                <el-dropdown-item v-else>
                  <p @click.prevent="changeCommentStatus(scope.row.commentId, 'published')"><i class="el-icon-circle-close-outline mr-1"></i>
                    <span class="is-capitalized">Publish Comment</span></p>
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
    ...mapGetters(["comments"])
  },
  created() {
    this.$store.dispatch("totalCommentResultCount");
    this.$store.dispatch("clearLastVisibleComment");
    this.$store.dispatch("getCommentTableData");
  },
  beforeDestroy() {
    this.$store.dispatch("clearLastVisibleComment");
  },
  methods: {
    changeCommentStatus(commentId, changeStatus) {
      let thisCommentId = commentId;
      let thisCommentChangeStatus = changeStatus;
      const commentStatusInfo = {
        commentId: thisCommentId,
        changeStatus: thisCommentChangeStatus
      };
      this.$store.dispatch("changeThisCommentStatus", commentStatusInfo);
    }
  }
};
</script>