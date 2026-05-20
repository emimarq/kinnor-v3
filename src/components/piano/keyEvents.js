// src/components/pianokeyEvents.js

export function keyEvents() {
    let isActive = false;
    let selectedNote = [];

    const keys = document.querySelectorAll(".piano-key");
    keys.forEach((key) => {
        key.addEventListener("click", (e) => {
            e.preventDefault();
            //e.stopPropagation();

            if (isActive) return;

            selectedNote.push(e.target.closest("button").dataset.note);

            console.log(e.target.closest("button").dataset.note)
        })
    })
    return selectedNote;
}