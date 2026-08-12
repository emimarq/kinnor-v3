// src/views/lesonTree.js

import "../styles/lessonTree.css"
import { lessonRegistry } from "../lessons/lesson-registry";
import { renderCourseMap } from "./course-map";
import { renderLessonPlayer } from "./lesson-player";

export function renderLessonTree() {
    const app = document.getElementById("app");

    let currentUnitIndex = 0;
    let currentTopicIndex = 2;
    let currentLessonIndex = 0;

    const currentUnit = lessonRegistry[currentUnitIndex];
    const topicKeys = Object.keys(currentUnit.lessons);
    const currentTopic = topicKeys[currentTopicIndex];

    const currentLesson = currentUnit.lessons[currentTopic][currentLessonIndex];

    app.innerHTML = `
        <div id="lessons-tree-container">
            <nav id="top-navbar">
                <h3>Kinnor</h3>
                <div id="stats-area">
                    <div id="hearts" class="fa-solid fa-heart stats-container"></div>
                    <div id="streak" class="fa-solid fa-fire stats-container"></div>
                    <div id="store" class="fa-solid fa-shop stats-container"></div>
                </div>

                <div id="roadmap-area">
                    <div class="fa-solid fa-bars"></div>
                    <h4 id="roadmap-hud">${currentUnit.unitName}</h4>
                </div>
            </nav>

            <main>
                <div id="topic-text"><h4>${currentTopic}</h4></div>
                <div id="lessons-container"></div>
            </main>

            <nav id="bottom-navbar">
                <div id="bottom-nav-items">
                    <div id="learn" class="fa-solid fa-graduation-cap stats-container"></div>
                    <div id="user-profile" class="fa-solid fa-user stats-container"></div>
                    <div id="leaderboards" class="fa-solid fa-ranking-star stats-container"></div>
                </div>
            </nav>
        </div>
    `;

    const lessonsContainer = document.getElementById("lessons-container");

    const pos = ["center", "left", "center", "right"];

    for (let i = 0; i < currentUnit.lessons[currentTopic].length; i++) {
        const lesson_item = document.createElement("div");
        let p = pos[i % pos.length];
        lesson_item.className = `lesson-item ${p} `;
        lesson_item.dataset.data = i + 0;

        lessonsContainer.appendChild(lesson_item);

        const lesson_item_icon = document.createElement("div");
        lesson_item_icon.className = "lesson-item-icon fa-solid fa-play";

        lesson_item.appendChild(lesson_item_icon);
    }

    const lesson_items = document.querySelectorAll(".lesson-item");
    lesson_items.forEach((i) => {
        i.addEventListener("click", (e) => {
            const existingWindow = document.querySelector(".lesson-window");
            if (existingWindow) {
                existingWindow.remove();
            }
            
            const currentSelectedLessonIndex = e.target.closest(".lesson-item").dataset.data;
            const selectedLesson = currentUnit.lessons[currentTopic][currentSelectedLessonIndex];

            const lessonWindow = document.createElement("div");
            lessonWindow.classList.add("lesson-window");

            lessonWindow.innerHTML = `
                    <h4>${selectedLesson.lessonTitle}</h4>
                    <p>${selectedLesson.lessonSummary}</p>

                    <div id="lesson-window-btns">
                        <button id="lesson-window-continue-btn">Continue</button>
                        <button id="lesson-window-cancel-btn">Cancel</button>
                    </div>
            `;

            lessonsContainer.appendChild(lessonWindow);

            const cancelBtn = lessonWindow.querySelector("#lesson-window-cancel-btn");
            const continueBtn = lessonWindow.querySelector("#lesson-window-continue-btn");

            cancelBtn.addEventListener("click", () => {
                lessonWindow.remove();
            });

            continueBtn.addEventListener("click", () => {
                app.innerHTML = '';
                setTimeout(() => {
                    renderLessonPlayer(selectedLesson);
                }, 200)
            });
        });
    });
    const roadmapBtn = document.getElementById("roadmap-area");
    const learnBtn = document.getElementById("learn");
    const userProfileBtn = document.getElementById("user-profile");
    const leaderboardsBtn = document.getElementById("leaderboards");

    roadmapBtn.addEventListener("click", () => {
        renderCourseMap();
    });

    learnBtn.addEventListener("click", () => {
        renderLessonTree();
    })

    userProfileBtn.addEventListener("click", () => {
        //renderStreak();
    })

    leaderboardsBtn.addEventListener("click", () => {
        //renderLeaderboards();
    })
}