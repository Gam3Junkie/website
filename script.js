let categories = ["Food", "Sports", "Music", "Movies", "Travel", "Games", "Books", "Art", "Tech"];
const spinButton = document.getElementById("spinButton");
const spinSound = document.getElementById("spinSound");
const lever = document.getElementById("lever");

function getRandomCategories() {
  const randomCategories = [];
  for (let i = 0; i < 6; i++) {
    randomCategories.push(categories[Math.floor(Math.random() * categories.length)]);
  }
  return randomCategories;
}

function spinSlot(slot) {
  const reel = slot.querySelector(".reel");
  const randomCategories = getRandomCategories();
  reel.innerHTML = randomCategories.map(cat => `<div>${cat}</div>`).join("");
  reel.style.animation = "none";
  setTimeout(() => {
    reel.style.animation = "spin 1.5s ease-out forwards";
  }, 50);

  // Ensure the final category stops correctly
  setTimeout(() => {
    const finalCategory = randomCategories[randomCategories.length - 1];
    reel.innerHTML = `<div>${finalCategory}</div>`;
  }, 1500);
}

// Lever pull effect
lever.addEventListener("click", () => {
  lever.style.transform = "rotate(45deg)";
  setTimeout(() => {
    lever.style.transform = "rotate(0deg)";
    spinSound.currentTime = 0;
    spinSound.play();
    const slots = document.querySelectorAll(".slot");
    slots.forEach(slot => spinSlot(slot));
  }, 300);
});

// Spin button functionality
spinButton.addEventListener("click", () => {
  const slots = document.querySelectorAll(".slot");
  slots.forEach(slot => spinSlot(slot));
});
