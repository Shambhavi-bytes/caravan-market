import { useRef, useState } from "react";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import CategoryGrid from "./components/CategoryGrid.jsx";
import CategoryChips from "./components/CategoryChips.jsx";
import ProductGrid from "./components/ProductGrid.jsx";
import CartDrawer from "./components/CartDrawer.jsx";
import Footer from "./components/Footer.jsx";
import { PRODUCTS, CATEGORIES } from "./data.js";
import { getVisibleProducts } from "./filterProducts.js";
import { useCart } from "./useCart.js";

function scrollToProducts() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.getElementById("products")?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
}

export default function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("featured");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartButtonRef = useRef(null);

  const { cart, count, totals, addToCart, changeQuantity, removeFromCart, maxQuantity } = useCart();

  const visibleProducts = getVisibleProducts(PRODUCTS, CATEGORIES, { search, category, sort });

  function selectCategory(key) {
    setCategory(key);
    scrollToProducts();
  }

  function clearFilters() {
    setSearch("");
    setCategory("all");
    setSort("featured");
  }

  const trimmedQuery = search.trim();
  let heading = "All products";
  if (category !== "all") {
    heading = CATEGORIES[category].label;
  } else if (trimmedQuery) {
    heading = "Search results";
  }

  let resultsText = `${visibleProducts.length} ${visibleProducts.length === 1 ? "product" : "products"}`;
  if (trimmedQuery) {
    resultsText += ` for "${trimmedQuery}"`;
  }

  return (
    <>
      <a href="#products" className="skip-link">Skip to products</a>
      <Header
        search={search}
        onSearchChange={setSearch}
        onSearchSubmit={scrollToProducts}
        category={category}
        onCategoryChange={selectCategory}
        cartCount={count}
        onCartClick={() => setIsCartOpen(true)}
        cartButtonRef={cartButtonRef}
      />
      <main>
        <Hero />
        <CategoryGrid onSelectCategory={selectCategory} />
        <section className="products-section" id="products">
          <div className="products-header">
            <div>
              <h2>{heading}</h2>
              <p className="results-count" aria-live="polite">{resultsText}</p>
            </div>
            <div className="sort-box">
              <label htmlFor="sort-select">Sort by</label>
              <select
                className="sort-select"
                id="sort-select"
                value={sort}
                onChange={(event) => setSort(event.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: low to high</option>
                <option value="price-high">Price: high to low</option>
                <option value="rating">Top rated</option>
              </select>
            </div>
          </div>

          <CategoryChips activeCategory={category} onSelect={selectCategory} />

          <ProductGrid products={visibleProducts} onClearFilters={clearFilters} onAddToCart={addToCart} />
        </section>
      </main>
      <Footer />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        totals={totals}
        maxQuantity={maxQuantity}
        onIncrease={(id) => changeQuantity(id, 1)}
        onDecrease={(id) => changeQuantity(id, -1)}
        onRemove={removeFromCart}
        triggerRef={cartButtonRef}
      />
    </>
  );
}