import { useState } from "react";
import supabase from "../../supabase";

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

function FactsList({ facts, setFacts }) {
  return (
    <>
      <section>
        <ul className="facts-list">
          {facts.map((fact) => (
            <Fact key={fact.id} fact={fact} setFacts={setFacts} />
          ))}
        </ul>
        {facts.length === 0 ? (
          <p className="message">
            There are not facts for this category yet! <br></br> Be the first to
            create one 😎
          </p>
        ) : (
          <p>There are {facts.length} facts in the Database. Add your own!</p>
        )}
      </section>
    </>
  );
}

function Fact({ fact, setFacts }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const isDisputed =
    fact.votesInteresting + fact.votesMindBlowing < fact.votesFalse;

  async function handleVote(columnName) {
    setIsUpdating(true);
    const { data: updatedFact, error } = await supabase
      .from("facts")
      .update({ [columnName]: fact[columnName] + 1 })
      .eq("id", fact.id)
      .select();
    setIsUpdating(false);

    console.log(updatedFact);
    if (!error)
      setFacts((facts) =>
        facts.map((f) => (f.id === fact.id ? updatedFact[0] : f))
      );
  }
  return (
    <>
      <li className="fact">
        {isDisputed ? <span className="disputed">[⛔ DISPUTED]</span> : null}
        <p>{fact.fact}</p>
        <a className="source" href={fact.source} target="_blank">
          (Source)
        </a>
        <span
          className="tag"
          style={{
            backgroundColor: CATEGORIES.find(
              (cat) => cat.name === fact.category
            ).color,
          }}
        >
          {fact.category}
        </span>
        <div className="vote-buttons">
          <button
            className="btn-vote"
            onClick={() => handleVote("votesInteresting")}
            disabled={isUpdating}
          >
            👍🏻 <strong>{fact.votesInteresting}</strong>
          </button>
          <button
            className="btn-vote"
            onClick={() => handleVote("votesMindBlowing")}
          >
            🤯 <strong>{fact.votesMindBlowing}</strong>
          </button>
          <button className="btn-vote" onClick={() => handleVote("votesFalse")}>
            ⛔ <strong>{fact.votesFalse}</strong>
          </button>
        </div>
      </li>
    </>
  );
}

export default FactsList;
