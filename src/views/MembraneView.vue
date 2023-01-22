<template>
  <div v-for="row in membraneGrid.length" :key="row.id">
    <span v-for="note in membraneGrid[0].length" :key="note.id">
      <button
        :id="['membrane', row - 1, note - 1]"
        class="note note-not-active"
        @click="
          (e) => {
            this.activateNotes(row - 1, note - 1, e, membraneGrid, 'membrane');
          }
        "
      />
    </span>
  </div>
</template>

<script>
export default {
  name: "MembraneView",
  props: {
    membraneGrid: Array,
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
  background-color: #f187ff;
  transform: scale(0.8);
}

.note:hover {
  animation: glow 1500ms infinite; /* change this to change the color of text after hover over the button */
}

@keyframes glow {
  0% {
    box-shadow: 0 0 3px #f187ff;
  }
  50% {
    box-shadow: 0 0 40px #f187ff;
  }
  100% {
    box-shadow: 0 0 3px #f187ff;
  }
}
</style>
