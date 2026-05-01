// ===== EXISTING FUNCTION =====
function suggest() {
  let budgetInput = document.getElementById("budget");
  let result = document.getElementById("result");

  if (!budgetInput || !result) return;

  let budget = Number(budgetInput.value);

  if (!budget || budget <= 0) {
    result.innerHTML = "Enter valid budget";
    return;
  }

  if (budget < 10000) {
    result.innerHTML = "🏝 Weekend Local Trip Recommended";
  } else if (budget < 30000) {
    result.innerHTML = "🌴 Goa Budget Trip Recommended";
  } else if (budget < 50000) {
    result.innerHTML = "🌿 Kerala Nature Tour Recommended";
  } else if (budget < 80000) {
    result.innerHTML = "🏔 Himachal / Kashmir Premium Tour Recommended";
  } else if (budget < 150000) {
    result.innerHTML = "✈️ Dubai / Thailand International Trip Recommended";
  } else {
    result.innerHTML = "🌍 Europe Luxury Tour Recommended";
  }
}

// ===== SLIDER DATA =====
const places = [
  {
    title: "KERALA",
    desc: "Kerala is known for lush greenery, backwaters and peaceful nature.",
    img: "img/img1.jpg",
  },
  {
    title: "THAILAND",
    desc: "Thailand offers beaches, temples and vibrant culture.",
    img: "img/img2.jpg",
  },
  {
    title: "BALI",
    desc: "Crystal blue water and dramatic cliffs in Bali.",
    img: "img/img3.jpg",
  },
  {
    title: "MALDIVES",
    desc: "Luxury islands with crystal clear water and resorts.",
    img: "img/img4.jpg",
  },
];

let index = 0;
let interval = null;

let hero, title, desc, dotsContainer, slides;

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
  hero = document.getElementById("hero");
  title = document.getElementById("place-title");
  desc = document.getElementById("place-desc");
  dotsContainer = document.getElementById("dots");
  slides = document.querySelectorAll(".floating-slide img");

  if (!hero || !title || !desc || !dotsContainer || !slides) return;

  // set images
  slides.forEach((img, i) => {
    if (places[i]) {
      img.src = places[i].img;
    }
  });

  createDots();
  updateSlide();
  startAuto();
});

// ===== UPDATE SLIDE =====
function updateSlide() {
  const place = places[index];

  title.textContent = place.title;
  desc.textContent = place.desc;
  hero.style.backgroundImage = `url(${place.img})`;

  document.querySelectorAll(".floating-slide").forEach((el, i) => {
    el.classList.toggle("active", i === index);
  });

  updateDots();
}

// ===== AUTO SLIDER =====
function nextSlide() {
  index = (index + 1) % places.length;
  updateSlide();
}

function startAuto() {
  clearInterval(interval);
  interval = setInterval(nextSlide, 4000);
}

function goToSlide(i) {
  index = i;
  updateSlide();
  startAuto();
}

// ===== CLICK SLIDER =====
document.addEventListener("click", (e) => {
  const slide = e.target.closest(".floating-slide");
  if (!slide) return;

  const i = parseInt(slide.dataset.index);
  if (isNaN(i)) return;

  goToSlide(i);
});

// ===== DOTS =====
function createDots() {
  dotsContainer.innerHTML = "";

  places.forEach((_, i) => {
    const dot = document.createElement("div");
    dot.className = "dot";

    dot.addEventListener("click", () => goToSlide(i));

    dotsContainer.appendChild(dot);
  });
}

function updateDots() {
  document.querySelectorAll(".dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}