<template>
  <el-main class="is-fullwidth">
    <div class="container-fluid">
      <div class="columns is-multiline my-1">
        <div class="column">
          <UpdateGeneralInfo />
        </div>
        <div class="column">
          <UpdatePassword />
        </div>
      </div>
    </div>
  </el-main>
</template>

<script>
import UpdateGeneralInfo from "@/components/view/profile/UpdateGeneralInfo";
import UpdatePassword from "@/components/view/profile/UpdatePassword";
export default {
  components: {
    UpdateGeneralInfo,
    UpdatePassword
  }
};
</script>
