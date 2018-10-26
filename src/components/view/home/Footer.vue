<template>
  <div class="background py-9">
    <div class="is-clearfix has-text-centered">
      <div class="is-clearfix">
      <h4 class="title is-2 has-text-centered is-capitalized mb-4 has-text-black home-main-title sub-title">Get In Touch</h4>
    </div>
    </div>
    <div class="container">
      <div class="columns is-clearfix">
        <div class="column is-7">
          <ContactSection />
        </div>
        <div class="column is-5">
          <AddressSection />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ContactSection from "@/components/view/home/Contact";
import AddressSection from "@/components/view/home/Address";
export default {
  components: { ContactSection, AddressSection }
};
</script>
