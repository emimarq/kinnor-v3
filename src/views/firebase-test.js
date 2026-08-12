import { signUp, signIn } from "../utils/log-sign.js"
import { createUserDocuments, getUserDocument } from "../utils/db.js"
import "../styles/testing.css";

console.log(createUserDocuments);

export function renderTesting() {
    const app = document.getElementById("app");

    app.innerHTML = `
    <div class="container">
        <input name="email" type="email" placeholder="you@example.com"/>
        <input name="password" type="password" placeholder="password"/>
        <button id="submit-btn">Submit</button>
        <button id="log-in-btn">Log In</button>
        <div id="error-box"></div>
    </div>
    `
    const email = document.querySelector('[name="email"]');
    const password = document.querySelector('[name="password"]');
    const errorBox = document.getElementById("error-box");

    const submitBtn = document.getElementById("submit-btn");
    submitBtn.addEventListener("click", async () => {
        try {
            const userCredential = await signUp(email.value, password.value);
            console.log(`Successful sign up as: ${userCredential.user.uid}`);
            await createUserDocuments(userCredential.user.uid);
        } catch (error) {
            console.error(error);
            //alert("Email already in use.");
            errorBox.innerHTML = `<h4>Email already in use.</h4>`;
        }
    })

    const logInBtn = document.getElementById("log-in-btn");
    logInBtn.addEventListener("click", async () => {
        try {
            const userCredential = await signIn(email.value, password.value);
            console.log(`Logged in as: ${userCredential.user.uid}`);
            errorBox.innerHTML = `Logged in as: ${userCredential.user.uid}`;
            const snapshot = await getUserDocument(userCredential.user.uid);
            console.log(snapshot);
        } catch (error) {
            console.log(error.code);
            errorBox.innerHTML = `<h4>Email or password is wrong.</h4>`;
        }
    })
}