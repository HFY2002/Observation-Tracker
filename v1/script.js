console.log("hello world");
const initialFacts = [
  {
    id: 1,
    text: "React is being developed by Meta (formerly facebook)",
    source: "https://opensource.fb.com/",
    category: "technology",
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
    source:
      "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
    category: "society",
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2019,
  },
  {
    id: 3,
    text: "Lisbon is the capital of Portugal",
    source: "https://en.wikipedia.org/wiki/Lisbon",
    category: "society",
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2015,
  },
];

//select DOM
const btn = document.querySelector(".btn-open");
const form = document.querySelector(".fact-form");
const factsList = document.querySelector(".facts-list");

//Load data supabase
loadFacts();

async function loadFacts() {
  const res = await fetch(
    "https://djkrednrazrikyosymbf.supabase.co/rest/v1/facts",
    {
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqa3JlZG5yYXpyaWt5b3N5bWJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUxMzc3MTksImV4cCI6MjA0MDcxMzcxOX0.UOITXFyS4k9ralBVUtUASoK2hBo-enZOYrRRjX2Aq1U",
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqa3JlZG5yYXpyaWt5b3N5bWJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUxMzc3MTksImV4cCI6MjA0MDcxMzcxOX0.UOITXFyS4k9ralBVUtUASoK2hBo-enZOYrRRjX2Aq1U",
      },
    }
  );
  const data = await res.json();
  createFactsList(data);
}

//render DOM
factsList.innerHTML = "";
function createFactsList(arr) {
  const html = arr.map((fact) => `<li class="fact">${fact.text}</li>`).join("");
  factsList.insertAdjacentHTML("afterbegin", html);
}

createFactsList(initialFacts);

//visibility
btn.addEventListener("click", function () {
  if (form.classList.contains("hidden")) {
    form.classList.remove("hidden");
    btn.textContent = "Close";
  } else {
    form.classList.add("hidden");
    btn.textContent = "Share fact";
  }
});

console.dir(btn);
