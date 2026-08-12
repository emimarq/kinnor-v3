// src/components/pianokeyEvents.js

export function keyEvents() {
    let isActive = false;
    let selectedNote = [];

    const keys = document.querySelectorAll(".piano-key");
    keys.forEach((key) => {
        key.addEventListener("pointerdown", (e) => {
            e.preventDefault();
            e.stopPropagation();

            if (isActive) return;

            selectedNote.push(e.target.closest("button").dataset.note);

            key.classList.add("active");

/*             if (e.target.closest("button").classList.contains("white-key")) {
                console.log("white-key")
                key.classList.add("active");
            } else {
                console.log("black-key")
                key.classList.add("active");
            } */
        })

        key.addEventListener("pointerup", (e) => {
            key.classList.remove("active");
        })
    })
    return selectedNote;
}