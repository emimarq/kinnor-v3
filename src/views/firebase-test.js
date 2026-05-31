import { signUp, signIn } from "../utils/log-sign.js"

export function renderTesting() {
    const app = document.getElementById("app");

    app.innerHTML = `
        <input name="email" type="email" placeholder="you@example.com"/>
        <input name="password" type="password" placeholder="password"/>
        <button id="submit-btn">Submit</button>
    `
}