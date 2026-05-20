// src/components/behavior/logo-click.js

import { renderLanding } from "../../views/landing"

export function logoClick() {
    document.querySelector("#landing-logo").addEventListener("click", () => {
        renderLanding();
    })
}