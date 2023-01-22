/* eslint-disable */
import { createRouter, createWebHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// import SynthView from "../views/SynthView.vue";

const router = createRouter({
  // tagit bort createWebHistory(import.meta.env.BASE_URL) nedan för debugg
  history: createWebHistory(),
  routes: [
    {
      path: "/register",
      component: () => import("../views/RegisterUser.vue"),
    },
    {
      path: "/",
      component: () => import("../views/SignIn.vue"),
    },
    {
      path: "/feed",
      component: () => import("../views/JammerFeed.vue"),
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};

//Router navigation guard
router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    }
    else {
      alert("you do not have acess!");
      next("/");
    }
  }
  else {
    next();
  }
});

export default router;
