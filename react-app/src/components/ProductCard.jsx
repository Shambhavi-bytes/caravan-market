import { useState } from "react";
import { CATEGORIES } from "../data.js";

export default function ProductCard({ product, onAddToCart }) {
  const category = CATEGORIES[product.category];
  const [justAdded, setJustAdded] = useState(false);

  function handleAddToCart() {
    onAddToCart(product.id);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1000);
  }

  return (
    <article className="product-card">
      <div className="product-image" style={{ backgroundColor: category.color }}>
        <i className={`fa-solid ${category.icon} product-placeholder`}></i>
        <img
          src={`/${product.image}`}
          alt={product.name}
          loading="lazy"
          onError={(event) => event.target.remove()}
        />
      </div>
      <div className="product-info">
        <p className="product-category">{category.label}</p>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-rating">
          &#9733; {product.rating.toFixed(1)} <span>({product.reviews})</span>
        </p>
        <p className="product-price">
          {new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(product.price)}
        </p>
        <button type="button" className="add-to-cart" onClick={handleAddToCart}>
          {justAdded ? "Added ✓" : "Add to cart"}
        </button>
      </div>
    </article>
  );
}