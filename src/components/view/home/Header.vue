<template>
  <nav class="navbar is-fixed-top is-transparent px-6 py-2 border-bottom">
    <div class="navbar-brand">
      <a class="navbar-item" href="/">
        <img src="@/assets/images/logo/logo.png" width="140" height="51">
      </a>
      <div class="navbar-burger burger" data-target="navbarExampleTransparentExample">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div id="navbarExampleTransparentExample" class="navbar-menu">
      <div class="navbar-end">
        <a class="navbar-item is-size-7 has-text-weight-bold" href="/">Home</a>
        <a class="navbar-item is-size-7 has-text-weight-bold" href="#app-feature"><span>Feature</span></a>
        <a class="navbar-item is-size-7 has-text-weight-bold" href="#app-screenshot"><span>Screenshot</span></a>
        <a class="navbar-item is-size-7 has-text-weight-bold" href="#app-faq"><span>FAQ</span></a>
        <a class="navbar-item is-size-7 has-text-weight-bold" href="#app-contact"><span>Contact Us</span></a>
        <a class="button is-danger has-color-white is-small is-rounded mt-2 w-100 p-3 px-4 has-text-weight-bold" href="#app-download"><span>Download</span></a>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  mounted() {
    $(document).ready(function() {
      $(".navbar-burger").click(function() {
        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");
      });
    });
  }
};
</script>