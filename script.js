let categories = ["Food", "Sports", "Music", "Movies", "Travel", "Games", "Books", "Art", "Tech"];
const spinButton = document.getElementById("spinButton");
const spinSound = document.getElementById("spinSound");
const newCategoryInput = document.getElementById("newCategory");
const addCategoryButton = document.getElementById("addCategoryButton");
const categoriesList = document.getElementById("categoriesList");

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

// Spin button functionality
spinButton.addEventListener("click", () => {
  spinSound.currentTime = 0;
  spinSound.play();
  const slots = document.querySelectorAll(".slot");
  slots.forEach(slot => spinSlot(slot));
});

// Add new category functionality
addCategoryButton.addEventListener("click", () => {
  const newCategory = newCategoryInput.value.trim();
  if (newCategory && !categories.includes(newCategory)) {
    categories.push(newCategory);
    updateCategoriesList();
    newCategoryInput.value = "";
    alert(`${newCategory} has been added!`);
  } else {
    alert("Invalid or duplicate category.");
  }
});

function updateCategoriesList() {
  categoriesList.textContent = "Current Categories: " + categories.join(", ");
}

// Initialize categories list
updateCategoriesList();
