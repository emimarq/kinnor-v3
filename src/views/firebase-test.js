import { signUp, signIn } from "../utils/log-sign.js"

export function renderTesting() {
    const app = document.getElementById("app");

    app.innerHTML = `
        <input name="email" type="email" placeholder="you@example.com"/>
        <input name="password" type="password" placeholder="password"/>
        <button id="submit-btn">Submit</button>
        <button id="log-in-btn">Log In</button>
    `
    const email = document.querySelector('[name="email"]');
    const password = document.querySelector('[name="password"]');

    const submitBtn = document.getElementById("submit-btn");
    submitBtn.addEventListener("click", async () => {
        try {
        const idkName = await signUp(email.value, password.value);
        console.log(idkName.user.uid);
        } catch (error) {
            console.error(error.code);
            alert("Email already in use.");
        }
    })

    const logInBtn = document.getElementById("log-in-btn");
    logInBtn.addEventListener("click", async () => {
        try {
            const x = await signIn(email.value, password.value);
            console.log(`Logged in as: ${x.user.uid}`);
        } catch (error) {
            console.log(error.code);
            alert("Password or email is incorrect.")
        }
    })
}