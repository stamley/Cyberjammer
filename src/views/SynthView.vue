<template>
  <div class="top-instrument">
    <div v-for="row in synthGrid.length" :key="row.id">
      <span v-for="note in synthGrid[0].length" :key="note.id">
        <button
          :id="['synth', row - 1, note - 1]"
          class="note note-not-active"
          @click="
            (e) => {
              this.activateNotes(row - 1, note - 1, e, synthGrid, 'synth');
            }
          "
        />
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "SynthView",
  props: {
    synthGrid: Array,
    activateNotes: { type: Function },
    playSequence: { type: Function },
    currentBeat: Number,
  },
  data() {
    return {};
  },
  methods: {
    debug(e) {
      console.log(e);
    },
  },
};
</script>

<style>
.top-instrument {
  margin-top: 5vh;
}

.note {
  margin: 1.5px;
  /* Add a gradient background and a drop shadow */
  background: rgba(255 255 255 / 0.06);
  outline: none;
  border: 0;
  /* Round the corners and add some padding */
  border-radius: 3px;
  padding: 10px;

  /* Set the text color and font size */
  font-size: 0.4em;
  /* width: 4.25vh; */
  /* height: 1px; */
  width: 40px;
  /* Add a hover effect */
  cursor: pointer;
  touch-action: manipulation;
  transition: box-shadow 0.2s, -ms-transform 0.1s, -webkit-transform 0.1s,
    transform 0.1s;
}
@media only screen and (max-device-width: 709px) {
  .note {
    padding: 1px;
    width: 3vh;
    height: 2vh;
  }
}

@media only screen and (max-device-width: 430px) {
  .note {
    padding: 1px;
    width: 2.2vh;
  }
}

.note-is-active {
  background-color: white;
}
.note:active {
  background-color: #2600ff;
  transform: scale(0.8);
}
.note:hover {
  animation: glow 1500ms infinite; /* change this to change the color of text after hover over the button */
}

.highlight {
  transform: scale(1.1);
  background-color: rgba(255, 255, 255, 0.1);
}

.highlight.note-is-active {
  background-color: white;
}

@keyframes glow {
  0% {
    box-shadow: 0 0 3px #2600ff;
  }
  50% {
    box-shadow: 0 0 40px #2600ff;
  }
  100% {
    box-shadow: 0 0 3px #2600ff;
  }
}
</style>
