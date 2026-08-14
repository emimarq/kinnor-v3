// /src/components/pianoBuilder.js

import "../../styles/piano.css";
import { keyEvents } from "./keyEvents.js";

export function buildPiano(targetId, currentOctave = 4) {

    const container = document.getElementById(targetId);
    container.innerHTML = '';

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

    const promptBox = document.createElement("h1");
    promptBox.id = "prompt-box";

    const pianoWrapper = document.createElement("div");
    pianoWrapper.classList.add("piano-wrapper");

    const octaveBar = document.createElement("div");
    octaveBar.id = "octave-control-bar";
    octaveBar.innerHTML = `
        <button class="octave-btn fa-solid fa-angle-left" id="octave-down"></button>
        <span id="octave-display">OCTAVE ${currentOctave}</span>
        <button class="octave-btn fa-solid fa-angle-right" id="octave-up"></button>
    `;

    octaveBar.querySelector("#octave-down").addEventListener("click", () => {
        if (currentOctave > 1) {
            currentOctave--;
            buildPiano(targetId, currentOctave);
        }
    });

    octaveBar.querySelector("#octave-up").addEventListener("click", () => {
        if (currentOctave < 7) {
            currentOctave++;
            buildPiano(targetId, currentOctave);
        }
    });

    wrapper.appendChild(octaveBar);

    naturals.forEach((note, index) => {

        // Render white keys
        const whiteKey = document.createElement("button");
        whiteKey.classList.add("white-key");
        whiteKey.classList.add("piano-key");
        whiteKey.dataset.note = `${note}${currentOctave}`;

        // Render note labels for white keys
        const noteLabel = document.createElement("span");
        noteLabel.innerText = note;
        whiteKey.appendChild(noteLabel);

        // Render black keys
        if (accidentals[note]) {
            const blackKey = document.createElement("button");
            blackKey.classList.add("black-key");
            blackKey.classList.add("piano-key");
            blackKey.dataset.note = `${accidentals[note]}${currentOctave}`;

            whiteKey.appendChild(blackKey);
        }

        pianoWrapper.appendChild(whiteKey);
        //if (index >= 3) { whiteKey.remove(); pianoWrapper.style.aspectRatio = "5/1" }
    });

    wrapper.appendChild(promptBox);
    wrapper.appendChild(pianoWrapper);

    container.appendChild(wrapper);

    return keyEvents();
}