// src/views/onboarding.js

import "../styles/onboarding.css";
import { renderLessonTree } from "./lessonTree";
import { renderSignup } from "./signup";


export function renderOnboarding() {
    const app = document.getElementById("app");

    let currentIndex = 0;

    const onboardPrompts = [
        {
            text: "Learn Music Theory by playing. First, a few questions.",
            btnTxt: "Let's Go!"
        },
        {
            text: "What do you play?",
            options: ["Keys", "Fretted Instrument", "Wind Instrument", "Percussion", "Strings", "None yet"],
            btnTxt: "Continue"
        },
        {
            text: "What's your goal?",
            options: ["Understand music better", "Write my own songs", "Read sheet music", "Just curious"],
            btnTxt: "Continue"
        },
        {
            text: "How much do you already know?",
            options: ["I'm brand new", "I know a little", "I know the basics", "I can jam with others", "I write my own music"],
            btnTxt: "Continue"
        },
        {
            text: "How much can you practice daily?",
            options: ["5 minutes", "10 minutes", "30 minutes", "45 minutes", "1 hour"],
            btnTxt: "Continue"
        },
        {
            text: "How did you hear about us?",
            options: ["Social media", "Search engine", "A friend", "YouTube", "Other"],
            btnTxt: "Wrap things up!"
        }
    ]



    app.innerHTML = `
        <div id="onboarding-container">
            <div id="progress-bar">
                <div id="progress-bar-fill"></div>
            </div>

            <div id="onboard-play-area">
                <h2>${onboardPrompts[currentIndex].text}</h2>

                <div class="onboarding-btn-area">
                    <button id="onboarding-cont-btn">${onboardPrompts[currentIndex].btnTxt}</button>
                </div>
            </div>
        </div>
    `

    const playArea = document.querySelector("#onboard-play-area");



    function render() {
        playArea.innerHTML = `
            <h2>${onboardPrompts[currentIndex].text}</h2>
            <div id="choices-area"></div>
            <div class="onboarding-btn-area">
                <button id="onboarding-cont-btn">${onboardPrompts[currentIndex].btnTxt}</button>
            </div>
        `;
        renderOptions();
        document.querySelector("#onboarding-cont-btn").addEventListener("click", next);
    }

    function renderOptions() {
        if (onboardPrompts[currentIndex].options) {
            const choicesArea = document.querySelector("#choices-area");

            onboardPrompts[currentIndex].options.forEach((option) => {
                const choice = document.createElement("div");
                choice.classList.add("choices");
                choice.textContent = option;
                choicesArea.appendChild(choice);
            })
        }
    }

    function next() {
        playArea.classList.remove("onboard-in-right");
        playArea.classList.add("onboard-out-left");

        setTimeout(() => {
            currentIndex++;
            if (currentIndex === onboardPrompts.length) {
                renderSignup();
            }
            playArea.classList.remove("onboard-out-left");
            render();
            playArea.classList.add("onboard-in-right");
        }, 450);
    }

    render();
}