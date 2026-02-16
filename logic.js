const flowerEls = document.querySelectorAll('.flower-one, .flower-two');
const signatureName = document.querySelector('.signature-name');
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

if (signatureName) {
    signatureName.addEventListener('mouseenter', () => {
        signatureName.classList.add('is-hoey');
    });

    signatureName.addEventListener('mouseleave', () => {
        signatureName.classList.remove('is-hoey');
    });

    signatureName.addEventListener('pointerup', (event) => {
        if (event.pointerType === 'mouse') {
            return;
        }

        signatureName.classList.toggle('is-hoey');
    });
}
