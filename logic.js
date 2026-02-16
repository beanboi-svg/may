const flowerEls = document.querySelectorAll('.flower-one, .flower-two');
const loveAudio = new Audio('assets/love.mp3');

function startFlowerSpin() {
    flowerEls.forEach((flower) => flower.classList.add('is-spinning'));
}

function stopFlowerSpin() {
    flowerEls.forEach((flower) => flower.classList.remove('is-spinning'));
}

loveAudio.addEventListener('ended', stopFlowerSpin);

flowerEls.forEach((flower) => {
    flower.addEventListener('pointerup', () => {
        loveAudio.currentTime = 0;
        startFlowerSpin();
        loveAudio.play().catch(() => {
            stopFlowerSpin();
        });
    });
});
