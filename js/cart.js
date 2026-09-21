// Caravan Market - cart logic
// Cart DATA only, no HTML. Needs PRODUCTS from data.js.

const CART_STORAGE_KEY = "caravan-cart";
const MAX_QUANTITY = 10;
const FREE_DELIVERY_THRESHOLD = 50; // pounds
const DELIVERY_COST = 4.99;

let cart = loadCart();

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

function saveCart() {
    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
        // localStorage can be blocked (e.g. private browsing)
    }
}

function addToCart(id) {
    const item = cart.find(function (cartItem) {
        return cartItem.id === id;
    });

    if (item) {
        item.quantity = Math.min(item.quantity + 1, MAX_QUANTITY);
    } else {
        cart.push({ id: id, quantity: 1 });
    }
    saveCart();
}

function changeQuantity(id, change) {
    const item = cart.find(function (cartItem) {
        return cartItem.id === id;
    });

    if (item) {
        item.quantity = Math.max(1, Math.min(item.quantity + change, MAX_QUANTITY));
        saveCart();
    }
}

function removeFromCart(id) {
    cart = cart.filter(function (item) {
        return item.id !== id;
    });
    saveCart();
}

function getCartCount() {
    return cart.reduce(function (sum, item) {
        return sum + item.quantity;
    }, 0);
}

// Totals in pounds, calculated in pence to avoid float rounding errors.
function getCartTotals() {
    let subtotalPence = 0;

    cart.forEach(function (item) {
        const product = findProduct(item.id);
        subtotalPence += Math.round(product.price * 100) * item.quantity;
    });

    const isFreeDelivery = subtotalPence === 0 || subtotalPence >= FREE_DELIVERY_THRESHOLD * 100;
    const deliveryPence = isFreeDelivery ? 0 : Math.round(DELIVERY_COST * 100);

    return {
        subtotal: subtotalPence / 100,
        delivery: deliveryPence / 100,
        total: (subtotalPence + deliveryPence) / 100
    };
}