import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else if (to.hash) {
      return {
        selector: to.hash
      };
    }
    return {
      x: 0,
      y: 0
    };
  },
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("@/components/pages/home/Home")
    },
    {
      path: "/admin",
      name: "Admin",
      redirect: "/admin/dashboard"
    },
    {
      path: "/admin/dashboard",
      name: "Dashboard",
      component: () => import("@/components/pages/dashboard/Dashboard")
    },
    {
      path: "/admin/users",
      name: "Users",
      component: () => import("@/components/pages/users/User")
    },
    {
      path: "/admin/news",
      name: "News",
      component: () => import("@/components/pages/news/News")
    },
    {
      path: "/news/:newsId/:newsSlug",
      name: "SingleNews",
      component: () => import("@/components/pages/news/detail/NewsDetail")
    },
    {
      path: "/admin/comments",
      name: "Comments",
      component: () => import("@/components/pages/comment/Comment")
    },
    {
      path: "/admin/reports",
      name: "Reports",
      component: () => import("@/components/pages/reports/Reports"),
      children: [
        {
          path: "",
          component: () => import("@/components/pages/reports/all/Reports")
        },
        {
          path: "deactive",
          name: "DeactivatedReports",
          component: () => import("@/components/pages/reports/deleted/Reports")
        },
        {
          path: "word-list",
          name: "WordsList",
          component: () => import("@/components/pages/reports/words/WordList")
        },
        {
          path: "word-list/edit/:wordId",
          name: "EditThisWord",
          component: () =>
            import("@/components/pages/reports/words/EditWordList")
        }
      ]
    },
    {
      path: "/admin/profile",
      name: "Profile",
      component: () => import("@/components/pages/profile/Profile")
    },
    {
      path: "/admin/terms-and-condition",
      name: "Terms",
      component: () => import("@/components/pages/terms/Terms")
    },
    {
      path: "/admin/privacy-policy",
      name: "Privacy",
      component: () => import("@/components/pages/privacy/Privacy")
    },
    {
      path: "/admin/settings",
      name: "Settings",
      component: () => import("@/components/pages/settings/Settings")
    },
    {
      path: "/auth/login",
      name: "Login",
      component: () => import("@/components/auth/signin/Login")
    },
    {
      path: "/auth/not-authorised",
      name: "NotAuthorised",
      component: () => import("@/components/pages/authorise/Authorise")
    },
    {
      path: "*",
      name: "error",
      component: () => import("@/components/pages/error/404")
    }
  ]
});
