const flowerEls = document.querySelectorAll('.flower-one, .flower-two');
const signatureName = document.querySelector('.signature-name');
const loveTrackPaths = ['assets/love.mp3', 'assets/love-two.mp3'];
let currentLoveAudio = null;
let lastTrackIndex = -1;

function startFlowerSpin() {
    flowerEls.forEach((flower) => flower.classList.add('is-spinning'));
}

function stopFlowerSpin() {
    flowerEls.forEach((flower) => flower.classList.remove('is-spinning'));
}

function getNextTrackIndex() {
    if (loveTrackPaths.length === 1) {
        return 0;
    }

    let randomIndex = Math.floor(Math.random() * loveTrackPaths.length);

    if (randomIndex === lastTrackIndex) {
        randomIndex = (randomIndex + 1) % loveTrackPaths.length;
    }

    return randomIndex;
}

function playLoveTrack() {
    const nextTrackIndex = getNextTrackIndex();
    const nextTrackPath = loveTrackPaths[nextTrackIndex];

    if (currentLoveAudio) {
        currentLoveAudio.pause();
        currentLoveAudio.currentTime = 0;
        currentLoveAudio.removeEventListener('ended', stopFlowerSpin);
    }

    currentLoveAudio = new Audio(nextTrackPath);
    lastTrackIndex = nextTrackIndex;
    currentLoveAudio.addEventListener('ended', stopFlowerSpin, { once: true });

    startFlowerSpin();
    currentLoveAudio.play().catch(() => {
        stopFlowerSpin();
    });
}

flowerEls.forEach((flower) => {
    flower.addEventListener('pointerup', () => {
        playLoveTrack();
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
