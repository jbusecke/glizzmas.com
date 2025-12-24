// REAL Sausage and Red Bull image URLs (actual photos, not emojis!)
const SAUSAGE_IMAGES = [
    'images/sausage1.png',
    'images/sausage2.png',
    'images/sausage3.png',
    'images/sausages/hotdog2.png',
    'images/sausages/sausage4.png'
];

const REDBULL_IMAGES = [
    'images/redbull1.png',
    'images/redbull2.png',
    'images/redbull3.png'
];

// Christmas decoration images for background
const CHRISTMAS_DECOR = [
    'images/decorations/lollipop.png',
    'images/decorations/star.png',
    'images/decorations/gifts.png',
    'images/decorations/holly.png',
    'images/sausage1.png',
    'images/sausage2.png',
    'images/sausage3.png'
];

// Question navigation functions
function showScreen(screenId) {
    // Hide all screens
    const screens = document.querySelectorAll('.question-screen');
    screens.forEach(screen => screen.classList.remove('active'));

    // Show the target screen
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
    }
}

// Question 1: Age Check
function answerQuestion1(isOldEnough) {
    if (isOldEnough) {
        showScreen('question2');
    } else {
        showScreen('rejection1');
    }
}

// Question 2: President
function answerQuestion2(answer) {
    if (answer === 'byron') {
        showScreen('question3');
    } else if (answer === 'scrooge') {
        showScreen('rejection2');
    }
}

// Question 3: Are you Leo?
function answerQuestion3(isLeo) {
    if (isLeo) {
        showScreen('question4');
    } else {
        showScreen('rejection3');
    }
}

// Question 4: Birthday
function answerQuestion4(hadBirthday) {
    if (hadBirthday) {
        showScreen('question5');
    } else {
        showScreen('rejection4');
    }
}

// Question 5: Good Boy?
function answerQuestion5(answer) {
    if (answer === 'good') {
        showScreen('finale-good');
        initializeGoodFinale();
    } else {
        showScreen('finale-bad');
        initializeBadFinale();
    }
}

// ============= GOOD BOY FINALE =============
function initializeGoodFinale() {
    startCursorFollower('cursor-follower-good', '🌭✨🎄🎅');
    launchSausages();
    createSparkleTrail();
}

function startFireworks() {
    const canvas = document.getElementById('fireworks-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];

    function createFirework() {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height * 0.5;
        const colors = ['#ff0000', '#00ff00', '#ffeb3b', '#ff1744', '#00ff00', '#ffd700'];
        const color = colors[Math.floor(Math.random() * colors.length)];

        for (let i = 0; i < 30; i++) {
            const angle = (Math.PI * 2 * i) / 30;
            const velocity = 2 + Math.random() * 3;
            particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * velocity,
                vy: Math.sin(angle) * velocity,
                life: 1,
                color: color
            });
        }
    }

    function animate() {
        if (!document.getElementById('finale-good').classList.contains('active')) {
            return;
        }

        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p, index) => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.1; // gravity
            p.life -= 0.01;

            if (p.life <= 0) {
                particles.splice(index, 1);
            } else {
                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.life;
                ctx.fillRect(p.x, p.y, 3, 3);
            }
        });

        ctx.globalAlpha = 1;
        requestAnimationFrame(animate);
    }

    setInterval(createFirework, 300);
    animate();
}

function createSparkleTrail() {
    const trail = document.querySelector('.sparkle-trail');
    if (!trail) return;

    document.addEventListener('mousemove', (e) => {
        if (!document.getElementById('finale-good').classList.contains('active')) {
            return;
        }

        const sparkle = document.createElement('div');
        sparkle.textContent = ['✨', '⭐', '💫', '🌟'][Math.floor(Math.random() * 4)];
        sparkle.style.position = 'fixed';
        sparkle.style.left = e.clientX + 'px';
        sparkle.style.top = e.clientY + 'px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.fontSize = '24px';
        sparkle.style.animation = 'fadeOut 1s forwards';
        sparkle.style.zIndex = '9999';

        trail.appendChild(sparkle);

        setTimeout(() => sparkle.remove(), 1000);
    });
}

