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

function CategoryFilter({ setCategory }) {
  return (
    <>
      <aside>
        <ul>
          <li className="category">
            <button
              className="btn btn-all-categories"
              onClick={() => setCategory("all")}
            >
              All
            </button>
          </li>
          {CATEGORIES.map((category) => (
            <li key={category.name} className="category">
              <button
                className="btn btn-category"
                style={{ backgroundColor: category.color }}
                onClick={() => setCategory(category.name)}
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}

export default CategoryFilter;
