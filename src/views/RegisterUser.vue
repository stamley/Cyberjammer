<template>
  <div class="inputs">
    <p>
      <input
        class="input-box"
        type="text"
        placeholder="Email"
        v-model="email"
      />
    </p>
    <p>
      <input
        class="input-box"
        type="password"
        placeholder="Password"
        v-model="password"
      />
    </p>
  </div>
  <span>
    <button class="button-user-actions" @click="register">REGISTER</button>
    <button class="button-user-actions" @click="signInWithGoogle">
      GOOGLE
    </button>
  </span>
</template>

<script setup>
import { ref } from "vue";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth"; //We use the firebase authentication API to create our user
import { useRouter } from "vue-router"; //import router

const email = ref(""); //maps to our imput "e.g. email above"
const password = ref("");
const router = useRouter(); // get reference to our vue router

const register = () => {
  //takes e-mail and password values and returns a promise
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email.value, password.value)
    // eslint-disable-next-line no-unused-vars
    .then((data) => {
      console.log("Successfully registered!");
      console.log(auth.currentUser);
      router.push("/feed"); //redirect user to feed upon successful registration
    })
    .catch((error) => {
      console.log(error.code);
      alert(error.message);
    });
};

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then((result) => {
      console.log(result.user);
      router.push("/feed");
    })
    .catch((error) => {
      console.log(error.code);
      alert(error.message);
    });
};
</script>
