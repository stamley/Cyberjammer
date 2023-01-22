import * as Tone from "tone";

class JammerModel {
  constructor() {
    this.observers = [];

    this.synths = [];
    this.membraneSynths = [];
    this.drums = [];

    this.synthGrid = [];
    this.membraneGrid = [];
    this.drumGrid = [];

    this.beat = 0;
    this.playing = false;
    this.started = false;

    this.initInstruments();
    this.initGrids();

    // Bind this to the nested functions
    // This is important for functionality,
    // will it be a problem with the new implementation
    // of passing the entire model to the presenter?
    this.repeat = this.repeat.bind(this);
    // Not sure if this is needed
    this.triggerNoteCB = this.triggerNoteCB.bind(this);

    /*
      Notes:
      If you start the sequencer, do some changes, and save, 
      there will be several repeats scheduled (maybe?).
      Two instances of the beat can initiate.
      Might need some firebase storage of playing or started or both?
      Or maybe just beat...

      Does the model need to be created again when updated from the 
      firebase? Creating the model for each instance might be a 
      problem.
    */
  }

  initInstruments() {
    //(6 rows)
    this.makeSynths(6, "fatsawtooth", "Synth", this.synths, -24);
    this.makeSynths(6, "square8", "Synth2", this.membraneSynths, -21);
    this.makeDrums(6);
  }

  initGrids() {
    const notes = ["Eb5", "C5", "Bb5", "Ab4", "G4", "F4"];
    const bassNotes = ["F2", "Eb2", "C2", "Bb1", "Ab1", "F1"];
    //(8 columns)
    this.makeGrid(bassNotes, 16, this.synthGrid);
    this.makeGrid(notes, 16, this.membraneGrid);
    this.makeGrid(["A0", "A1", "A2", "A3", "A4", "A5"], 16, this.drumGrid);
  }

  createSynth(wave, synthType) {
    if (synthType === "Synth") {
      return new Tone.Synth({
        oscillator: { type: wave },
        envelope: { attack: 0, decay: 0.2, sustain: 1, release: 0.03 },
        count: 3,
      }).chain(
        new Tone.Filter({ type: "lowpass", frequency: 800, q: 10 }),
        new Tone.Filter({ type: "highpass", frequency: 60 }),
        new Tone.Distortion({ distortion: 0.4, wet: 0.4 }),
        new Tone.Chorus({ frequency: 100, delayTime: 1, depth: 50, wet: 0.3 }),
        Tone.Destination
      );
    } else if (synthType === "Synth2") {
      return new Tone.Synth({
        oscillator: { type: wave },
        envelope: { attack: 0, decay: 0.3, sustain: 0.1, release: 1 },
      }).chain(
        new Tone.Tremolo("16n", 0.2).start(),
        new Tone.PingPongDelay({ wet: 0.1, delayTime: 1 }),
        new Tone.Filter({ type: "highpass", frequency: 400 }),
        new Tone.StereoWidener(0.6),
        Tone.Destination
      );
    }
  }

  makeSynths(count, wave, synthType, synthArray, volume) {
    let synth;

    for (let i = 0; i < count; i++) {
      synth = this.createSynth(wave, synthType);
      synth.volume.value = volume;
      synthArray.push(synth);
    }
  }

  createDrum(note) {
    // Hard-coded, must be changed if number of
    // rows for each instrument is changed.

    if (note === "A0") {
      return new Tone.Sampler({
        A0: require("/src/sounds/Clav.wav"),
      }).toDestination();
    } else if (note === "A1") {
      return new Tone.Sampler({
        A1: require("/src/sounds/Clap.wav"),
      }).chain(
        new Tone.PingPongDelay({ wet: 0.1, delayTime: "16n" }),
        Tone.Destination
      );
    } else if (note === "A2") {
      return new Tone.Sampler({
        A2: require("/src/sounds/OpenHat.wav"),
      }).toDestination();
    } else if (note === "A3") {
      return new Tone.Sampler({
        A3: require("/src/sounds/Hat.wav"),
      }).toDestination();
    } else if (note === "A4") {
      return new Tone.Sampler({
        A4: require("/src/sounds/Snare.wav"),
      }).chain(new Tone.Reverb({ decay: 0.4, wet: 0.7 }), Tone.Destination);
    } else if (note === "A5") {
      return new Tone.Sampler({
        A5: require("/src/sounds/Kick.wav"),
      }).chain(
        /*new Tone.BitCrusher({ bits: 10, wet: 0.1 }),*/
        new Tone.Distortion({ distortion: 2.3, wet: 0.07 }),
        new Tone.Filter({ frequency: 100, type: "peaking", gain: 10 }),
        new Tone.Filter(1100, "lowpass", -12),
        Tone.Destination
      );
    }
  }

