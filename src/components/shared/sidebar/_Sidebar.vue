<template>
  <div class="sidebar-menu-item is-clearfix">
    <el-menu>
      <el-tooltip class="item" effect="dark" content="Dashboard" placement="right">
        <el-menu-item index="1">
          <router-link to="/admin/dashboard" exact-active-class="active" exact>
            <i class="el-icon-menu"></i>
          </router-link>
        </el-menu-item>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="Users" placement="right">
        <el-menu-item index="2">
          <router-link to="/admin/users" exact-active-class="active" exact>
            <i class="el-icon-news"></i>
          </router-link>
        </el-menu-item>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="News" placement="right">
        <el-menu-item index="3">
          <router-link to="/admin/news" exact-active-class="active" exact>
            <i class="el-icon-document"></i>
          </router-link>
        </el-menu-item>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="Comments" placement="right">
        <el-menu-item index="4">
          <router-link to="/admin/comments" exact-active-class="active" exact>
            <i class="el-icon-edit-outline"></i>
          </router-link>
        </el-menu-item>
      </el-tooltip>
      <el-submenu index="5">
        <template slot="title">
          <el-tooltip class="item" effect="dark" content="Reports" placement="right">
            <i class="el-icon-warning"></i>
          </el-tooltip>
        </template>
        <el-menu-item-group>
          <el-tooltip class="item" effect="dark" content="Active Reports" placement="right">
            <el-menu-item index="5-1">
              <router-link to="/admin/reports" exact-active-class="active" exact>
                <i class="el-icon-success"></i>
              </router-link>
            </el-menu-item>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="Deleted Reports" placement="right">
            <el-menu-item index="5-2">
              <router-link to="/admin/reports/deactive" exact-active-class="active" exact>
                <i class="el-icon-error"></i>
              </router-link>
            </el-menu-item>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="List of Words" placement="right">
            <el-menu-item index="5-3">
              <router-link to="/admin/reports/word-list" exact-active-class="active" exact>
                <i class="el-icon-question"></i>
              </router-link>
            </el-menu-item>
          </el-tooltip>
        </el-menu-item-group>
      </el-submenu>
      <el-tooltip class="item" effect="dark" content="Terms & Condition" placement="right">
        <el-menu-item index="6">
          <router-link to="/admin/terms-and-condition" exact-active-class="active" exact>
            <i class="el-icon-tickets"></i>
          </router-link>
        </el-menu-item>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="Privacy Policy" placement="right">
        <el-menu-item index="7">
          <router-link to="/admin/privacy-policy" exact-active-class="active" exact>
            <i class="el-icon-view"></i>
          </router-link>
        </el-menu-item>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="Settings" placement="right">
        <el-menu-item index="8">
          <router-link to="/admin/settings" exact-active-class="active" exact>
            <i class="el-icon-setting"></i>
          </router-link>
        </el-menu-item>
      </el-tooltip>
    </el-menu>
  </div>
</template>

<style scoped>
.sidebar-menu-item a.active i {
  color: #cc3322;
}
</style>