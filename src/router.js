import Vue from "vue";
import Router from "vue-router";
import store from "./store";

// Sign in page
import SignIn from "@/views/SignIn.vue";

// Layout page
import MainLayout from "@/layout/Main.vue";

// Dashboard page
import Dashboard from "@/views/dashboard/Index.vue";

// Base infomation pages
import UserInfo from "@/views/base/UserInfo.vue";
import TaskList from "@/views/base/TaskList.vue";
import TaskDetail from "@/views/base/TaskDetail.vue";

// Setting pages
import UpdatePasswod from "@/views/setting/UpdatePassword.vue";
import Permissions from "@/views/setting/Permissions.vue";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/signIn",
      name: "signIn",
      component: SignIn
    },
    {
      path: "/",
      redirect: "/dashboard"
    },
    {
      path: "/dashboard",
      name: "index",
      component: MainLayout,
      meta: {
        isMenu: true,
        name: "Dashboard",
        icon: "ios-timer-outline"
      },
      children: [
        {
          path: "",
          name: "dashboard",
          component: Dashboard
        }
      ]
    },
    {
      path: "/base",
      name: "base",
      component: MainLayout,
      redirect: "/base/info",
      meta: {
        isMenu: true,
        name: "Base Infomation",
        icon: "ios-briefcase-outline"
      },
      children: [
        {
          path: "info",
          name: "base_user_info",
          component: UserInfo,
          meta: {
            isMenu: true,
            name: "Personal Prefile"
          }
        },
        {
          path: "task",
          name: "base_task_list",
          component: TaskList,
          meta: {
            isMenu: true,
            name: "Tasks"
          }
        },
        {
          path: "task/:id",
          name: "base_task_detail",
          component: TaskDetail,
          meta: {
            name: "Task Detail"
          }
        }
      ]
    },
    {
      path: "/setting",
      name: "setting",
      component: MainLayout,
      redirect: "/setting/updatePassword",
      meta: {
        isMenu: true,
        name: "Settings",
        icon: "ios-contacts-outline"
      },
      children: [
        {
          path: "updatePassword",
          name: "setting_update_password",
          component: UpdatePasswod,
          meta: {
            isMenu: true,
            name: "Update Passwod"
          }
        },
        {
          path: "permissions",
          name: "setting_permissions",
          component: Permissions,
          meta: {
            isMenu: true,
            name: "Permission"
          }
        }
      ]
    }
  ]
});

// configation router
router.beforeEach((to, from, next) => {
  if (to.name != "signIn") {
    if (store.state.userInfo.Token) {
      next();
    } else {
      store.commit("CleanUserInfo");
      next("/signIn");
    }
  } else {
    next();
  }
});

export default router;