// Launch flying sausages with REAL IMAGES
function launchSausages() {
    const container = document.getElementById('sausage-container');

    // Create 200 sausages for MAXIMUM CHAOS!
    for (let i = 0; i < 200; i++) {
        setTimeout(() => {
            const sausage = document.createElement('div');
            sausage.className = 'flying-object sausage';

            const img = document.createElement('img');
            img.src = SAUSAGE_IMAGES[Math.floor(Math.random() * SAUSAGE_IMAGES.length)];
            img.alt = 'Glizzy!';
            sausage.appendChild(img);

            // Random starting position at the edges
            const startSide = Math.floor(Math.random() * 4);
            let startX, startY;

            switch(startSide) {
                case 0: // Top
                    startX = Math.random() * window.innerWidth;
                    startY = -200;
                    break;
                case 1: // Right
                    startX = window.innerWidth + 200;
                    startY = Math.random() * window.innerHeight;
                    break;
                case 2: // Bottom
                    startX = Math.random() * window.innerWidth;
                    startY = window.innerHeight + 200;
                    break;
                case 3: // Left
                    startX = -200;
                    startY = Math.random() * window.innerHeight;
                    break;
            }

            sausage.style.left = startX + 'px';
            sausage.style.top = startY + 'px';

            // Random destination - make them fly across the screen!
            const destX = (Math.random() - 0.5) * window.innerWidth * 3;
            const destY = (Math.random() - 0.5) * window.innerHeight * 3;

            sausage.style.setProperty('--x', destX + 'px');
            sausage.style.setProperty('--y', destY + 'px');

            // Random animation duration and delay
            sausage.style.animationDuration = (1.5 + Math.random() * 2) + 's';
            sausage.style.animationDelay = (Math.random() * 0.3) + 's';

            container.appendChild(sausage);

            // Remove after animation and create new one
            setTimeout(() => {
                if (sausage.parentNode) {
                    sausage.remove();
                }
            }, 4000);
        }, i * 30); // Stagger creation
    }

    // Keep creating more sausages forever!
    setTimeout(() => {
        if (document.getElementById('finale-good').classList.contains('active')) {
            launchSausages();
        }
    }, 2000);
}

// ============= BAD BOY FINALE =============
function initializeBadFinale() {
    startCursorFollower('cursor-follower-bad', '⚡💀🔥😈');
    startLightning();
    launchRedbulls();
    createElectricTrail();
}

