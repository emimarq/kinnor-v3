import { signUp, signIn } from "../utils/log-sign.js"

export function renderTesting() {
    const app = document.getElementById("app");

    app.innerHTML = `
        <input name="email" type="email" placeholder="you@example.com"/>
        <input name="password" type="password" placeholder="password"/>
        <button id="submit-btn">Submit</button>
    `
    const email = document.querySelector('[name="email"]');
    const password = document.querySelector('[name="password"]');

    const submitBtn = document.getElementById("submit-btn");
    submitBtn.addEventListener("click", async () => {
        const idkName = await signUp(email.value, password.value);
        console.log(idkName);
    })
}