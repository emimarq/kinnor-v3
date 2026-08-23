import "../styles/lesson-player.css"
import { buildPiano } from "../components/piano/pianoBuilder.js";
import { renderLessonTree } from "./lessonTree.js";
//import { playRhythm } from "../components/rhythm/rhythm-builder.js";
import { renderXpScreen } from "./xp-screen.js";
import { renderStave } from "../components/abc-notation/stave-builder.js";

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
    app.scrollTop;

    let completionAudio = null;

    // Load the lesson complete SFX
    function playCompletionSFX() {
        if (!completionAudio) {
            completionAudio = new Audio('/audio/sfx/lessonCompleted.mp3');
        }
        completionAudio.currentTime = 0;
        completionAudio.play().catch(err => console.error("Playback error:", err));
    }

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
        confirm("Are you sure? All progress and XP earned will not be stored.");

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
        // PIANO
        if (prompts[currentIndex].piano) {
            piano.style.display = "flex";

            // Add note hint flash
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
            if (currentPrompt.noteLabels === true) {
                piano.classList.remove("hide-note-labels");
            } else {
                piano.classList.add("hide-note-labels");
            }

            // Octave control bar
            if (prompts[currentIndex].octaves) {
                piano.querySelector("#octave-control-bar").style.display = "flex";
            } else {
                piano.querySelector("#octave-control-bar").style.display = "none";
            }
        }
        // RHYTHM
        if (currentPrompt.rhythm) {
            rhythm.style.display = "flex";

            //playRhythm("lesson-player-rhythm-area");
        }
        // STAVE
        if (currentPrompt.stave) {
            stave.style.display = "block";

            renderStave("lesson-player-stave-area", currentPrompt.notation, {
                highlightLines: currentPrompt.highlightLines
            });
        }

        area.innerHTML = `
            <p id="lesson-player-prompt-text">${prompts[currentIndex].prompt}</p>
        `;
    }

    // Track the user's selected notes
    let userInputs = new Set();

    // Keep correct classes while cycling octaves
    document.getElementById("lesson-player-piano-area").addEventListener("octaveChanged", () => {
        const currentPrompt = prompts[currentIndex];

        document.querySelectorAll(".piano-wrapper button").forEach((keyBtn) => {
            if (userInputs.has(keyBtn.dataset.note)) {
                keyBtn.classList.add("correct");
            } else {
                keyBtn.classList.remove("correct");
            }
            if (currentPrompt?.noteHints?.includes(keyBtn.dataset.note)) {
                keyBtn.classList.add("flashing");
            } else {
                keyBtn.classList.remove("flashing");
            }
        });
    });

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
                            playCompletionSFX();
                        }, 550)

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
            userInputs.clear();
            setTimeout(() => {
                resetKeys();
                renderPrompt();
            }, 250)
        }
    });

    // Initial setup
    renderPrompt();
    updateProgressBar();
}