<template>
  <div v-for="row in drumGrid.length" :key="row.id">
    <span v-for="note in drumGrid[0].length" :key="note.id">
      <button
        :id="['drum', row - 1, note - 1]"
        class="note note-not-active"
        @click="
          (e) => {
            this.activateNotes(row - 1, note - 1, e, drumGrid, 'drum');
          }
        "
      />
    </span>
  </div>
</template>

<script>
export default {
  name: "DrumView",
  props: {
    drumGrid: Array,
    activateNotes: { type: Function },
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

<style scoped>
.note:active {
  background-color: #09ff00;
  transform: scale(0.8);
}

.note:hover {
  animation: glow 1500ms infinite; /* change this to change the color of text after hover over the button */
}

@keyframes glow {
  0% {
    box-shadow: 0 0 3px #09ff00;
  }
  50% {
    box-shadow: 0 0 40px #09ff00;
  }
  100% {
    box-shadow: 0 0 3px #09ff00;
  }
}
</style>
