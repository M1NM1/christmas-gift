// Snowfall Logic
const snowContainer = document.getElementById('snow-container');

function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');

    // Random properties
    const size = Math.random() * 5 + 3 + 'px'; // 3px to 8px
    const startPosition = Math.random() * 100 + 'vw';
    const duration = Math.random() * 5 + 5 + 's'; // 5s to 10s
    const delay = Math.random() * 5 + 's';
    const opacity = Math.random() * 0.5 + 0.3;

    snowflake.style.width = size;
    snowflake.style.height = size;
    snowflake.style.left = startPosition;
    snowflake.style.animationDuration = duration;
    snowflake.style.animationDelay = delay;
    snowflake.style.opacity = opacity;

    snowContainer.appendChild(snowflake);

    // Remove snowflake after animation ends to keep DOM clean
    setTimeout(() => {
        snowflake.remove();
    }, parseFloat(duration) * 1000 + parseFloat(delay) * 1000);
}

// Create initial batch of snowflakes
for (let i = 0; i < 50; i++) {
    createSnowflake();
}

// Continue creating snowflakes
setInterval(createSnowflake, 300);


// Countdown Logic
function updateCountdown() {
    const now = new Date();
    let currentYear = now.getFullYear();
    let christmas = new Date(currentYear, 11, 25); // Month is 0-indexed (11 = Dec)

    if (now.getMonth() === 11 && now.getDate() > 25) {
        christmas.setFullYear(currentYear + 1);
    }

    const diff = christmas - now;

    // Calculate time units
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    // Pad with zeros and display
    document.getElementById('days').innerText = days < 10 ? '0' + days : days;
    document.getElementById('hours').innerText = hours < 10 ? '0' + hours : hours;
    document.getElementById('minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
    document.getElementById('seconds').innerText = seconds < 10 ? '0' + seconds : seconds;
}

setInterval(updateCountdown, 1000);
updateCountdown();


// Tree Lights Logic
const treeContainer = document.getElementById('tree-container');
const initialView = document.getElementById('initial-view');
const giftBtn = document.getElementById('gift-btn');
const modal = document.getElementById('message-modal');
const closeBtn = document.getElementById('close-modal');
const totalLights = 15;
let lightsOnCount = 0;

// Fixed positions for lights to look good on the tree (approximate % of container)
const lightPositions = [
    { top: '15%', left: '48%' }, // Top
    { top: '25%', left: '42%' },
    { top: '28%', left: '55%' },
    { top: '35%', left: '38%' },
    { top: '38%', left: '50%' },
    { top: '40%', left: '62%' },
    { top: '50%', left: '30%' },
    { top: '52%', left: '45%' },
    { top: '54%', left: '60%' },
    { top: '55%', left: '72%' },
    { top: '65%', left: '25%' },
    { top: '68%', left: '40%' },
    { top: '70%', left: '55%' },
    { top: '72%', left: '75%' },
    { top: '80%', left: '50%' }, // Bottom Center
];

// Colors for lights
const lightColors = ['#ff0000', '#ffd700', '#00ff00', '#00ffff', '#ff00ff', '#ffffff'];

function createLights() {
    // Clear existing lights if any
    const existingLights = treeContainer.querySelectorAll('.light');
    existingLights.forEach(l => l.remove());
    lightsOnCount = 0;

    lightPositions.forEach((pos, index) => {
        const light = document.createElement('div');
        light.classList.add('light');

        light.style.top = pos.top;
        light.style.left = pos.left;

        // Assign random color data
        light.dataset.color = lightColors[Math.floor(Math.random() * lightColors.length)];

        light.addEventListener('click', function () {
            if (!this.classList.contains('on')) {
                this.classList.add('on');
                this.style.backgroundColor = this.dataset.color;
                this.style.color = this.dataset.color; // For box-shadow currentColor

                lightsOnCount++;
                checkWin();
            }
        });

        treeContainer.appendChild(light);
    });
}

function checkWin() {
    if (lightsOnCount === lightPositions.length) {
        setTimeout(() => {
            showModal();
        }, 800);
    }
}

// Interaction Flow
function init() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const christmasEve = new Date(currentYear, 11, 24); // Dec 24

    // Check if it's Christmas or if there's a debug flag
    const urlParams = new URLSearchParams(window.location.search);
    const isDebug = urlParams.get('debug');
    const isChristmas = now >= christmasEve;

    if (isChristmas || isDebug) {
        giftBtn.innerText = "Decorate Your Tree! 🎄";
        giftBtn.addEventListener('click', () => {
            initialView.classList.add('hidden');
            treeContainer.classList.remove('hidden');
            treeContainer.classList.add('fade-in');
            createLights();
        });
    } else {
        giftBtn.innerText = "Wait for Christmas! 🔒";
        giftBtn.disabled = true;
        giftBtn.title = "Come back on December 24th!";
    }
}

init();

// Modal Functions
function showModal() {
    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.add('visible');
    }, 10);
    confettiEffect(); // Optional: add some extra celebration
}

closeBtn.addEventListener('click', () => {
    modal.classList.remove('visible');
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
});

// Close on outside click
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('visible');
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 300);
    }
});

function confettiEffect() {
    // Simple confetti using existing snowflakes logic but colored? 
    // Or just create a few colored particles
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = '50%';
        particle.style.top = '50%';
        particle.style.width = '10px';
        particle.style.height = '10px';
        particle.style.backgroundColor = lightColors[Math.floor(Math.random() * lightColors.length)];
        particle.style.borderRadius = '50%';
        particle.style.zIndex = '1001';
        particle.style.transition = 'all 1s ease-out';

        document.body.appendChild(particle);

        // Explosion animation
        setTimeout(() => {
            const angle = Math.random() * Math.PI * 2;
            const dist = Math.random() * 200 + 50;
            particle.style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px) scale(0)`;
        }, 50);

        setTimeout(() => {
            particle.remove();
        }, 1200);
    }
}
