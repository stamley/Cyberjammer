<template>
  <div class="app-container">
    <UserPresenter :model="this.model" />
    <div v-if="$route.path === '/feed'">
      <InstrumentPresenter v-if="this.loadedState" :model="this.model" />
      <img
        v-else
        src="https://media.tenor.com/aK9YaZum7RkAAAAC/excited-loading.gif"
      />
    </div>
    <div class="credits" v-if="$route.path === '/feed'">
      Created by
      <a href="https://github.com/axellokrantz"> axellokrantz</a>,
      <a href="https://github.com/stamley">axellystam</a>,
      <a href="https://github.com/Shapetwig">bjornformgren</a>,
      <a href="https://github.com/iwilkens">isakwilkens</a>
    </div>
  </div>
  <div class="p5Canvas" id="p5Canvas"></div>
</template>

<script>
/* eslint-disable */
import { ref } from "vue";
import InstrumentPresenter from "./presenters/instrumentPresenter.vue";
import UserPresenter from "./presenters/userPresenter.vue";
import JammerModel from "./JammerModel";
import { loaded } from "tone";
import { starryNights } from "./assets/starryNights";

export default {
  name: "App",
  components: { InstrumentPresenter, UserPresenter },
  methods: {
    async toneLoaded() {
      await loaded().then(
        () => {
          this.loadedState = true;
        },
        () => {
          console.log("Tone.js init failed");
        }
      );
    },
  },
  setup() {
    const loadedState = ref(false);
    const model = new JammerModel();

    return {
      loadedState,
      model,
    };
  },
  mounted() {
    this.toneLoaded();
    const P5 = require("p5");
    new P5(starryNights());
  },
};
</script>

<style>
html {
  background-color: rgb(0, 0, 0);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  margin-top: 20px;
}

.top{
  white-space: nowrap;
  overflow: hidden;
}

.p5Canvas {
  position: fixed;
  top: 0;
  z-index: -1;
}
.app-container {
  position: relative;
  margin: auto;
  height: 95vh;
}

.credits {
  font-family: "Cascadia Code";
  color: white;
  font-size: 12px; 
  text-align: center;
  margin: 5vh;
  height: 50px;
  bottom: 0;
  position:static, center;
}

@font-face {
  font-family: "Cascadia Code";
  src: url("./assets/fonts/CascadiaCode.eot");
  src: url("./assets/fonts/CascadiaCode.eot?#iefix") format("embedded-opentype"),
    url("./assets/fonts/CascadiaCode.woff2") format("woff2"),
    url("./assets/fonts/CascadiaCode.woff") format("woff"),
    url("./assets/fonts/CascadiaCode.svg#CascadiaCode") format("svg");
  font-weight: 1px;
  font-style: normal;
  font-display: swap;
}
a:link {
  color: rgb(8, 255, 33);
}

/* visited link */
a:visited {
  color: rgb(8, 255, 33);
}

/* mouse over link */
a:hover {
  color: white;
  text-decoration: none;
}

/* selected link */
a:active {
  color: white;
}

p {
  color: beige;
  margin: 10px;
  padding: 0px;
}
</style>
