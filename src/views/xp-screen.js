// ./src/utils/showXpScreen.js

export function renderXpScreen(earnedXP = null) {
    return new Promise((resolve) => {
        const wrapper = document.createElement('div');
        wrapper.classList.add('xp-screen-wrapper');

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = './src/styles/xp-screen.css';
        document.head.appendChild(link);

        link.onload = async () => {
            const totalXp = await getXp();
            const earned = Number.isFinite(earnedXP) ? Number(earnedXP) : 0;
            const displayXp = earned > 0 ? `+${earned}` : `0`;

            const userRef = doc(db, 'users', auth.currentUser.uid);
            const snap = await getDoc(userRef);
            const data = snap.exists() ? snap.data() : {};
            const lessonsCompleted = data.lessonsCompleted?.length || 0;
            const streak = data.streak || 0;

            wrapper.innerHTML = `
                <div class="xp-container">
                    <div class="xp-art-area">
                        <div class="xp-badge-glow">
                            <i class="fa-solid fa-trophy xp-trophy-icon"></i>
                        </div>
                        <h2>Lesson Completed!</h2>
                        <p class="xp-validation-text">${validations.getRandomValidation()}</p>
                    </div>

                    <div class="xp-stats-grid">
                        <div class="xp-stat-card">
                            <i class="fa-solid fa-bolt stat-icon xp-bolt"></i>
                            <div class="stat-info">
                                <span class="stat-value">${displayXp}</span>
                                <span class="stat-label">XP Earned</span>
                            </div>
                        </div>

                        <div class="xp-stat-card">
                            <i class="fa-solid fa-fire stat-icon xp-fire"></i>
                            <div class="stat-info">
                                <span class="stat-value">${streak}</span>
                                <span class="stat-label">Day Streak</span>
                            </div>
                        </div>

                        <div class="xp-stat-card">
                            <i class="fa-solid fa-list-check stat-icon xp-check"></i>
                            <div class="stat-info">
                                <span class="stat-value">${lessonsCompleted}</span>
                                <span class="stat-label">Lessons Completed</span>
                            </div>
                        </div>
                    </div>

                    <div class="facts-area">
                        <div class="facts-box">
                            <div class="fact-header">
                                <i class="fa-solid fa-lightbulb"></i>
                                <h3>Did you know?</h3>
                            </div>
                            <p>${getRandomFact()}</p>
                        </div>
                    </div>

                    <button class="xp-continue-btn">Continue</button>
                </div>
            `;

            wrapper.querySelector('.xp-continue-btn').onclick = function () {
                window.showLessonTree();
            };

            resolve(wrapper);
        };
    });
};