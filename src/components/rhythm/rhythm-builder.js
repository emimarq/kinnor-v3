import "../../styles/rhythm-builder.css"

export function playRhythm(targetId, bpm = 120, timeSig = "4/4") {
    const app = document.getElementById(targetId);

    // Normalize timeSig format and extract top number (beats per measure)
    let beatsPerMeasure = 4;
    let displayTimeSig = String(timeSig);

    if (typeof timeSig === "string" && timeSig.includes("/")) {
        const [numerator] = timeSig.split("/");
        beatsPerMeasure = parseInt(numerator, 10) || 4;
    } else if (typeof timeSig === "number") {
        beatsPerMeasure = Math.round(timeSig) || 4;
        displayTimeSig = `${beatsPerMeasure}/4`;
    }

    // Build DOM structure dynamically based on beatsPerMeasure
    let beatIndicatorsHTML = '<div id="beat-indicators">';
    for (let i = 0; i < beatsPerMeasure; i++) {
        beatIndicatorsHTML += `<div class="beat-circle" data-beat="${i}"></div>`;
    }
    beatIndicatorsHTML += '</div>';

    app.innerHTML = `
        ${beatIndicatorsHTML}
        <div id="feedback-container"></div>
        <div id="time-signature-display">${displayTimeSig}</div>
        <button id="start">Start / Stop</button>
        <button id="tap">TAP</button>
    `;

    let audioCtx;
    let lastBeatTime = 0;
    let timer = null;
    let currentBeatIndex = 0;

    const beatCircles = app.querySelectorAll(".beat-circle");
    const feedbackContainer = document.getElementById("feedback-container");

    function playBeep() {
        beatCircles.forEach((circle, idx) => {
            if (idx === currentBeatIndex) {
                circle.classList.add("active");
            } else {
                circle.classList.remove("active");
            }
        });

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        // Accent tone on beat 1
        osc.frequency.value = currentBeatIndex === 0 ? 880 : 440;

        gain.gain.setValueAtTime(1, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);

        osc.start();
        osc.stop(audioCtx.currentTime + 0.1);

        lastBeatTime = audioCtx.currentTime;
        currentBeatIndex = (currentBeatIndex + 1) % beatsPerMeasure;
    }

    function showFloatingFeedback(text, ratingClass) {
        const popup = document.createElement("div");
        popup.className = `feedback-popup ${ratingClass}`;
        popup.textContent = text;
        feedbackContainer.appendChild(popup);

        popup.addEventListener("animationend", () => {
            popup.remove();
        });
    }

    document.getElementById('start').onclick = () => {
        if (!audioCtx) audioCtx = new AudioContext();

        if (timer) {
            clearInterval(timer);
            timer = null;
            currentBeatIndex = 0;
            beatCircles.forEach(circle => circle.classList.remove("active"));
        } else {
            currentBeatIndex = 0;
            playBeep();
            const intervalMs = 60000 / bpm;
            timer = setInterval(playBeep, intervalMs);
        }
    };

    document.getElementById('tap').onclick = () => {
        if (!timer) return;

        const userTapTime = audioCtx.currentTime;
        const beatIntervalSec = 60 / bpm;
        let timeDifference = userTapTime - lastBeatTime;

        if (timeDifference > beatIntervalSec / 2) {
            timeDifference -= beatIntervalSec;
        }

        const absDiff = Math.abs(timeDifference);

        if (absDiff <= 0.08) {
            showFloatingFeedback("PERFECT", "perfect");
        } else if (absDiff <= 0.18) {
            showFloatingFeedback("GOOD", "good");
        } else if (timeDifference > 0.18) {
            showFloatingFeedback("LATE", "late");
        } else {
            showFloatingFeedback("MISS", "miss");
        }
    };

    return function stopRhythm() {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
        if (audioCtx) {
            audioCtx.close();
        }
    };
}