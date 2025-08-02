const units = {
  jellybeans: "Measured in sweet nuggets of sugar-coated chaos.",
  bananas: "Curved yellow awkwardness, nature’s measuring tape.",
  pigeons: "Sky rats with questionable flight patterns.",
  spongebob: "Absurdity per square pants.",
  edus: "Existential Dread Units – you feel them more than measure them.",
  flamingos: "Wobbly pink elegance balanced on one leg of logic.",
  llamas: "Fluffy drama machines with spit-tacular accuracy.",
  screams: "Volume-based anguish units per meter.",
  timewarps: "Measure in danceable distortions of space and logic.",
  plot_twists: "Expect the unexpected length-wise."
};

const measureBox = document.getElementById("measure-box");
const unitSelect = document.getElementById("unit-select");
const output = document.getElementById("output");
const soundToggle = document.getElementById("sound-toggle");
const shareButton = document.getElementById("share-button");

let soundEnabled = true;
let startX = 0;

const sound = new Audio("https://actions.google.com/sounds/v1/cartoon/cartoon_boing.ogg");

measureBox.addEventListener("mousedown", (e) => {
  startX = e.clientX;
});

measureBox.addEventListener("mouseup", (e) => {
  const endX = e.clientX;
  const distance = Math.abs(endX - startX);
  showFakeMeasurement(distance);
});

soundToggle.addEventListener("click", () => {
  soundEnabled = !soundEnabled;
  soundToggle.textContent = soundEnabled ? "🔊 Sound On" : "🔇 Sound Off";
});

function showFakeMeasurement(pixels) {
  const unitKey = unitSelect.value;
  const description = units[unitKey];
  const conversionFactor = Math.random() * 8 + 2;
  const value = (pixels / conversionFactor).toFixed(2);
  output.innerHTML = `<strong>${value} ${unitKey.replace(/_/g, ' ')}</strong><br>${description}`;
  if (soundEnabled) sound.play();
}

// Mouse trail effect
document.addEventListener("mousemove", (e) => {
  const dot = document.createElement("div");
  dot.classList.add("trail-dot");
  dot.style.left = `${e.pageX}px`;
  dot.style.top = `${e.pageY}px`;
  document.body.appendChild(dot);
  setTimeout(() => dot.remove(), 600);
});

// Theme auto-switcher
const themes = [
  {
    bg: "linear-gradient(135deg, #ffecd2, #fcb69f)",
    box: "#fff0f5",
    border: "#ff69b4",
    color: "#d63384"
  },
  {
    bg: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
    box: "#1f1f2e",
    border: "#00f2fe",
    color: "#00f2fe"
  },
  {
    bg: "linear-gradient(135deg, #f6d365, #fda085)",
    box: "#fff7f0",
    border: "#ff8c42",
    color: "#ff5722"
  },
  {
    bg: "linear-gradient(135deg, #d4fc79, #96e6a1)",
    box: "#e0ffe0",
    border: "#32cd32",
    color: "#006400"
  },
  {
    bg: "linear-gradient(135deg, #c6ffdd, #fbd786, #f7797d)",
    box: "#fff0e5",
    border: "#ff6347",
    color: "#c0392b"
  }
];

let currentTheme = 0;

function switchTheme() {
  const root = document.documentElement;
  const theme = themes[currentTheme];
  root.style.setProperty("--bg", theme.bg);
  root.style.setProperty("--box-bg", theme.box);
  root.style.setProperty("--box-border", theme.border);
  root.style.setProperty("--text-color", theme.color);
  currentTheme = (currentTheme + 1) % themes.length;
}

setInterval(switchTheme, 5000);
switchTheme();

// Share button
shareButton.addEventListener("click", () => {
  const text = output.textContent.trim();
  navigator.clipboard.writeText(text).then(() => {
    alert("Measurement copied! Now go confuse your friends.");
  });
});

