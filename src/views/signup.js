import { renderLogin } from "./login";
import { logoClick } from "../components/behavior/logo-click";

export function renderSignup() {
    const app = document.getElementById("app");

    app.innerHTML = `
        <div id="login-container">
            <div id="top-bar">
                <img src="/public/images/logo/kinnor-prototype.svg" alt="Kinnor" id="landing-logo" style="height: clamp(20px, 5vw, 50px); position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);" />
            </div>
            <h2>Create account</h2>

            <div class="form-group">
                <input type="email" id="email" placeholder="you@example.com" />
            </div>

            <div class="form-group">
                <div class="password-wrapper">
                    <input type="password" id="password" placeholder="password" />
                    <button id="toggle-pw" type="button" aria-label="Show password">Show</button>
                </div>
            </div>

            <div class="form-group">
                <div class="password-wrapper">
                    <input type="password" id="confirm-password" placeholder="confirm password" />
                    <button id="toggle-confirm-pw" type="button" aria-label="Show password">Show</button>
                </div>
            </div>

            <div id="error-msg"></div>

            <button id="signup-btn" type="button">Create account</button>

            <div id="login-links">
                <a href="#" id="login-link">Already have an account? Sign in</a>
            </div>
        </div>
    `;
    logoClick();

    // Show/hide password
    document.getElementById("toggle-pw").addEventListener("click", () => {
        const pw = document.getElementById("password");
        const btn = document.getElementById("toggle-pw");
        pw.type = pw.type === "password" ? "text" : "password";
        btn.textContent = pw.type === "password" ? "Show" : "Hide";
    });

    document.getElementById("toggle-confirm-pw").addEventListener("click", () => {
        const pw = document.getElementById("confirm-password");
        const btn = document.getElementById("toggle-confirm-pw");
        pw.type = pw.type === "password" ? "text" : "password";
        btn.textContent = pw.type === "password" ? "Show" : "Hide";
    });

    document.getElementById("login-link").addEventListener("click", (e) => {
        e.preventDefault();
        renderLogin();
    });
}