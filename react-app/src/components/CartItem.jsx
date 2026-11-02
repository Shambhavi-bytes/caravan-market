import { CATEGORIES, PRODUCTS } from "../data.js";

function findProduct(id) {
  return PRODUCTS.find((product) => product.id === id);
}

function formatPrice(amount) {
  return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(amount);
}

export default function CartItem({ item, maxQuantity, onIncrease, onDecrease, onRemove }) {
  const product = findProduct(item.id);
  const category = CATEGORIES[product.category];

  return (
    <li className="cart-item">
      <div className="cart-item-image" style={{ backgroundColor: category.color }}>
        <i className={`fa-solid ${category.icon}`}></i>
        <img src={`/${product.image}`} alt="" onError={(event) => event.target.remove()} />
      </div>
      <div className="cart-item-details">
        <p className="cart-item-name">{product.name}</p>
        <p className="cart-item-price">{formatPrice(product.price)} each</p>
        <div className="quantity-controls">
          <button
            type="button"
            className="qty-button"
            aria-label={`Decrease quantity of ${product.name}`}
            disabled={item.quantity <= 1}
            onClick={() => onDecrease(item.id)}
          >
            &minus;
          </button>
          <span className="quantity">{item.quantity}</span>
          <button
            type="button"
            className="qty-button"
            aria-label={`Increase quantity of ${product.name}`}
            disabled={item.quantity >= maxQuantity}
            onClick={() => onIncrease(item.id)}
          >
            +
          </button>
        </div>
      </div>
      <div className="cart-item-side">
        <p className="cart-item-total">{formatPrice(product.price * item.quantity)}</p>
        <button
          type="button"
          className="remove-button"
          aria-label={`Remove ${product.name} from cart`}
          onClick={() => onRemove(item.id)}
        >
          Remove
        </button>
      </div>
    </li>
  );
}