const heroText = document.querySelector('.hero-text');
const flowerEls = document.querySelectorAll('.flower-one, .flower-two');
const loveAudio = new Audio('assets/love.mp3');
const tapsNeeded = 3;
let tapCount = 0;

function startFlowerSpin() {
    flowerEls.forEach((flower) => flower.classList.add('is-spinning'));
}

function stopFlowerSpin() {
    flowerEls.forEach((flower) => flower.classList.remove('is-spinning'));
}

loveAudio.addEventListener('ended', stopFlowerSpin);

if (heroText) {
    heroText.addEventListener('pointerup', () => {
        tapCount += 1;

        if (tapCount >= tapsNeeded) {
            loveAudio.currentTime = 0;
            startFlowerSpin();
            loveAudio.play().catch(() => {
                stopFlowerSpin();
            });
            tapCount = 0;
        }
    });
}
