<template>
  <div class="wrapper">
    <a
      class="sign-out"
      @click="handleSignOut(this.model)"
      v-if="this.isLoggedIn"
    >
      SIGN OUT
    </a>
    <nav>
      <router-link
        class="sign-out"
        to="/register"
        v-if="!this.isLoggedIn && $route.path !== '/register'"
      >
        REGISTER
      </router-link>
      <router-link
        class="sign-out"
        to="/"
        v-if="!this.isLoggedIn && $route.path !== '/'"
      >
        LOGIN
      </router-link>
    </nav>
  </div>
  <div>
    <img class="logo" src="../assets/cyberLogo_v2.svg" />
  </div>
  <router-view />
</template>
<script>
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { removeFirebaseListeners } from "@/firebaseModel";

export default {
  name: "UserPresenter",
  props: ["model"],
  setup() {
    const router = useRouter();
    const isLoggedIn = ref(false);
    let auth;

    onMounted(() => {
      auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          isLoggedIn.value = true;
        } else {
          isLoggedIn.value = false;
        }
      });
    });

    const handleSignOut = (model) => {
      signOut(auth).then(() => {
        router.push("/");
        if (model.playing) {
          model.playSequence();
        }
        removeFirebaseListeners();
      });
    };
    return {
      handleSignOut,
      isLoggedIn,
    };
  },
};
</script>

<style>
.logo {
  /* width: 28%; */
  width: 50vh;
  margin-top: 5vh;
  float: center;
  position: relative;
}
.wrapper {
  display: flex;
  justify-content: end;
  width: 85%;
}
.sign-out {
  letter-spacing: 2px;
  color: rgb(8, 255, 33);
  border: none;
  font-family: "Helvetica Neue", "Arial", sans-serif;
  position: absolute;
  cursor: pointer;
  font-weight: bold;
  font-size: 12px;
  right: 2%;
  text-decoration: none;
}

@media only screen and (max-device-width: 600px) {
  .logo {
    width: 68%;
    margin: 5.5vh;
  }
}
</style>
