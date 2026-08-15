// /src/components/pianoBuilder.js

import "../../styles/piano.css";
import { keyEvents } from "./keyEvents.js";

export function buildPiano(targetId, currentOctave = 4) {

    const app = document.getElementById(targetId);

    const naturals = ["C", "D", "E", "F", "G", "A", "B"];

    const accidentals = {
        C: "C#",
        D: "D#",
        F: "F#",
        G: "G#",
        A: "A#"
    };

    const wrapper = document.createElement("div");
    wrapper.id = "wrapper";

    //const promptBox = document.createElement("h1");
    //promptBox.id = "prompt-box";

    const pianoWrapper = document.createElement("div");
    pianoWrapper.classList.add("piano-wrapper");

    const octaveControlBar = document.createElement("div");
    octaveControlBar.id = "octave-control-bar";
    octaveControlBar.innerHTML = `
        <button class="octave-btn fa-solid fa-angle-left" id="octave-down"></button>
        <div id="octave-display">OCTAVE ${currentOctave}</div>
        <button class="octave-btn fa-solid fa-angle-right" id="octave-up"></button>
    `

    function updateKeys(newOctave) {
        const keys = pianoWrapper.querySelectorAll(".piano-key");
        keys.forEach((key) => {
            key.dataset.note = `${key.dataset.baseNote}${newOctave}`;
        })
    }

    const btns = octaveControlBar.querySelectorAll(".octave-btn");
    btns.forEach((btn) => {
        btn.addEventListener("click", () => {
            let octaveChanged = false;
            if (btn.id.includes("octave-down") && currentOctave > 1) {
                currentOctave--;
                octaveChanged = true;
            } else if (btn.id.includes("octave-up") && currentOctave < 7) {
                currentOctave++;
                octaveChanged = true;
            }
            if (octaveChanged) {
                octaveControlBar.querySelector("#octave-display").textContent = `OCTAVE ${currentOctave}`;
                updateKeys(currentOctave);
                app.dispatchEvent(new CustomEvent("octaveChanged"));
            }
        })
    })

    naturals.forEach((note, index) => {
        const whiteKey = document.createElement("button");
        whiteKey.classList.add("white-key", "piano-key");
        whiteKey.dataset.baseNote = note;
        whiteKey.dataset.note = `${note}${currentOctave}`;

        const noteLabel = document.createElement("span");
        noteLabel.innerText = note;
        whiteKey.appendChild(noteLabel);

        if (accidentals[note]) {
            const blackKey = document.createElement("button");
            blackKey.classList.add("black-key", "piano-key");
            blackKey.dataset.baseNote = accidentals[note];
            blackKey.dataset.note = `${accidentals[note]}${currentOctave}`;

            whiteKey.appendChild(blackKey);
        }

        pianoWrapper.appendChild(whiteKey);
        //if (index >= 3) { whiteKey.remove(); pianoWrapper.style.aspectRatio = "5/1" }
    });

    wrapper.appendChild(octaveControlBar);
    //wrapper.appendChild(promptBox);
    wrapper.appendChild(pianoWrapper);
    app.appendChild(wrapper);
    return keyEvents();
}