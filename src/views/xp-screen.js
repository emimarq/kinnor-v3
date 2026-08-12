// ./src/views/xp-screen.js

import "../styles/xp-screen.css";
import { renderLessonTree } from "./lessonTree";
import { getFunFact } from "../components/encourage/fun-facts";
import { getValidation } from "../components/encourage/validation-words";

export function renderXpScreen(stats = {}) {
    const {
        xp = 15,
        streak = 3,
        lessonsCompleted = 12,
        fact = getFunFact(),
        validation = getValidation()
    } = stats;

    const app = document.getElementById("app");

    app.innerHTML = `
        <div id="xp-screen-container">
            <div class="xp-card">
                <div class="xp-header">
                    <div class="xp-badge-icon">
                        <i class="fa-solid fa-trophy"></i>
                    </div>
                    <div class="xp-header-text">
                        <h2>Lesson Completed!</h2>
                        <p class="xp-subtitle">${validation}</p>
                    </div>
                </div>

                <div class="xp-stats-container">
                    <div class="xp-stat-item">
                        <i class="fa-solid fa-bolt xp-icon-bolt"></i>
                        <div class="xp-stat-details">
                            <span class="xp-stat-value">+${xp}</span>
                            <span class="xp-stat-label">XP Earned</span>
                        </div>
                    </div>

                    <div class="xp-stat-item">
                        <i class="fa-solid fa-fire xp-icon-fire"></i>
                        <div class="xp-stat-details">
                            <span class="xp-stat-value">${streak}</span>
                            <span class="xp-stat-label">Day Streak</span>
                        </div>
                    </div>

                    <div class="xp-stat-item">
                        <i class="fa-solid fa-list-check xp-icon-check"></i>
                        <div class="xp-stat-details">
                            <span class="xp-stat-value">${lessonsCompleted}</span>
                            <span class="xp-stat-label">Lessons</span>
                        </div>
                    </div>
                </div>

                <div class="xp-fact-box">
                    <div class="xp-fact-header">
                        <i class="fa-solid fa-lightbulb"></i>
                        <span>Did you know?</span>
                    </div>
                    <p>${fact}</p>
                </div>

                <div id="xp-lesson-feedback-btn">How was this lesson? <span><i>Tell us.</i></span></div>

                <button id="xp-continue-btn">Continue</button>
            </div>
        </div>
    `;
    document.getElementById("xp-lesson-feedback-btn")?.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        //renderLessonFeedback();
        console.log("Feedback")
    });


    document.getElementById("xp-continue-btn")?.addEventListener("click", () => {
        renderLessonTree();
    });
}