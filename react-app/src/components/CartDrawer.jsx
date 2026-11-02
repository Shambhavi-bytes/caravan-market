import { useEffect, useRef, useState } from "react";
import CartItem from "./CartItem.jsx";
import { FREE_DELIVERY_THRESHOLD } from "../useCart.js";

function formatPrice(amount) {
  return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(amount);
}

export default function CartDrawer({ isOpen, onClose, cart, totals, maxQuantity, onIncrease, onDecrease, onRemove, triggerRef }) {
  const closeButtonRef = useRef(null);
  const isFirstRender = useRef(true);
  const [checkoutDone, setCheckoutDone] = useState(false);

  // Move focus into the drawer when it opens, and back to the cart
  // button when it closes. Skipped on the very first render so the
  // page doesn't steal focus before you've clicked anything.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (isOpen) {
      closeButtonRef.current?.focus();
      setCheckoutDone(false);
    } else {
      triggerRef?.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.classList.toggle("cart-open", isOpen);
  }, [isOpen]);

  const isEmpty = cart.length === 0;

  return (
    <>
      <div className={`cart-overlay${isOpen ? " open" : ""}`} onClick={onClose}></div>
      <aside
        className={`cart-drawer${isOpen ? " open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
      >
        <div className="cart-header">
          <h2 id="cart-title">Your cart</h2>
          <button type="button" className="cart-close" aria-label="Close cart" onClick={onClose} ref={closeButtonRef}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {isEmpty ? (
          <div className="cart-empty">
            <i className="fa-solid fa-cart-shopping"></i>
            <h3>Your cart is empty</h3>
            <p>Add something you like and it will show up here.</p>
            <button type="button" className="continue-shopping" onClick={onClose}>Continue shopping</button>
          </div>
        ) : (
          <>
            <ul className="cart-items">
              {cart.map((item) => (
                <CartItem
                  item={item}
                  maxQuantity={maxQuantity}
                  onIncrease={onIncrease}
                  onDecrease={onDecrease}
                  onRemove={onRemove}
                  key={item.id}
                />
              ))}
            </ul>

            <div className="cart-summary">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>{formatPrice(totals.subtotal)}</span>
              </div>
              <div className="summary-row">
                <span>Delivery</span>
                <span>{totals.delivery === 0 ? "Free" : formatPrice(totals.delivery)}</span>
              </div>
              <div className="summary-row summary-total">
                <span>Total</span>
                <span>{formatPrice(totals.total)}</span>
              </div>
              <p className="delivery-note">
                {totals.delivery === 0
                  ? "You have free delivery."
                  : `Add ${formatPrice(FREE_DELIVERY_THRESHOLD - totals.subtotal)} more for free delivery.`}
              </p>
              <button type="button" className="checkout-button" onClick={() => setCheckoutDone(true)}>
                Checkout
              </button>
              {checkoutDone && (
                <p className="checkout-message">
                  This is a demo store, so no order was placed and no payment was taken.
                </p>
              )}
            </div>
          </>
        )}
      </aside>
    </>
  );
}