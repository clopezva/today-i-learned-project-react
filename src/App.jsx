import "./App.css";
import Header from "./assets/components/Header";
import CategoryFilter from "./assets/components/CategoryFilter";
import NewFactForm from "./assets/components/NewFactForm";
import FactsList from "./assets/components/FactsList";
import { useEffect, useState } from "react";
import supabase from "./supabase";
import Loader from "./assets/components/Loader";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [facts, setFacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState("all");

  useEffect(
    function () {
      async function getFacts() {
        setIsLoading(true);

        let query = supabase.from("facts").select("*");

        if (category !== "all") query = query.eq("category", category);

        const { data: facts, error } = await query
          .order("votesInteresting", {
            ascending: false,
          })
          .limit(1000);

        //console.log(facts)

        if (!error) setFacts(facts);
        else alert("There was an error getting data.");
        setIsLoading(false);
      }
      getFacts();
    },
    [category]
  );

  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm} />
      {/* 2. Show the use state on the page */}
      {showForm ? (
        <NewFactForm setFacts={setFacts} setShowForm={setShowForm} />
      ) : null}
      <main className="main">
        <CategoryFilter setCategory={setCategory} />
        {isLoading ? (
          <Loader />
        ) : (
          <FactsList facts={facts} setFacts={setFacts} />
        )}
      </main>
    </>
  );
}

export default App;