function startLightning() {
    const canvas = document.getElementById('lightning-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function drawLightning() {
        if (!document.getElementById('finale-bad').classList.contains('active')) {
            return;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Random lightning bolts
        if (Math.random() > 0.7) {
            const startX = Math.random() * canvas.width;
            const segments = 10;
            let currentX = startX;
            let currentY = 0;

            ctx.strokeStyle = `rgba(${100 + Math.random() * 155}, ${200 + Math.random() * 55}, 255, 0.8)`;
            ctx.lineWidth = 2 + Math.random() * 3;
            ctx.beginPath();
            ctx.moveTo(currentX, currentY);

            for (let i = 0; i < segments; i++) {
                currentX += (Math.random() - 0.5) * 100;
                currentY += canvas.height / segments;
                ctx.lineTo(currentX, currentY);
            }

            ctx.stroke();
        }

        requestAnimationFrame(drawLightning);
    }

    drawLightning();
}

function createElectricTrail() {
    const trail = document.querySelector('.electric-trail');
    if (!trail) return;

    document.addEventListener('mousemove', (e) => {
        if (!document.getElementById('finale-bad').classList.contains('active')) {
            return;
        }

        const spark = document.createElement('div');
        spark.textContent = ['⚡', '💥', '🔥', '💫'][Math.floor(Math.random() * 4)];
        spark.style.position = 'fixed';
        spark.style.left = e.clientX + (Math.random() - 0.5) * 30 + 'px';
        spark.style.top = e.clientY + (Math.random() - 0.5) * 30 + 'px';
        spark.style.pointerEvents = 'none';
        spark.style.fontSize = '20px';
        spark.style.animation = 'fadeOut 0.5s forwards';
        spark.style.zIndex = '9999';
        spark.style.filter = 'hue-rotate(' + Math.random() * 360 + 'deg)';

        trail.appendChild(spark);

        setTimeout(() => spark.remove(), 500);
    });
}

// Launch flying Red Bulls with REAL IMAGES
function launchRedbulls() {
    const container = document.getElementById('redbull-container');

    // Create 200 Red Bulls for MAXIMUM CHAOS!
    for (let i = 0; i < 200; i++) {
        setTimeout(() => {
            const redbull = document.createElement('div');
            redbull.className = 'flying-object redbull';

            const img = document.createElement('img');
            img.src = REDBULL_IMAGES[Math.floor(Math.random() * REDBULL_IMAGES.length)];
            img.alt = 'Red Bull!';
            redbull.appendChild(img);

            // Random starting position at the edges
            const startSide = Math.floor(Math.random() * 4);
            let startX, startY;

            switch(startSide) {
                case 0: // Top
                    startX = Math.random() * window.innerWidth;
                    startY = -200;
                    break;
                case 1: // Right
                    startX = window.innerWidth + 200;
                    startY = Math.random() * window.innerHeight;
                    break;
                case 2: // Bottom
                    startX = Math.random() * window.innerWidth;
                    startY = window.innerHeight + 200;
                    break;
                case 3: // Left
                    startX = -200;
                    startY = Math.random() * window.innerHeight;
                    break;
            }

            redbull.style.left = startX + 'px';
            redbull.style.top = startY + 'px';

            // Random destination
            const destX = (Math.random() - 0.5) * window.innerWidth * 3;
            const destY = (Math.random() - 0.5) * window.innerHeight * 3;

            redbull.style.setProperty('--x', destX + 'px');
            redbull.style.setProperty('--y', destY + 'px');

            // Random animation duration and delay
            redbull.style.animationDuration = (1.5 + Math.random() * 2) + 's';
            redbull.style.animationDelay = (Math.random() * 0.3) + 's';

            container.appendChild(redbull);

            // Remove after animation
            setTimeout(() => {
                if (redbull.parentNode) {
                    redbull.remove();
                }
            }, 4000);
        }, i * 30); // Stagger creation
    }

    // Keep creating more Red Bulls forever!
    setTimeout(() => {
        if (document.getElementById('finale-bad').classList.contains('active')) {
            launchRedbulls();
        }
    }, 2000);
}

// ============= CURSOR FOLLOWER =============
function startCursorFollower(followerId, emojis) {
    const follower = document.getElementById(followerId);
    if (!follower) return;

    const emojiArray = emojis.split('');
    let currentEmoji = 0;

    // Update emoji periodically
    setInterval(() => {
        follower.textContent = emojiArray[currentEmoji];
        currentEmoji = (currentEmoji + 1) % emojiArray.length;
    }, 200);

    // Follow cursor with delay
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function updateFollower() {
        const finaleScreen = follower.closest('.finale');
        if (!finaleScreen || !finaleScreen.classList.contains('active')) {
            return;
        }

        // Smooth following with delay
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;

        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';

        requestAnimationFrame(updateFollower);
    }

    updateFollower();
}

// Add fadeOut and snowfall animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-50px) scale(0.5);
        }
    }

    @keyframes snowfall {
        0% {
            transform: translateY(0) rotate(0deg);
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
        }
    }
`;
document.head.appendChild(style);

// Create floating Christmas decorations everywhere!
function createChristmasDecor() {
    const snowContainer = document.querySelector('.snow-container');

    // Create falling sausages and decorations
    function createFallingItem() {
        const item = document.createElement('img');

        // Mix of sausages and decorations
        const allItems = [...SAUSAGE_IMAGES, ...CHRISTMAS_DECOR];
        item.src = allItems[Math.floor(Math.random() * allItems.length)];

        const size = 30 + Math.random() * 60;
        const startX = Math.random() * 100;
        const duration = 8 + Math.random() * 12;
        const delay = Math.random() * 5;

        item.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: auto;
            left: ${startX}%;
            top: -100px;
            opacity: ${0.4 + Math.random() * 0.4};
            animation: snowfall ${duration}s linear ${delay}s infinite;
        `;

        snowContainer.appendChild(item);
    }

    // Create 100 falling items
    for (let i = 0; i < 100; i++) {
        setTimeout(() => createFallingItem(), i * 100);
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Make sure first question is showing
    showScreen('question1');

    // Create Christmas decorations everywhere!
    createChristmasDecor();

    // Screen shake on rejections
    const rejections = document.querySelectorAll('.rejection');
    rejections.forEach(rejection => {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.target.classList.contains('active')) {
                    document.body.style.animation = 'shake 0.5s';
                    setTimeout(() => {
                        document.body.style.animation = '';
                    }, 500);
                }
            });
        });

        observer.observe(rejection, { attributes: true, attributeFilter: ['class'] });
    });
});
