<template>
  <!--<h1>Sign in to an Account</h1>-->
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
  <p class="error-msg" v-if="errorMsg">{{ errorMsg }}</p>
  <span>
    <button class="button-user-actions" role="button" @click="register">
      SUBMIT
    </button>
    <button class="button-user-actions" role="button" @click="signInWithGoogle">
      GOOGLE
    </button>
  </span>
</template>

<script setup>
import { ref } from "vue";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth"; //We use the firebase authentication API to create our user
import { useRouter } from "vue-router"; //import router
const email = ref(""); //maps to our imput "e.g. email above"
const password = ref("");
const errorMsg = ref(); //Error message
const router = useRouter(); // get reference to our vue router

const register = () => {
  //takes e-mail and password values and returns a promise
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email.value, password.value)
    // eslint-disable-next-line no-unused-vars
    .then((data) => {
      console.log("Successfully signed in");
      console.log(auth.currentUser);
      router.push("/feed"); //redirect user to feed upon successful registration
    })
    .catch((error) => {
      console.log(error.code);
      switch (error.code) {
        case "auth/invalid-email":
          errorMsg.value = "Invalid email";
          break;
        case "auth/user-not-found":
          errorMsg.value = "No account with that email was found";
          break;
        case "auth/wrong-password":
          errorMsg.value = "Incorrect password";
          break;
        default:
          errorMsg.value = "Email or password was incorrect";
          break;
      }
    });
};

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then(() => {
      router.push("/feed");
    })
    .catch((error) => {
      console.log(error.code);
      alert(error.message);
    });
};
</script>

<style>
.error-msg {
  color: rgb(255, 255, 255);
  font-family: Arial, Helvetica, sans-serif;
  font-weight: regular;
}
.inputs {
  margin-top: 170px;
}
.input-box {
  background-color: rgba(0, 0, 0, 0);
  padding: 10px 15px;
  margin: 8px;
  font-size: 15px;
  width: 290px;
  color: white;
  border: 1px solid rgb(255, 255, 255);
  outline: none;
}
@media only screen and (max-device-width: 500px) {
  .input-box {
    width: 230px;
  }
  .inputs {
    margin-top: 140px;
  }
}
</style>
