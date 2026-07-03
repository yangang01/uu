const typewriterHost = document.querySelector("#typewriter-lines");
const finalMessage = document.querySelector("#final-message");
const startButton = document.querySelector("#start-story");
const showMessageButton = document.querySelector("#show-message");
const particleField = document.querySelector("#particle-field");

const playlist = ["./Taylor Swift - Back To December.mp3"];

const typewriterLines = [
  "昨天我本该一直陪着你。",
  "可我没有在你身边，反而让你因为我失落了。",
  "你会委屈，不是你想太多，是我没有把你放在该放的位置上。",
  "如果你还难受，我想先哄哄你，再慢慢把亏欠补回来。",
];

const revealMessage =
  "你对我来说不是随便的人，所以你的失落我也不想随便带过。如果你愿意，我会把昨天欠你的陪伴，慢慢补给你。";

const audio = new Audio(playlist[0]);
audio.loop = true;
audio.preload = "auto";
audio.autoplay = true;
audio.volume = 0.65;

let particleTimer = null;
let typewriterHasPlayed = false;
let autoplayUnlocked = false;

function tryAutoplay() {
  audio
    .play()
    .then(() => {
      autoplayUnlocked = true;
    })
    .catch(() => {});
}

function typeLine(line, delay) {
  const paragraph = document.createElement("p");
  paragraph.textContent = "";
  typewriterHost.appendChild(paragraph);

  let index = 0;
  const timer = window.setInterval(() => {
    paragraph.classList.add("line-visible");
    paragraph.textContent = line.slice(0, index + 1);
    index += 1;

    if (index >= line.length) {
      window.clearInterval(timer);
    }
  }, delay);
}

function playTypewriterSequence() {
  if (typewriterHasPlayed) {
    return;
  }

  typewriterHasPlayed = true;
  typewriterHost.innerHTML = "";

  typewriterLines.forEach((line, lineIndex) => {
    window.setTimeout(() => typeLine(line, 40), lineIndex * 1100);
  });
}

function spawnParticle() {
  const particle = document.createElement("span");
  const isSpark = Math.random() > 0.7;

  particle.className = isSpark ? "particle spark" : "particle";
  if (!isSpark) {
    particle.textContent = Math.random() > 0.42 ? "❤" : "✦";
    particle.style.fontSize = `${14 + Math.random() * 20}px`;
  }

  particle.style.left = `${Math.random() * 100}%`;
  particle.style.animationDuration = `${8 + Math.random() * 7}s`;
  particle.style.opacity = `${0.18 + Math.random() * 0.5}`;
  particle.style.setProperty("--drift", `${-34 + Math.random() * 68}px`);

  particleField.appendChild(particle);

  window.setTimeout(() => {
    particle.remove();
  }, 16000);
}

function startParticles() {
  if (particleTimer) {
    return;
  }

  for (let i = 0; i < 14; i += 1) {
    spawnParticle();
  }

  particleTimer = window.setInterval(spawnParticle, 520);
}

function pauseParticles() {
  if (particleTimer) {
    window.clearInterval(particleTimer);
    particleTimer = null;
  }
}

function startStory() {
  playTypewriterSequence();
  startParticles();
  tryAutoplay();
}

function showFinalMessage() {
  finalMessage.innerHTML = `<p>${revealMessage}</p>`;

  for (let i = 0; i < 10; i += 1) {
    window.setTimeout(spawnParticle, i * 60);
  }
}

startButton.addEventListener("click", startStory);
showMessageButton.addEventListener("click", showFinalMessage);

startParticles();
playTypewriterSequence();
tryAutoplay();

document.addEventListener(
  "pointerdown",
  () => {
    if (!autoplayUnlocked) {
      tryAutoplay();
    }
  },
  { once: true }
);

window.addEventListener("beforeunload", pauseParticles);
