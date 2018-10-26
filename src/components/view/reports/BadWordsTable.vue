<template>
  <div class="container-fluid my-4">
    <div class="is-clearfix" v-if="badWords.length > 0">
      <el-table :data="badWords" fit>
        <el-table-column prop="wordText" label="Text" class-name="is-capitalized" sortable>
        </el-table-column>
        <el-table-column prop="wordCreatedAt" label="Created At" sortable>
          <template slot-scope="scope">
            {{ scope.row.wordCreatedAt | dateTimeFormatter}}
          </template>
        </el-table-column>
        <el-table-column prop="wordUpdatedAt" label="Updated At" sortable>
          <template slot-scope="scope">
            {{ scope.row.wordUpdatedAt | dateTimeFormatter}}
          </template>
        </el-table-column>
        <el-table-column prop="address" label="Action">
          <template slot-scope="scope">
            <el-button size="medium" @click.prevent="editThisBadWord(scope.row.wordId)">Edit</el-button>
            <el-button size="medium" type="danger" @click.prevent="deleteThisBadWord(scope.row.wordId)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-else>
      <div class="my-5 is-centered has-text-centered">
        <ContentLoader />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ContentLoader from "@/components/view/loading/Loading";
export default {
  components: {
    ContentLoader
  },
  computed: {
    ...mapGetters(["badWords"])
  },
  created() {
    let badWordInfo = {
        searchTerm: null
      }
      this.$store.dispatch("getBadWordsDataTable", badWordInfo);
  },
  beforeDestroy() {
    this.$store.dispatch("clearBadWordsData");
  },
  methods: {
    editThisBadWord: function(wordId) {
      this.$router.replace(`/admin/reports/word-list/edit/${wordId}`)
    },
    deleteThisBadWord: function(badWordId) {
      let thisBadWord = {
        wordId: badWordId
      }
      this.$store.dispatch("deleteThisBadWord", thisBadWord);
    }
  }
};
</script>