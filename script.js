const typewriterHost = document.querySelector("#typewriter-lines");
const tabButtons = [...document.querySelectorAll("[data-tab]")];
const tabSwitcher = document.querySelector(".tab-switcher");
const tabPanel = document.querySelector("#tab-panel");
const tabPlaceholder = document.querySelector("#tab-placeholder");
const tabPanelContent = document.querySelector("#tab-panel-content");
const tabPanelKicker = document.querySelector("#tab-panel-kicker");
const tabPanelTitle = document.querySelector("#tab-panel-title");
const tabPanelBody = document.querySelector("#tab-panel-body");
const particleField = document.querySelector("#particle-field");

const playlist = ["./Ed Sheeran - Perfect.mp3"];

const typewriterLines = [
  "昨天我本该一直陪着你。",
  "可我没有在你身边，反而让你因为我失落了。",
  "你会委屈，不是你想太多，是我没有把你放在该放的位置上。",
  "如果你还难受，我想先哄哄你，再慢慢把亏欠补回来。",
];

const revealMessage =
  "你对我来说不是随便的人，所以你的失落我也不想随便带过。如果你愿意，我会把昨天欠你的陪伴，慢慢补给你。";
const tabContent = {
  comfort: {
    kicker: "抱抱模式",
    title: "我知道你昨天不是在闹情绪。",
    body: "你只是因为在意我，才会被这件事弄得失落又委屈。所以我现在更想先抱抱你，而不是只顾着解释。",
  },
  serious: {
    kicker: "认真模式",
    title: "昨天我本该一直陪着你。",
    body: "可我没有在你身边，反而去陪了别人。让你失落，是我的问题。我不想找借口，只想以后把你放在更重要的位置上。",
  },
};

const audio = playlist[0] ? new Audio(playlist[0]) : null;
if (audio) {
  audio.loop = true;
  audio.preload = "auto";
  audio.autoplay = true;
  audio.volume = 0.65;
}

let particleTimer = null;
let typewriterHasPlayed = false;
let autoplayUnlocked = false;

function tryAutoplay() {
  if (!audio) {
    autoplayUnlocked = true;
    return;
  }

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

function switchTab(nextTab) {
  const content = tabContent[nextTab];
  if (!content || !tabPanel || !tabPlaceholder || !tabPanelContent) {
    return;
  }

  tabButtons.forEach((button) => {
    const active = button.dataset.tab === nextTab;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-selected", active ? "true" : "false");
  });

  tabPlaceholder.hidden = true;
  tabPanelContent.hidden = false;
  tabPanelKicker.textContent = content.kicker;
  tabPanelTitle.textContent = content.title;
  tabPanelBody.textContent = nextTab === "serious" ? revealMessage : content.body;
  tabPanel.classList.remove("panel-animate");
  void tabPanel.offsetWidth;
  tabPanel.classList.add("panel-animate");

  for (let i = 0; i < 6; i += 1) {
    window.setTimeout(spawnParticle, i * 70);
  }
}

function handleTabInteraction(event) {
  const rawTarget = event.target;
  const target =
    rawTarget instanceof Element ? rawTarget : rawTarget && rawTarget.parentElement;
  const button = target ? target.closest("[data-tab]") : null;
  if (!button) {
    return;
  }

  switchTab(button.dataset.tab);
}

tabButtons.forEach((button) => {
  button.addEventListener("click", () => switchTab(button.dataset.tab));
});

if (tabSwitcher) {
  tabSwitcher.addEventListener("click", handleTabInteraction);
}

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
