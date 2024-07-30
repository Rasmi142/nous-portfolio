$(document).ready(function () {
  init_loader();
});

/* --------------------------------------------
     Page loader
     --------------------------------------------- */
function init_loader() {
  $(".page-loader").delay(9500).slideUp("linear");
}

const particlesContainer = document.getElementById("laptop");

// Check if the element exists and then set the z-index
if (particlesContainer) {
  particlesContainer.style.zIndex = "1"; // Set to desired value
}
const container = document.getElementById("grid-container");
for (let i = 0; i < 64; i++) {
  const square = document.createElement("div");
  square.className = "square";
  square.textContent = i;
  container.appendChild(square);
}

const staggerFromValues = ["left", "end", "center", "edges", "random"];
let staggerIndex = 0;

function animateSquares() {
  gsap.to(".square", {
    duration: 1,
    z: 150,
    repeat: 1,
    yoyo: true,
    repeatDelay: 1,
    stagger: {
      grid: "auto",
      from: staggerFromValues[staggerIndex],
      amount: 3,
    },
    ease: "back.out(1.7)",
    onComplete: function () {
      staggerIndex = (staggerIndex + 1) % staggerFromValues.length;
      animateSquares();
    },
  });
}

animateSquares();
