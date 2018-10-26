<template>
  <div class="background" id="app-download">
    <div class="container is-clearfix py-9">
      <div class="is-clearfix">
        <h4 class="title is-2 has-text-centered is-capitalized mb-4 has-text-black home-main-title sub-title">Download
          the app</h4>
      </div>
      <DownloadSection />
    </div>
  </div>
</template>

<script>
import DownloadSection from "@/components/view/home/DownloadSection";
export default {
  components: {
    DownloadSection
  }
};
</script>