import "./style.css";
import { useState } from "react";

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
const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];
//Build React App
//all files  and images go into public folder
// function Counter() {
//   const [count, setCount] = useState(0);
//   return (
//     <div>
//       <span style={{ fontSize: "40px" }}>{count}</span>
//       <button
//         className="btn btn-large"
//         onClick={
//           () => setCount((count) => count + 1)
//           //console.log(count)
//         }
//       >
//         +1
//       </button>
//     </div>
//   );
// }
function App() {
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      {/* whatever gets returned below is what gets displayed. Also this is JSX, not HTML. JSX only has one parent element */}
      <Header showForm={showForm} setShowForm={setShowForm} />
      {showForm ? <NewFactForm /> : null}
      <main className="main">
        <CategoryFilter />
        <FactList />
      </main>
    </>
  );
}

function Header({ showForm, setShowForm }) {
  const title = "Share Facts";
  return (
    <header className="header">
      <div className="logo">
        <img src="logo.png" height="50" width="50" all="website logo" />
        <h1>{title}</h1>
      </div>
      <button
        className="btn btn-large btn-open"
        onClick={() => setShowForm((showForm) => !showForm)}
      >
        {showForm ? "Close" : "Share a fact"}
      </button>
    </header>
  );
}

function NewFactForm() {
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const textLen = text.length;
  function handleSubmit(e) {
    e.preventDefault();
    console.log(text, source, category);
  }

  return (
    <form className="fact-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="share your observation for today"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <span>{200 - textLen}</span>
      <input
        type="text"
        placeholder="source?"
        value={source}
        onChange={(e) => setSource(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Choose Option:</option>
        {CATEGORIES.map((cat) => (
          <option value={cat.name}>{cat.name}</option>
        ))}
      </select>
      <button class="btn btn-large">Post</button>
    </form>
  );
}

function CategoryFilter() {
  return (
    <aside>
      <ul>
        {CATEGORIES.map((cat) => (
          <li className="category">
            <button
              className="btn btn-category"
              style={{ backgroundColor: findcolor(cat.name) }}
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function findcolor(category) {
  return CATEGORIES.find((cat) => cat.name === category).color;
}

function FactList() {
  const data = initialFacts;

  return (
    <section>
      <ul className="facts-list">
        {data.map((datum) => (
          <Fact factObj={datum} />
        ))}
      </ul>
    </section>
  );
}

function Fact({ factObj }) {
  return (
    <li key={factObj.id} className="fact">
      <p>
        {factObj.text}
        <a class="source" href={factObj.source} target="_blank">
          (source info)
        </a>
        <span
          class="tag"
          style={{ backgroundColor: findcolor(factObj.category) }}
        >
          {factObj.category}
        </span>
      </p>

      <div className="vote-buttons">
        <button>❤️{factObj.votesInteresting}</button>
        <button>😧{factObj.votesMindblowing}</button>
        <button>😣{factObj.votesFalse}</button>
      </div>
    </li>
  );
}

export default App;
