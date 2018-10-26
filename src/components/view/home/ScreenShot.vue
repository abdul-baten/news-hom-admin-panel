<template>
  <div id="app-screenshot">
    <div class="py-9">
      <div class="is-clearfix">
      <h4 class="title is-2 has-text-centered is-capitalized mb-5 has-text-black home-main-title sub-title">App Screenshots</h4>
    </div>
      <carousel autoplay :perPage='5'>
        <slide class="p-2">
          <figure class="image is-3by5">
            <img src="@/assets/images/screenshot/01.png" class="screenshot-img">
          </figure>
        </slide>
        <slide class="p-2">
          <figure class="image is-3by5">
            <img src="@/assets/images/screenshot/02.png" class="screenshot-img">
          </figure>
        </slide>
        <slide class="p-2">
          <figure class="image is-3by5">
            <img src="@/assets/images/screenshot/03.png" class="screenshot-img">
          </figure>
        </slide>
        <slide class="p-2">
          <figure class="image is-3by5">
            <img src="@/assets/images/screenshot/04.png" class="screenshot-img">
          </figure>
        </slide>
        <slide class="p-2">
          <figure class="image is-3by5">
            <img src="@/assets/images/screenshot/05.png" class="screenshot-img">
          </figure>
        </slide>
      </carousel>
    </div>
  </div>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
export default {
  components: {
    Carousel,
    Slide
  }
};
</script>
