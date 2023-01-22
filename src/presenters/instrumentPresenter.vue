<template>
  <SynthView
    :synthGrid="model.synthGrid"
    :activateNotes="activateNotesHandler"
    :currentBeat="this.model.beat"
  />
  <!-- this.model or not? -->
  <br />
  <MembraneView
    :membraneGrid="this.model.membraneGrid"
    :activateNotes="activateNotesHandler"
  />
  <br />
  <DrumView
    :drumGrid="this.model.drumGrid"
    :activateNotes="activateNotesHandler"
  />
  <br />
  <ButtonView
    :playSequence="playSequenceHandler"
    :clearGrid="clearGridHandler"
  />
</template>

<script>
import SynthView from "../views/SynthView.vue";
import MembraneView from "../views/MembraneView.vue";
import ButtonView from "../views/ButtonView.vue";
import DrumView from "../views/DrumView.vue";
import {
  updateModelFromFirebase,
  updateFirebaseFromModel,
} from "@/firebaseModel";

export default {
  name: "InstrumentPresenter",
  props: ["model"],
  components: { SynthView, MembraneView, ButtonView, DrumView },
  methods: {
    activateNotesHandler(clickedRow, clickedNote, e, gridType, instrumentType) {
      this.model.activateNotes(
        clickedRow,
        clickedNote,
        e,
        gridType,
        instrumentType
      );
      // Notify?
    },
    playSequenceHandler() {
      this.model.playSequence();
    },
    clearGridHandler() {
      this.model.clearGrid();
    },
  },
  data() {
    return {};
  },
  mounted() {
    updateFirebaseFromModel(this.model);
    updateModelFromFirebase(this.model);
  },
};
</script>
