<template>
  <div class="is-clearfix">
    <div class="is-clearfix mb-4">
      <h1 class="title is-6 is-capitalized mb-2">Popularity Meter</h1>
    </div>
    <LikeMeter />
    <DisLikeMeter />
    <FakeMeter />
    <CommentMeter />
  </div>
</template>

<script>
import LikeMeter from "@/components/view/dashboard/meter/like/LikeMeter";
import DisLikeMeter from "@/components/view/dashboard/meter/dislike/DisLikeMeter";
import FakeMeter from "@/components/view/dashboard/meter/fake/FakeMeter";
import CommentMeter from "@/components/view/dashboard/meter/comments/CommentMeter";
export default {
  components: {
    LikeMeter,
    DisLikeMeter,
    FakeMeter,
    CommentMeter
  },
  destroyed() {
    this.$store.dispatch("clearTotalNewsData");
  }
};
</script>