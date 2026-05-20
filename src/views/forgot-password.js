// src/views/forgot-password.js

import "../styles/forms.css";
import { renderLogin } from "./login";
import { logoClick } from "../components/behavior/logo-click";

export function renderForgotPassword() {
    const app = document.getElementById("app");

    app.innerHTML = `
        <div id="login-container">
            <div id="top-bar">
                <img src="/public/images/logo/kinnor-prototype.svg" alt="Kinnor" id="landing-logo" style="height: clamp(20px, 5vw, 50px); position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);" />
            </div>
            <h2>Reset password</h2>

            <p id="reset-msg">Enter your email and we'll send you a reset link.</p>

            <div class="form-group">
                <input type="email" id="email" placeholder="you@example.com" />
            </div>

            <div id="error-msg"></div>

            <button id="reset-btn" type="button">Send reset link</button>

            <div id="login-links">
                <a href="#" id="login-link">Back to sign in</a>
            </div>
        </div>
    `;

    logoClick();

    document.getElementById("reset-btn").addEventListener("click", async () => {
        const email = document.getElementById("email").value;
        const errorMsg = document.getElementById("error-msg");
        const resetMsg = document.getElementById("reset-msg");

        if (!email) {
            errorMsg.textContent = "Please enter your email.";
            return;
        }

        // Firebase skeleton
        try {
            // await sendPasswordResetEmail(auth, email);
            errorMsg.textContent = "";
            resetMsg.textContent = "Reset link sent! Check your inbox.";
            document.getElementById("reset-btn").disabled = true;
        } catch (err) {
            errorMsg.textContent = err.message;
        }
    });

    document.getElementById("login-link").addEventListener("click", (e) => {
        e.preventDefault();
        renderLogin();
    });
}