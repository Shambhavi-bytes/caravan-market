import ProductCard from "./ProductCard.jsx";

export default function ProductGrid({ products, onClearFilters, onAddToCart }) {
  if (products.length === 0) {
    return (
      <div className="empty-state">
        <i className="fa-solid fa-magnifying-glass"></i>
        <h3>No products found</h3>
        <p>Try a different search word or choose another category.</p>
        <button type="button" className="clear-filters" onClick={onClearFilters}>Clear filters</button>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard product={product} onAddToCart={onAddToCart} key={product.id} />
      ))}
    </div>
  );
}