import "./style.css";
import supabase from "./supabase";
import { useEffect, useState } from "react";

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

function App() {
  const [showForm, setShowForm] = useState(false);
  const [facts, setFacts] = useState(initialFacts);

  useEffect(function () {
    async function getFacts() {
      const { data: facts, error } = await supabase.from("facts").select("*");
      setFacts(facts);
    }
    getFacts();
  }, []);

  return (
    <>
      {/* whatever gets returned below is what gets displayed. Also this is JSX, not HTML. JSX only has one parent element */}
      <Header showForm={showForm} setShowForm={setShowForm} />
      {showForm ? (
        <NewFactForm setFacts={setFacts} setShowForm={setShowForm} />
      ) : null}
      <main className="main">
        <CategoryFilter />
        <FactList facts={facts} />
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

function NewFactForm({ setFacts, setShowForm }) {
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const textLen = text.length;
  function handleSubmit(e) {
    //prevent refresh
    e.preventDefault();
    console.log(text, source, category);
    //data valid?
    if (text && source && category && text.length <= 200) console.log("Click");
    //new fact obj
    const newFact = {
      id: Math.random,
      text: text,
      category: category,
      votesInteresting: 0,
      votesMindblowing: 0,
      votesFalse: 0,
      createdIn: new Date().getFullYear(),
    };
    //add fact to UI
    setFacts((facts) => [newFact, ...facts]);
    //reset input
    setText("");
    setSource("");
    setCategory("");
    //close form
    setShowForm(false);
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

function FactList({ facts }) {
  return (
    <section>
      <ul className="facts-list">
        {facts.map((datum) => (
          <Fact key={datum.id} factObj={datum} />
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
        <a className="source" href={factObj.source} target="_blank">
          (source info)
        </a>
        <span
          className="tag"
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
