<template>
  <div class="is-clearfix">
    <Header/>
    <Intro/>
    <Feature/>
    <ScreenShot/>
    <Download/>
    <FAQ/>
    <Footer/>
  </div>
</template>

<script>
import Header from "@/components/view/home/Header";
import Intro from "@/components/view/home/Intro";
import Feature from "@/components/view/home/Features";
import Download from "@/components/view/home/Download";
import ScreenShot from "@/components/view/home/ScreenShot";
import FAQ from "@/components/view/home/FAQ";
import Footer from "@/components/view/home/Footer";

export default {
  components: {
    Header,
    Intro,
    Feature,
    Download,
    ScreenShot,
    FAQ,
    Footer
  }
};
</script>
