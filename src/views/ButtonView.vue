<template>
  <div>
    <button
      class="button-user-actions"
      role="button"
      id="play-button"
      @click="playSequenceACB"
    >
      PLAY
    </button>
    <button
      class="button-user-actions"
      role="button"
      id="clear-button"
      @click="clearGridACB"
    >
      CLEAR
    </button>
  </div>
</template>

<script>
export default {
  name: "ButtonView",
  props: { playSequence: { type: Function }, clearGrid: { type: Function } },
  data() {
    return {};
  },

  methods: {
    debug(e) {
      console.log(e);
    },
    playSequenceACB() {
      this.playSequence();
    },
    clearGridACB() {
      this.clearGrid();
    },
  },
};
</script>

<style>
/* CSS */
.button-user-actions {
  letter-spacing: 2px;
  background-color: #000000;
  border: 1.8px solid #ffffff;
  border-radius: 20px;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  font-family: "Helvetica Neue", "Arial", sans-serif;
  font-weight: 100px;
  font-size: 12px;
  line-height: 15px;
  margin: 10px;
  outline: none;
  padding: 8px;
  position: static;
  text-align: center;
  text-decoration: none;
  touch-action: manipulation;
  transition: box-shadow 0.2s, -ms-transform 0.1s, -webkit-transform 0.1s,
    transform 0.1s;
  width: 120px;
}

.button-user-actions:focus-visible {
  box-shadow: #222222 0 0 0 2px, rgba(255, 255, 255, 0.8) 0 0 0 4px;
  transition: box-shadow 0.2s;
}

.button-user-actions:active {
  background-color: #f7f7f7;
  border-color: #000000;
  transform: scale(0.9);
  color: black;
}
</style>
