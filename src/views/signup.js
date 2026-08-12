import "../styles/forms.css";
import { renderLogin } from "./login";
import { logoClick } from "../components/behavior/logo-click";

export function renderSignup() {
    const app = document.getElementById("app");

    app.innerHTML = `
        <div id="login-container">
            <div class="form-card">
                <div class="form-header">
                    <img src="/public/images/logo/kinnor-prototype.svg" alt="Kinnor" id="landing-logo" class="form-logo" />
                    <h2>Create account</h2>
                </div>

                <div class="form-group">
                    <input type="email" id="email" placeholder="you@example.com" />
                </div>

                <div class="form-group">
                    <div class="password-wrapper">
                        <input type="password" id="password" placeholder="password" />
                        <button id="toggle-pw" class="toggle-pw-btn" type="button" aria-label="Show password">Show</button>
                    </div>
                </div>

                <div class="form-group">
                    <div class="password-wrapper">
                        <input type="password" id="confirm-password" placeholder="confirm password" />
                        <button id="toggle-confirm-pw" class="toggle-pw-btn" type="button" aria-label="Show password">Show</button>
                    </div>
                </div>

                <div id="error-msg"></div>

                <button id="signup-btn" type="button">Create account</button>

                <div id="login-links">
                    <a href="#" id="login-link">Already have an account? Sign in</a>
                </div>
            </div>
        </div>
    `;

    logoClick();

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