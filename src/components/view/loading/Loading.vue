<template>
  <div class="is-clearfix">
    <ContentLoader class="content-loader">
      <rect x="0" y="0" rx="3" ry="3" width="100%" height="10" />
      <rect x="20" y="20" rx="3" ry="3" width="90%" height="10" />
      <rect x="20" y="40" rx="3" ry="3" width="70%" height="10" />
      <rect x="0" y="60" rx="3" ry="3" width="100%" height="10" />
      <rect x="20" y="80" rx="3" ry="3" width="80%" height="10" />
      <rect x="20" y="100" rx="3" ry="3" width="60%" height="10" />
    </ContentLoader>
  </div>
</template>

<script>
import { ContentLoader } from "vue-content-loader";
export default {
  components: {
    ContentLoader
  }
};
</script>