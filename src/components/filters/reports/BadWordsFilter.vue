<template>
  <el-form>
    <div class="is-fullwidth">
      <div class="container-fluid">
        <div class="columns is-clearfix my-1">
          <div class="column is-6">
            <el-form-item prop="searchText">
          <el-input clearable v-model.lazy.trim="badWordSearchText" size="big" placeholder="Type to search word" suffix-icon="el-icon-search"
            class="is-fullwidth"></el-input>
        </el-form-item>
          </div>
          <div class="column is-3 is-hidden-mobile"></div>
          <div class="column is-3 mb-3">
            <el-button icon="el-icon-plus" class="w-100" type='info' @click.prevent="changeDialogStatus(true)">Add Word</el-button>
          </div>
        </div>
      </div>
    </div>
    <AddNewBadWord />
  </el-form>
</template>

<script>
import { debounce } from "debounce";
import AddNewBadWord from "@/components/view/dialogs/AddNewBadWord";
export default {
  components: {
    AddNewBadWord
  },
  data() {
    return {
      badWordSearchText: ""
    };
  },
  watch: {
    badWordSearchText: function(value) {
      this.searchBadWords(value);
    }
  },
  methods: {
    searchBadWords: debounce(function(value) {
      let badWordInfo = {
        searchTerm: value.toLowerCase()
      };
      this.$store.dispatch("getBadWordsDataTable", badWordInfo);
    }, 250),
    changeDialogStatus: function(value) {
      let setModalStatus = value;
      this.$store.dispatch("onModalStatusChanged", setModalStatus);
    }
  }
};
</script>