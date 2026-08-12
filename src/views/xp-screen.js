// ./src/views/xp-screen.js

import "../styles/xp-screen.css";
import { renderLessonTree } from "./lessonTree";

export function renderXpScreen(stats = { xp: 15, streak: 3, lessonsCompleted: 12, fact: "Music notation originally developed in the Middle Ages using neumes." }) {
    const app = document.getElementById("app");

    app.innerHTML = `
        <div id="xp-screen-container">
            <div class="xp-card">
                <div class="xp-header">
                    <div class="xp-badge-icon">
                        <i class="fa-solid fa-trophy"></i>
                    </div>
                    <h2>Lesson Completed!</h2>
                    <p class="xp-subtitle">You're making great progress!</p>
                </div>

                <div class="xp-stats-container">
                    <div class="xp-stat-item">
                        <i class="fa-solid fa-bolt xp-icon-bolt"></i>
                        <div class="xp-stat-details">
                            <span class="xp-stat-value">+${stats.xp}</span>
                            <span class="xp-stat-label">XP Earned</span>
                        </div>
                    </div>

                    <div class="xp-stat-item">
                        <i class="fa-solid fa-fire xp-icon-fire"></i>
                        <div class="xp-stat-details">
                            <span class="xp-stat-value">${stats.streak}</span>
                            <span class="xp-stat-label">Day Streak</span>
                        </div>
                    </div>

                    <div class="xp-stat-item">
                        <i class="fa-solid fa-list-check xp-icon-check"></i>
                        <div class="xp-stat-details">
                            <span class="xp-stat-value">${stats.lessonsCompleted}</span>
                            <span class="xp-stat-label">Lessons Completed</span>
                        </div>
                    </div>
                </div>

                <div class="xp-fact-box">
                    <div class="xp-fact-header">
                        <i class="fa-solid fa-lightbulb"></i>
                        <span>Did you know?</span>
                    </div>
                    <p>${stats.fact}</p>
                </div>

                <button id="xp-continue-btn">Continue</button>
            </div>
        </div>
    `;

    document.getElementById("xp-continue-btn")?.addEventListener("click", () => {
        renderLessonTree();
    });
}