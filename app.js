import "./components/app-header.js";
import "./components/user-card.js";
import "./components/user-details.js";
import "./components/app-footer.js";

const app = document.querySelector("#app");

// 1) Header
const header = document.createElement("app-header");
header.setAttribute("title", "Lab 01: Web Components Layout");
header.setAttribute("subtitle", "Cohesion • Low Coupling • Open/Closed via slots & attributes");

// 2) Main content layout container
const main = document.createElement("main");
main.className = "main";

// Left column: list of user cards
const left = document.createElement("section");
left.className = "panel";
left.innerHTML = `<h2>Team</h2><p class="muted">Click a card to view details.</p>`;

const cardsWrap = document.createElement("div");
cardsWrap.className = "stack";

// Right column: details panel (separate component = cohesive responsibility)
const right = document.createElement("section");
right.className = "panel";

const details = document.createElement("user-details");
details.setAttribute("name", "Select a user");
details.setAttribute("role", "—");
details.setAttribute("email", "—");
details.setAttribute("bio", "Choose a card on the left to display details here.");

// Sample data (could come from API later without changing components)
const users = [
  {
    name: "Alice Johnson",
    role: "Designer",
    img: "https://i.pravatar.cc/160?img=47",
    email: "alice@company.com",
    bio: "Designs accessible interfaces, builds UI kits, and partners with engineering on component consistency."
  },
  {
    name: "Ben Carter",
    role: "Frontend Developer",
    img: "https://i.pravatar.cc/160?img=12",
    email: "ben@company.com",
    bio: "Builds reusable components and optimizes performance. Enjoys clean architecture and Web Components."
  },
  {
    name: "Chloe Smith",
    role: "Product Manager",
    img: "https://i.pravatar.cc/160?img=32",
    email: "chloe@company.com",
    bio: "Defines product outcomes, aligns stakeholders, and ensures the team ships valuable, usable features."
  }
];

// Create cards
users.forEach((u) => {
  const card = document.createElement("user-card");
  card.setAttribute("name", u.name);
  card.setAttribute("role", u.role);
  card.setAttribute("img-src", u.img);

  // Open/Closed: extend content without modifying user-card.js using slots
  const extra = document.createElement("span");
  extra.setAttribute("slot", "meta");
  extra.textContent = "Click to view details →";
  card.appendChild(extra);

  // Low coupling: card emits event, app.js decides what to do
  card.addEventListener("user-selected", (e) => {
    const selected = e.detail;
    const found = users.find(x => x.name === selected.name);

    details.setAttribute("name", found.name);
    details.setAttribute("role", found.role);
    details.setAttribute("email", found.email);
    details.setAttribute("bio", found.bio);
    details.setAttribute("img-src", found.img);
  });

  cardsWrap.appendChild(card);
});

left.appendChild(cardsWrap);
right.appendChild(details);

// 3) Footer
const footer = document.createElement("app-footer");
footer.setAttribute("company", "SLU • Lab 01");
footer.setAttribute("email", "support@example.com");
footer.setAttribute("year", new Date().getFullYear());

// Mount to #app
main.append(left, right);
app.append(header, main, footer);