  makeDrums(count) {
    for (let i = 0; i < count; i++) {
      this.drums.push(this.createDrum("A" + i));
    }
  }

  makeGrid(notes, count, gridType) {
    for (const note of notes) {
      const row = [];

      for (let i = 0; i < count; i++) {
        row.push({
          note: note,
          isActive: false,
        });
      }
      gridType.push(row);
    }
  }

  repeat(time) {
    // Use the triggerNoteCB method that is bound to the JammerModel instance
    this.synthGrid.forEach((row, rowIndex) =>
      this.triggerNoteCB(row, rowIndex, time, this.synths, 0.03)
    );

    this.membraneGrid.forEach((row, rowIndex) =>
      this.triggerNoteCB(row, rowIndex, time, this.membraneSynths)
    );

    this.drumGrid.forEach((row, rowIndex) =>
      this.triggerNoteCB(row, rowIndex, time, this.drums)
    );

    this.highlight(this.synthGrid, "synth");
    this.highlight(this.membraneGrid, "membrane");
    this.highlight(this.drumGrid, "drum");

    this.beat = (this.beat + 1) % 16;
  }

  highlight(grid, instrument) {
    for (let i = 0; i < grid.length; i++) {
      document
        .getElementById(instrument + "," + i + "," + this.beat)
        .classList.add("highlight");
      document
        .getElementById(instrument + "," + i + "," + ((this.beat + 15) % 16))
        .classList.remove("highlight");
    }
  }

  triggerNoteCB(row, index, time, instrumentArray) {
    let instrument = instrumentArray[index];
    let note = row[this.beat];
    if (note.isActive) instrument.triggerAttackRelease(note.note, "8n", time);
  }

  activateNotes(clickedRow, clickedNote, e, gridType, instrumentType) {
    // Use arrow function to preserve the correct value of this
    gridType[clickedRow][clickedNote].isActive =
      !gridType[clickedRow][clickedNote].isActive;

    // Use same activation as in firebase with button indexes
    // instead of e target?
    if (gridType[clickedRow][clickedNote].isActive) {
      e.target.classList.add("note-is-active");
      e.target.classList.remove("note-not-active");
    } else {
      e.target.classList.add("note-not-active");
      e.target.classList.remove("note-is-active");
    }
    this.notifyObservers({
      updatedNote: {
        instrument: instrumentType,
        row: clickedRow,
        note: clickedNote,
        isActive: gridType[clickedRow][clickedNote].isActive,
      },
    });
  }

  clearGrid() {
    this.clearSeparateGrids(this.synthGrid, "synth");
    this.clearSeparateGrids(this.membraneGrid, "membrane");
    this.clearSeparateGrids(this.drumGrid, "drum");
  }

  clearSeparateGrids(gridType, instrument) {
    for (const [i, row] of gridType.entries()) {
      for (const [j, element] of row.entries()) {
        if (element.isActive === true) {
          gridType[i][j].isActive = false;

          document
            .getElementById(instrument + "," + i + "," + j)
            .classList.add("note-not-active");
          document
            .getElementById(instrument + "," + i + "," + j)
            .classList.remove("note-is-active");

          this.notifyObservers({
            updatedNote: {
              instrument: instrument,
              row: i,
              note: j,
              isActive: false,
            },
          });
        }
      }
    }
  }

  async playSequence() {
    let button = document.getElementById("play-button");
    if (!this.started) {
      await Tone.start();
      Tone.Transport.bpm.value = 120;
      Tone.Transport.scheduleRepeat(this.repeat, "8n");
      Tone.getDestination().volume.rampTo(-10, 0.001);
      this.started = true;
    }
    if (this.playing) {
      Tone.Transport.stop();
      this.playing = false;
      button.innerText = "PLAY";
    } else {
      Tone.Transport.start();
      this.playing = true;
      button.innerText = "STOP";
    }
  }
  instrumentsLoaded() {
    return this.drumLoad && this.synthLoad && this.membraneLoad;
  }
  // Observers, try with vue-specific observers?
  addObserver(callback) {
    this.observers = [...this.observers, callback];
  }
  removeObserver(callback) {
    this.observers = this.observers.filter(observerRemoveCB);

    function observerRemoveCB(observer) {
      if (callback === observer) return false;
    }
  }
  notifyObservers(payload) {
    function invokeObserverCB(observer) {
      try {
        observer(payload);
      } catch (err) {
        console.error(err);
      }
    }
    this.observers.forEach(invokeObserverCB);
  }
}

export default JammerModel;
