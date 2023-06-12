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

function isValidUrl(string) {
  const pattern = new RegExp(
    "^([a-zA-Z]+:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$", // fragment locator
    "i"
  );
  return pattern.test(string);
}

function NewFactForm({ setFacts, setShowForm }) {
  // Whenever we want to update the DOM, to do something be visible on the screen.
  const [fact, setFact] = useState("");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  async function handleSubmit(e) {
    // 1. Prevent browser reload
    e.preventDefault();

    // 2. Check if data is valid. If so, create a new
    // fact.
    if (fact && isValidUrl(source) && category && fact.length <= 200) {
      // 3. Create a new fact object
      // const newFact = {
      //   id: Math.round(Math.random() * 1000000),
      //   text: fact,
      //   source,
      //   category,
      //   votesInteresting: 0,
      //   votesMindblowing: 0,
      //   votesFalse: 0,
      //   createdIn: new Date().getFullYear(),
      // };

      //3. Upload fact to Supabase and recieve a new fact object.
      setIsUploading(true);
      const { data: newFact, error } = await supabase
        .from("facts")
        .insert([{ fact, source, category }])
        .select();
      setIsUploading(false);

      //4. Add the new fact to the UI: add the fact to state.
      if (!error) setFacts((facts) => [newFact[0], ...facts]);
      // 5. Reset input fields
      setFact("");
      setSource("");
      setCategory("");
      // 6. Close the form
      setShowForm(false);
    }
  }

  return (
    <>
      <form action="" className="fact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Share a fact with the world."
          value={fact}
          disabled={isUploading}
          onChange={(e) => setFact(e.target.value)}
        />
        <span>{200 - fact.length}</span>
        <input
          type="text"
          placeholder="Trustworthy source..."
          value={source}
          disabled={isUploading}
          onChange={(e) => setSource(e.target.value)}
        />
        <select
          name=""
          id=""
          value={category}
          disabled={isUploading}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Choose a category:</option>
          {CATEGORIES.map((category) => (
            <option key={category.name} value={category.name}>
              {category.name.toUpperCase()}
            </option>
          ))}
        </select>
        <button className="btn btn-large" disabled={isUploading}>
          Post
        </button>
      </form>
    </>
  );
}

export default NewFactForm;
