import "../styles/lesson-player.css"
import { buildPiano } from "../components/piano/pianoBuilder.js";
import { renderLessonTree } from "./lessonTree.js";
import { playRhythm } from "../components/rhythm/rhythm-builder.js";
import { renderXpScreen } from "./xp-screen.js";

// Load all lesson modules in subdirectories lazily
const lessonModules = import.meta.glob('../lessons/**/*.js');

export async function renderLessonPlayer(lesson) {
    const modulePath = `../lessons/${lesson.lessonId}.js`;

    if (!lessonModules[modulePath]) {
        throw new Error(`Module not found: ${modulePath}`);
    }

    const lessonData = await lessonModules[modulePath]();
    // Insures lesson is a fresh start
    const prompts = structuredClone(lessonData.prompts);

    const app = document.getElementById("app");

    let currentIndex = 0;
    let stopRhythmFn = null;

    app.innerHTML = `
        <div id="lesson-player-container">
            <div id="lesson-player-top-content">
                <div id="lesson-player-exit-btn" class="fa-solid fa-x"></div>
                <div id="lesson-player-progress-bar">
                    <div id="lesson-player-progress-bar-fill"></div>
                </div>
            </div>

            <div id="lesson-player-stave-area"></div>

            <div id="lesson-player-rhythm-area"></div>

            <div id="lesson-player-piano-area"></div>

            <div id="lesson-player-prompt-area">
                <p id="lesson-player-prompt-text"></p>
            </div>
        </div>
    `;

    // Initialize Piano
    buildPiano("lesson-player-piano-area");

    // Reset rhythm beeps
    const beepsKillswitch = () => {
        if (stopRhythmFn) {
            stopRhythmFn();
            stopRhythmFn = null;
        }
    }

    // Remove all correct and incorrect classes
    function resetKeys() {
        document.querySelectorAll(".piano-wrapper button").forEach((btn) => {
            btn.classList.remove("correct");
        });
        document.querySelectorAll(".piano-wrapper button").forEach((btn) => {
            btn.classList.remove("incorrect");
        });
    }

    // Progress bar logic
    function updateProgressBar() {
        const fill = document.querySelector("#lesson-player-progress-bar-fill");
        const percent = (currentIndex / (prompts.length)) * 100;
        fill.style.width = percent + "%";
    }

    // Exit btn logic
    const exitBtn = document.getElementById("lesson-player-exit-btn");
    exitBtn.addEventListener("click", () => {
        // Clean up active rhythm beeps BEFORE exit
        beepsKillswitch();

        renderLessonTree();
    });

    // Updates prompt after each successful pass
    function renderPrompt() {
        // Clean up active rhythm beeps BEFORE starting a new prompt
        beepsKillswitch();

        // Clean up all note hint flashes BEFORE new prompt
        document.querySelectorAll(".flashing").forEach((el) => el.classList.remove("flashing"));

        const area = document.getElementById("lesson-player-prompt-area");
        const piano = document.getElementById("lesson-player-piano-area");
        const rhythm = document.getElementById("lesson-player-rhythm-area");
        const stave = document.getElementById("lesson-player-stave-area");

        const currentPrompt = prompts[currentIndex];

        // Conditionals to display or hide certain components on the page
        if (prompts[currentIndex].piano) {
            piano.style.display = "block";
            rhythm.style.display = "none";
            stave.style.display = "none"

            // Adds note hint flash
            if (currentPrompt.noteHints && Array.isArray(currentPrompt.noteHints)) {
                currentPrompt.noteHints.forEach((note) => {
                    const keyBtn = piano.querySelector(`button[data-note="${note}"]`);
                    if (keyBtn) {
                        keyBtn.classList.add("flashing");
                    }
                });
            }

            // Note label behavior
            // Reset all note labels to visible by default first
            if (currentPrompt.noteLabels === false) {
                piano.classList.add("hide-note-labels");
            } else {
                piano.classList.remove("hide-note-labels");
            }
        } else if (prompts[currentIndex].rhythm) {
            piano.style.display = "none";
            rhythm.style.display = "flex";
            const currentTempo = prompts[currentIndex].tempo;
            const currentTimeSig = prompts[currentIndex].timeSig || "4/4";
            // Capture returned cleanup function with timeSig passed through
            stopRhythmFn = playRhythm("lesson-player-rhythm-area", currentTempo, currentTimeSig);
        }

        area.innerHTML = `
            <p id="lesson-player-prompt-text">${prompts[currentIndex].prompt}</p>
        `;
    }

    // Track the users selected notes
    let userInputs = new Set();

    // Set guard to prevent spam clicks
    let isActive = null;

    // Game logic for user
    document.querySelector(".piano-wrapper").addEventListener("click", (e) => {
        if (isActive) return;
        // Store current selected note
        const keyBtn = e.target.closest("button");

        // Check the dataset of selected note
        const note = keyBtn?.dataset.note;
        if (!note) return;

        let currentPrompt = prompts[currentIndex];

        // Conditionals to pass or fail user inputs
        if (currentPrompt.targetNotes.includes(note)) {
            userInputs.add(note);

            // Set visuals for correct input
            keyBtn.classList.add("correct");
            keyBtn.classList.remove("flashing");

            // Check user input for test against target notes
            if (userInputs.size === currentPrompt.targetNotes.length) {
                isActive = true;

                setTimeout(() => {
                    userInputs.clear();

                    // Reset all correct visuals
                    resetKeys();

                    currentIndex++;
                    updateProgressBar();

                    if (currentIndex >= prompts.length) {

                        // Clear all rhythm beeps BEFORE progressing
                        beepsKillswitch();

                        setTimeout(() => {
                            renderXpScreen();
                        }, 750);
                        return;
                    }

                    renderPrompt();
                    isActive = null;
                }, 400)
            }
        } else {
            keyBtn.classList.add("incorrect");
            prompts.push(currentPrompt);
            userInputs.clear();
            setTimeout(() => {
                resetKeys();
                currentIndex++;
                updateProgressBar();
                renderPrompt();
            }, 250)
        }
    });

    // Initial setup
    renderPrompt();
    updateProgressBar();
}