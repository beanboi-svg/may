const tempFlowerEls = document.querySelectorAll('.flower-one, .flower-two');
const callTextRainLayer = document.querySelector('#call-text-rain');

const tempTrackPaths = [
    'assets/love.mp3',
    'assets/love-two.mp3',
    'assets/call.mp3'
];
const callFallingLines = [
    'Can I have your number?',
    'Can I shake my leg while I read?'
];

let tempCurrentAudio = null;
let tempLastTrackIndex = -1;
let callDropTimerId = null;
let callCleanupTimerId = null;
let callLineIndex = 0;

function setCallRainBlur(isActive) {
    document.body.classList.toggle('call-rain-active', isActive);
}

function tempStartFlowerSpin() {
    tempFlowerEls.forEach((flower) => flower.classList.add('is-spinning'));
}

function tempStopFlowerSpin() {
    tempFlowerEls.forEach((flower) => flower.classList.remove('is-spinning'));
}

function getTempNextTrackIndex() {
    if (tempTrackPaths.length === 1) {
        return 0;
    }

    let randomIndex = Math.floor(Math.random() * tempTrackPaths.length);

    if (randomIndex === tempLastTrackIndex) {
        randomIndex = (randomIndex + 1) % tempTrackPaths.length;
    }

    return randomIndex;
}

function spawnCallText() {
    if (!callTextRainLayer) {
        return;
    }

    const text = document.createElement('p');
    text.className = 'call-fall-text';
    text.textContent = callFallingLines[callLineIndex];
    callLineIndex = (callLineIndex + 1) % callFallingLines.length;

    const horizontalPadding = 4;
    const xMin = horizontalPadding;
    const xMax = 100 - horizontalPadding;
    const randomX = Math.random() * (xMax - xMin) + xMin;
    const randomDuration = Math.floor(Math.random() * 1200) + 2300;

    text.style.left = `${randomX}%`;
    text.style.setProperty('--fall-duration', `${randomDuration}ms`);

    callTextRainLayer.appendChild(text);

    window.setTimeout(() => {
        text.remove();
    }, randomDuration + 1200);
}

function clearCallTimers() {
    if (callDropTimerId) {
        window.clearInterval(callDropTimerId);
        callDropTimerId = null;
    }

    if (callCleanupTimerId) {
        window.clearTimeout(callCleanupTimerId);
        callCleanupTimerId = null;
    }
}

function startCallTextRain() {
    if (!callTextRainLayer) {
        return;
    }

    clearCallTimers();
    setCallRainBlur(true);

    callDropTimerId = window.setInterval(() => {
        spawnCallText();
    }, 420);

    spawnCallText();
}

function fadeOutAccumulatedCallText() {
    if (!callTextRainLayer) {
        return;
    }

    clearCallTimers();
    setCallRainBlur(false);

    const allTextEls = callTextRainLayer.querySelectorAll('.call-fall-text');
    allTextEls.forEach((el) => el.classList.add('is-fading'));

    callCleanupTimerId = window.setTimeout(() => {
        callTextRainLayer.innerHTML = '';
    }, 760);
}

function playTempTrack() {
    const nextTrackIndex = getTempNextTrackIndex();
    const nextTrackPath = tempTrackPaths[nextTrackIndex];
    const isCallTrack = nextTrackPath === 'assets/call.mp3';

    if (tempCurrentAudio) {
        tempCurrentAudio.pause();
        tempCurrentAudio.currentTime = 0;
        tempCurrentAudio = null;
    }

    tempLastTrackIndex = nextTrackIndex;
    tempCurrentAudio = new Audio(nextTrackPath);

    tempCurrentAudio.addEventListener('ended', () => {
        tempStopFlowerSpin();
        if (isCallTrack) {
            fadeOutAccumulatedCallText();
        }
    }, { once: true });

    tempStartFlowerSpin();
    if (isCallTrack) {
        startCallTextRain();
    } else {
        fadeOutAccumulatedCallText();
    }

    tempCurrentAudio.play().catch(() => {
        tempStopFlowerSpin();
        if (isCallTrack) {
            fadeOutAccumulatedCallText();
        }
    });
}

tempFlowerEls.forEach((flower) => {
    flower.addEventListener('pointerup', (event) => {
        event.stopImmediatePropagation();
        playTempTrack();
    }, true);
});
