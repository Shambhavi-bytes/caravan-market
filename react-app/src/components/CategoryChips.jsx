import { CATEGORIES } from "../data.js";

export default function CategoryChips({ activeCategory, onSelect }) {
  return (
    <div className="category-chips">
      <button
        type="button"
        className={`chip${activeCategory === "all" ? " active" : ""}`}
        aria-pressed={activeCategory === "all"}
        onClick={() => onSelect("all")}
      >
        All
      </button>
      {Object.entries(CATEGORIES).map(([key, category]) => (
        <button
          type="button"
          className={`chip${activeCategory === key ? " active" : ""}`}
          aria-pressed={activeCategory === key}
          onClick={() => onSelect(key)}
          key={key}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}