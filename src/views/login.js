import "../styles/forms.css";
import { renderSignup } from "./signup";
import { renderForgotPassword } from "./forgot-password";
import { logoClick } from "../components/behavior/logo-click";

export function renderLogin() {
    const app = document.getElementById("app");

    app.innerHTML = `
        <div id="login-container">
            <div class="form-card">
                <div class="form-header">
                    <img src="/public/images/logo/kinnor-prototype.svg" alt="Kinnor" id="landing-logo" class="form-logo" />
                    <h2>Sign in</h2>
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

                <div id="error-msg"></div>

                <button id="login-btn" type="button">Sign in</button>

                <div id="login-links">
                    <a href="#" id="forgot-link">Forgot password?</a>
                    <a href="#" id="signup-link">Don't have an account? Sign up</a>
                </div>
            </div>
        </div>
    `;

    logoClick();

    document.getElementById("toggle-pw").addEventListener("click", () => {
        const pw = document.getElementById("password");
        const btn = document.getElementById("toggle-pw");
        if (pw.type === "password") {
            pw.type = "text";
            btn.textContent = "Hide";
        } else {
            pw.type = "password";
            btn.textContent = "Show";
        }
    });

    document.getElementById("signup-link").addEventListener("click", (e) => {
        e.preventDefault();
        renderSignup();
    });

    document.getElementById("forgot-link").addEventListener("click", (e) => {
        e.preventDefault();
        renderForgotPassword();
    });
}