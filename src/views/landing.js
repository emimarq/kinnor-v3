// src/views/landing.js
import "../styles/landing.css";
import { buildPiano } from "../components/piano/pianoBuilder.js";
import { renderLogin } from "./login.js";
import { logoClick } from "../components/behavior/logo-click.js";
import { renderOnboarding } from "./onboarding.js";

export function renderLanding() {
    const app = document.getElementById("app");

    app.innerHTML = `
        <div id="landing">
            <div id="top-bar">
                <img src="/public/images/logo/kinnor-prototype.svg" alt="Kinnor" id="landing-logo" style="height: clamp(40px, 5vw, 70px); position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);" />
            </div>

            <div id="landing-tagline-area">
                <h1 id="landing-tagline">The intuitive way to understand music theory: fast, fun and free.</h1>
            </div>

            <div id="piano-area"></div>

            <div id="landing-btn-area">
                <button data-btn="C" class="landing-btn" id="btn-start">Press <span>C</span> To Start Learning</button>

                <button data-btn="E" class="landing-btn" id="btn-login">Press <span>E</span> If You Have An Account</button>
            </div>
        </div>
    `;
    logoClick();

    const selectedNote = buildPiano("piano-area");

    const startBtn = document.querySelector("[data-btn='C']");
    const loginBtn = document.querySelector("[data-btn='E']");

    document.querySelector(".piano-wrapper").addEventListener("click", (e) => {
        const note = e.target.closest("button")?.dataset.note;
        if (note === "C") {
            renderOnboarding();
        }

        if (note === "E") {
            renderLogin();
        }
    });
}