<template>
  <div class="container-fluid my-4">
    <div class="is-clearfix container-fluid">
      <el-table :data="users" fit>
        <div class="is-clearfix">
          <el-table-column label="Role" prop="userRole" value="userRole" sortable width="120">
            <template slot-scope="scope">
              <el-dropdown size="medium" trigger="click">
                <el-tag size="medium" class="is-capitalized" plain v-if="scope.row.userRole === 'user'"> {{
                  scope.row.userRole }}</el-tag>
                <el-tag size="medium" class="is-capitalized" type="warning" plain v-else-if="scope.row.userRole === 'moderator'">
                  {{
                  scope.row.userRole }}</el-tag>
                <el-tag size="medium" class="is-capitalized" type="success" plain v-else> {{
                  scope.row.userRole }}</el-tag>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-if="loggedInUserRole !== 'moderator' && loggedInUserRole !== 'user'">
                    <p @click.prevent="changeUserRole(scope.row.uid, 'admin')"><span class="is-capitalized">
                        <AccountStarIcon /> Change role to
                        Admin</span></p>
                  </el-dropdown-item>
                  <el-dropdown-item divided v-if="loggedInUserRole !== 'user'">
                    <p @click.prevent="changeUserRole(scope.row.uid, 'moderator')"><span class="is-capitalized">
                        <AccountPlusIcon /> Change role to
                        Moderator</span></p>
                  </el-dropdown-item>
                  <el-dropdown-item divided v-if="loggedInUserRole !== 'user'">
                    <p @click.prevent="changeUserRole(scope.row.uid, 'user')"><span class="is-capitalized">
                        <AccountMinusIcon /> Change role to
                        User</span></p>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
          <el-table-column label="Thumbnail" width="100">
            <template slot-scope="scope">
              <figure class="image is-32x32">
                <img v-if="scope.row.picture" class="image is-rounded" :src="scope.row.picture">
                <img v-else class="image is-rounded" src="@/assets/images/user/user_profile.png">
              </figure>
            </template>
          </el-table-column>
          <el-table-column label="Name" sortable prop="name" value="name" class-name="is-capitalized" width="120"></el-table-column>
          <el-table-column label="Email" prop="email" value="email" sortable width="200"></el-table-column>
          <div class="column">
            <el-table-column label="Bio" value="bio" prop="bio" sortable width="200"></el-table-column>
            <el-table-column label="Joined" value="bio" prop="bio" sortable width="120">
              <template slot-scope="scope">
                {{ scope.row.joined | dateTimeFormatter }}
              </template>
            </el-table-column>
            <el-table-column label="News" value="newsCount" prop="newsCount" sortable width="100"></el-table-column>
            <el-table-column label="Likes" prop="follower" value="follower" sortable width="100"></el-table-column>
            <el-table-column label="Reported" prop="follower" value="follower" sortable width="100"></el-table-column>
            <el-table-column label="Follower" prop="follower" value="follower" sortable width="100"></el-table-column>
            <el-table-column label="Following" prop="following" value="following" sortable width="120"></el-table-column>
            <el-table-column label="Status" prop="status" value="status" sortable width="120">
              <template slot-scope="scope">
                <el-dropdown size="medium" trigger="click">
                  <el-tag size="medium" class="is-capitalized" :type="scope.row.status === 'active' ? 'success' : 'danger'"
                    plain>{{
                    scope.row.status }}</el-tag>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-if="scope.row.status === 'active'">
                      <p @click.prevent="changeUserStatus(scope.row.uid, 'deactive')"><i class="el-icon-circle-close-outline mr-1"></i><span
                          class="is-capitalized">Deactivate this user</span></p>
                    </el-dropdown-item>
                    <el-dropdown-item v-else>
                      <p @click.prevent="changeUserStatus(scope.row.uid, 'active')"><i class="el-icon-circle-close-outline mr-1"></i><span
                          class="is-capitalized">Activate this user</span></p>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
          </div>
        </div>
      </el-table>
    </div>
  </div>
</template>

<script>
import AccountConvertIcon from "vue-material-design-icons/AccountConvert";
import AccountMinusIcon from "vue-material-design-icons/AccountMinus";
import AccountPlusIcon from "vue-material-design-icons/AccountPlus";
import AccountStarIcon from "vue-material-design-icons/AccountStar";
import { mapGetters } from "vuex";
export default {
  components: {
    AccountConvertIcon,
    AccountMinusIcon,
    AccountPlusIcon,
    AccountStarIcon
  },
  computed: {
    ...mapGetters(["users", "loggedInUserRole"])
  },
  created() {
    let pageInfo = {
      orderDirection: "desc"
    };
    this.$store.dispatch("totalUserResultCount");
    this.$store.dispatch("clearLastVisibleUser");
    this.$store.dispatch("getUserDataTable", pageInfo);
    this.$store.dispatch("onTotalUserCountForPaginationLoaded");
  },
  methods: {
    changeUserStatus(userId, userChangedStatus) {
      const userStatusInfo = {
        thisUserId: userId,
        thisUserChangedStatus: userChangedStatus
      };
      this.$store.dispatch("changeThisUserStatus", userStatusInfo);
    },
    changeUserRole(userId, userChangedRole) {
      const userRoleInfo = {
        thisUserId: userId,
        thisUserChangedRole: userChangedRole
      };
      this.$store.dispatch("changeThisUserRole", userRoleInfo);
    }
  }
};
</script>