import { useState, useEffect } from "react";
import { PRODUCTS } from "./data.js";

const CART_STORAGE_KEY = "caravan-cart";
const MAX_QUANTITY = 10;
export const FREE_DELIVERY_THRESHOLD = 50;
export const DELIVERY_COST = 4.99;

function findProduct(id) {
    return PRODUCTS.find(function (product) {
        return product.id === id;
    });
}

function loadCart() {
    try {
        const saved = JSON.parse(localStorage.getItem(CART_STORAGE_KEY));

        if (!Array.isArray(saved)) {
            return [];
        }

        return saved
            .filter(function (item) {
                return findProduct(item.id) && Number.isInteger(item.quantity) && item.quantity > 0;
            })
            .map(function (item) {
                return { id: item.id, quantity: Math.min(item.quantity, MAX_QUANTITY) };
            });
    } catch (error) {
        return [];
    }
}

export function useCart() {
    const [cart, setCart] = useState(loadCart);

    useEffect(() => {
        try {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
        } catch (error) {
            // localStorage can be blocked (e.g. private browsing)
        }
    }, [cart]);

    function addToCart(id) {
        setCart((current) => {
            const existing = current.find((item) => item.id === id);
            if (existing) {
                return current.map((item) =>
                    item.id === id ? { ...item, quantity: Math.min(item.quantity + 1, MAX_QUANTITY) } : item
                );
            }
            return [...current, { id, quantity: 1 }];
        });
    }

    function changeQuantity(id, change) {
        setCart((current) =>
            current.map((item) =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, Math.min(item.quantity + change, MAX_QUANTITY)) }
                    : item
            )
        );
    }

    function removeFromCart(id) {
        setCart((current) => current.filter((item) => item.id !== id));
    }

    const count = cart.reduce((sum, item) => sum + item.quantity, 0);

    let subtotalPence = 0;
    cart.forEach((item) => {
        const product = findProduct(item.id);
        subtotalPence += Math.round(product.price * 100) * item.quantity;
    });
    const isFreeDelivery = subtotalPence === 0 || subtotalPence >= FREE_DELIVERY_THRESHOLD * 100;
    const deliveryPence = isFreeDelivery ? 0 : Math.round(DELIVERY_COST * 100);

    const totals = {
        subtotal: subtotalPence / 100,
        delivery: deliveryPence / 100,
        total: (subtotalPence + deliveryPence) / 100,
    };

    return { cart, count, totals, addToCart, changeQuantity, removeFromCart, maxQuantity: MAX_QUANTITY };
}