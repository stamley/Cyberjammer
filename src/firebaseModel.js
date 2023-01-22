import firebaseConfig from "./firebaseConfig";
import { initializeApp } from "../node_modules/@firebase/app";
import {
  getDatabase,
  ref,
  set,
  onValue,
} from "../node_modules/@firebase/database";

// Ändring såhär såg det ut innan /isak const app = initializeApp(firebaseConfig);

const app = initializeApp(firebaseConfig);

const REF = "Cyberjammer";

const db = getDatabase(app);

let synthListener;
let membraneListener;
let drumListener;

// Possible to trim down this function a bit?
function removeFirebaseListeners() {
  // OnValue returns function, that when called removes the listener.
  synthListener();
  membraneListener();
  drumListener();
}

function updateModelFromFirebase(model) {
  synthListener = onValue(ref(db, REF + "/" + "synth" + "/"), (snapshot) => {
    snapshot.val().forEach((row, indexOfRow) => {
      row.forEach((note, noteIndex) => {
        if (model.synthGrid[indexOfRow][noteIndex]) {
          model.synthGrid[indexOfRow][noteIndex].isActive = Boolean(note);

          if (note) {
            document
              .getElementById("synth" + "," + indexOfRow + "," + noteIndex)
              .classList.add("note-is-active");
            document
              .getElementById("synth" + "," + indexOfRow + "," + noteIndex)
              .classList.remove("note-not-active");
          } else {
            document
              .getElementById("synth" + "," + indexOfRow + "," + noteIndex)
              .classList.add("note-not-active");
            document
              .getElementById("synth" + "," + indexOfRow + "," + noteIndex)
              .classList.remove("note-is-active");
          }
        }
      });
    });
  });
  membraneListener = onValue(
    ref(db, REF + "/" + "membrane" + "/"),
    (snapshot) => {
      snapshot.val().forEach((row, indexOfRow) => {
        row.forEach((note, noteIndex) => {
          model.membraneGrid[indexOfRow][noteIndex].isActive = Boolean(note);

          if (note) {
            document
              .getElementById("membrane" + "," + indexOfRow + "," + noteIndex)
              .classList.add("note-is-active");
            document
              .getElementById("membrane" + "," + indexOfRow + "," + noteIndex)
              .classList.remove("note-not-active");
          } else {
            document
              .getElementById("membrane" + "," + indexOfRow + "," + noteIndex)
              .classList.add("note-not-active");
            document
              .getElementById("membrane" + "," + indexOfRow + "," + noteIndex)
              .classList.remove("note-is-active");
          }
        });
      });
    }
  );
  drumListener = onValue(ref(db, REF + "/" + "drum" + "/"), (snapshot) => {
    snapshot.val().forEach((row, indexOfRow) => {
      row.forEach((note, noteIndex) => {
        model.drumGrid[indexOfRow][noteIndex].isActive = Boolean(note);

        if (note) {
          document
            .getElementById("drum" + "," + indexOfRow + "," + noteIndex)
            .classList.add("note-is-active");
          document
            .getElementById("drum" + "," + indexOfRow + "," + noteIndex)
            .classList.remove("note-not-active");
        } else {
          document
            .getElementById("drum" + "," + indexOfRow + "," + noteIndex)
            .classList.add("note-not-active");
          document
            .getElementById("drum" + "," + indexOfRow + "," + noteIndex)
            .classList.remove("note-is-active");
        }
      });
    });
  });
}

function updateFirebaseFromModel(model) {
  function updatedNoteACB(payload) {
    if (payload && payload.updatedNote) {
      set(
        ref(
          db,
          REF +
            "/" +
            payload.updatedNote.instrument +
            "/" +
            payload.updatedNote.row +
            "/" +
            payload.updatedNote.note
        ),
        payload.updatedNote.isActive
      );
    }
  }
  model.addObserver(updatedNoteACB);
}

export {
  updateModelFromFirebase,
  updateFirebaseFromModel,
  removeFirebaseListeners,
};
