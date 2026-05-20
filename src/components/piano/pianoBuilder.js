// /src/components/pianoBuilder.js

import "../../styles/piano.css";
import { keyEvents } from "./keyEvents.js";

export function buildPiano(targetId) {

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

    const promptBox = document.createElement("h1");
    promptBox.id = "prompt-box";

    const pianoWrapper = document.createElement("div");
    pianoWrapper.classList.add("piano-wrapper");

    naturals.forEach((note, index) => {
        const whiteKey = document.createElement("button");
        whiteKey.classList.add("white-key");
        whiteKey.classList.add("piano-key");
        whiteKey.dataset.note = note;

        const noteLabel = document.createElement("span");
        noteLabel.innerText = note;
        whiteKey.appendChild(noteLabel);

        if (accidentals[note]) {
            const blackKey = document.createElement("button");
            blackKey.classList.add("black-key");
            blackKey.classList.add("piano-key");
            blackKey.dataset.note = accidentals[note];

            whiteKey.appendChild(blackKey);
        }

        pianoWrapper.appendChild(whiteKey);
        //if (index >= 3) { whiteKey.remove(); pianoWrapper.style.aspectRatio = "5/1" }
    });

    wrapper.appendChild(promptBox);
    wrapper.appendChild(pianoWrapper);

    app.appendChild(wrapper);

    return keyEvents();
}