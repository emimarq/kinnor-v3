import "../styles/testing-responsive.css";

export function renderTesting_responsive() {
    const app = document.getElementById("app");

    app.innerHTML = `
    <div class="test"><h1>Hello</h1></div>
        <div id="testing-container">
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
        </div>
    `
}