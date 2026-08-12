import "../styles/course-map.css";
import { lessonRegistry } from "../lessons/lesson-registry";
import { renderLessonTree } from "./lessonTree";

export function renderCourseMap() {
    const app = document.getElementById("app");

    app.innerHTML = `
        <div id="course-map-container">
            <div id="course-map-exit-btn" class="fa-solid fa-angle-left"></div>
            ${lessonRegistry.map(unit => `
                <details class="unit-card">
                    <summary class="unit-header">
                        <h4>${unit.unitName}</h4>
                    </summary>
                    <div class="topics-wrapper">
                        ${Object.entries(unit.lessons).map(([topicTitle, lessons]) => `
                            <details class="topic-card">
                                <summary class="topic-header">
                                    <h5>${topicTitle}</h5>
                                </summary>
                                <div class="lessons-wrapper">
                                    ${lessons.map(lesson => `
                                        <div class="lesson-card">
                                            <h6>${lesson.lessonTitle}</h6>
                                            <p>${lesson.lessonSummary}</p>
                                        </div>
                                    `).join("")}
                                </div>
                            </details>
                        `).join("")}
                    </div>
                </details>
            `).join("")}
        </div>
    `;

    const exitBtn = document.getElementById("course-map-exit-btn");
    exitBtn.addEventListener("click", () => {
        renderLessonTree();
    });
}