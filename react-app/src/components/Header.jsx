import { CATEGORIES } from "../data.js";

export default function Header({
  search, onSearchChange, onSearchSubmit,
  category, onCategoryChange,
  cartCount, onCartClick, cartButtonRef,
}) {
  return (
    <header id="top">
      <div className="navbar">
        <a href="#top" className="logo hover-border" aria-label="Caravan Market home">
          CARAVAN
        </a>

        <div className="nav-address hover-border">
          <p className="dispatch">Deliver to</p>
          <div className="add-icon">
            <i className="fa-solid fa-location-dot"></i>
            <p className="country">United Kingdom</p>
          </div>
        </div>

        <div className="nav-search" role="search">
          <select
            className="search-select"
            aria-label="Search category"
            value={category}
            onChange={(event) => onCategoryChange(event.target.value)}
          >
            <option value="all">All</option>
            {Object.entries(CATEGORIES).map(([key, cat]) => (
              <option value={key} key={key}>{cat.label}</option>
            ))}
          </select>
          <input
            type="search"
            placeholder="Search Caravan Market"
            className="search-input"
            aria-label="Search products"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                onSearchSubmit();
              }
            }}
          />
          <button type="button" className="search-icon" aria-label="Search" onClick={onSearchSubmit}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>

        <div className="nav-signin hover-border">
          <p className="nav-small">Hello, guest</p>
          <p className="nav-second">Account &amp; Lists</p>
        </div>

        <div className="nav-return hover-border">
          <p className="nav-small">Returns</p>
          <p className="nav-second">&amp; Orders</p>
        </div>

        <button
          type="button"
          className="nav-cart hover-border"
          aria-label={`Cart, ${cartCount} ${cartCount === 1 ? "item" : "items"}`}
          onClick={onCartClick}
          ref={cartButtonRef}
        >
          <i className="fa-solid fa-cart-shopping"></i>
          <span className="cart-count">{cartCount}</span>
          Cart
        </button>
      </div>

      <nav className="panel">
        <div className="panel-all hover-border">
          <i className="fa-solid fa-bars"></i>
          All
        </div>
        <div className="panel-ops">
          <a href="#" className="hover-border" onClick={(event) => event.preventDefault()}>Today's Deals</a>
          <a href="#" className="hover-border" onClick={(event) => event.preventDefault()}>New Arrivals</a>
          <a href="#" className="hover-border" onClick={(event) => event.preventDefault()}>Best Sellers</a>
          <a href="#" className="hover-border" onClick={(event) => event.preventDefault()}>Customer Service</a>
          <a href="#" className="hover-border" onClick={(event) => event.preventDefault()}>Gift Cards</a>
        </div>
        <div className="panel-deals hover-border">
          <p>Free delivery over £50</p>
        </div>
      </nav>
    </header>
  );
}