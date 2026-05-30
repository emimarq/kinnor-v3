// src/views/onboarding.js

import "../styles/onboarding.css";
import { renderLessonTree } from "./lessonTree";
import { renderSignup } from "./signup";
import keyboWaving from "../../public/images/mascot/Keybo-test.svg"

export function renderOnboarding() {
    const app = document.getElementById("app");

    let currentIndex = 0;

    const onboardPrompts = [
        {
            text: "Hi, I'm Keybo! I'll be your guide to music theory. Let's answer a few questions.",
            btnTxt: "Let's Go!",
            proceed: true,
            animate: keyboWaving
        },
        {
            key: "instrument",
            text: "What do you play?",
            options: ["Keys", "Fretted Instrument", "Wind Instrument", "Percussion", "Strings", "None yet"],
            btnTxt: "Continue"
        },
        {
            key: "goal",
            text: "What's your goal?",
            options: ["Understand music better", "Write my own songs", "Read sheet music", "Just curious"],
            btnTxt: "Continue"
        },
        {
            key: "knowledge",
            text: "How much do you already know?",
            options: ["I'm brand new", "I know a little", "I know the basics", "I can jam with others", "I write my own music"],
            btnTxt: "Continue"
        },
        {
            key: "practice",
            text: "How much can you practice daily?",
            options: ["5 minutes", "10 minutes", "30 minutes", "45 minutes", "1 hour"],
            btnTxt: "Continue"
        },
        {
            key: "age",
            text: "What is your age?",
            options: ["6-12", "13-17", "18-24", "25-34", "35-44", "45-54", "55+"],
            btnTxt: "Continue",
        },
        {
            key: "referral",
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
    let userResponses = {};
    let optionSelected = null;

    function updateProgressBar() {
        const fill = document.querySelector("#progress-bar-fill");
        const percent = (currentIndex / (onboardPrompts.length)) * 100;
        fill.style.width = percent + "%";
    }


    function render() {
        playArea.innerHTML = `
            <h2>${onboardPrompts[currentIndex].text}</h2>
            <div id="gif-area-container">
                <img src="${onboardPrompts[currentIndex].animate}" />
            </div>
            <div id="choices-area"></div>
            <div class="onboarding-btn-area">
                <button id="onboarding-cont-btn">${onboardPrompts[currentIndex].btnTxt}</button>
            </div>
        `;

        const gifArea = document.querySelector("#gif-area-container");
        if (!onboardPrompts[currentIndex].animate) {
            gifArea.style.display = "none";
        }

        const continueBtn = document.querySelector("#onboarding-cont-btn");

        if (onboardPrompts[currentIndex].proceed) {
            continueBtn.disabled = false;
        } else {
            continueBtn.disabled = true;
        }

        continueBtn.addEventListener("click", next);

        optionSelected = null;
        renderOptions();

        updateProgressBar();
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

        gatherResponses();
    }

    function next() {
        //localStorage.setItem("userProfile", JSON.stringify(userResponses));

        playArea.classList.remove("onboard-in-right");
        playArea.classList.add("onboard-out-left");

        setTimeout(() => {
            currentIndex++;
            if (currentIndex === onboardPrompts.length) {
                updateProgressBar();
                setTimeout(() => {
                    renderSignup();
                }, 550)
                return;
            }
            playArea.classList.remove("onboard-out-left");
            render();
            playArea.classList.add("onboard-in-right");
        }, 450);
    }

    render();

    function gatherResponses() {
        const choices = document.querySelectorAll(".choices");

        choices.forEach((choice) => {
            const continueBtn = document.querySelector("#onboarding-cont-btn");

            choice.addEventListener("click", (e) => {
                if (optionSelected) {
                    optionSelected.classList.remove("option-selected");
                }
                optionSelected = e.target;
                optionSelected.classList.add("option-selected");
                continueBtn.disabled = false;

                userResponses[onboardPrompts[currentIndex].key] = e.target.textContent;
                console.log(userResponses);
            })
        })
    }
}