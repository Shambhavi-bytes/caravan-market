// Caravan Market - main script
// Uses PRODUCTS and CATEGORIES (data.js) and the cart functions (cart.js)
// to handle search, filtering, sorting, and the cart panel.

const productsSection = document.getElementById("products");
const productGrid = document.getElementById("product-grid");
const productsTitle = document.getElementById("products-title");
const resultsCount = document.getElementById("results-count");
const categoryChips = document.getElementById("category-chips");
const sortSelect = document.getElementById("sort-select");
const emptyState = document.getElementById("empty-state");
const clearFiltersButton = document.getElementById("clear-filters");

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const categorySelect = document.getElementById("category-select");
const categoryTiles = document.querySelectorAll(".box");
const cartButton = document.getElementById("cart-button");
const cartCount = document.getElementById("cart-count");

const cartDrawer = document.getElementById("cart-drawer");
const cartOverlay = document.getElementById("cart-overlay");
const cartClose = document.getElementById("cart-close");
const cartItems = document.getElementById("cart-items");
const cartEmpty = document.getElementById("cart-empty");
const continueShoppingButton = document.getElementById("continue-shopping");
const cartSummary = document.getElementById("cart-summary");
const cartSubtotal = document.getElementById("cart-subtotal");
const cartDelivery = document.getElementById("cart-delivery");
const cartTotal = document.getElementById("cart-total");
const deliveryNote = document.getElementById("delivery-note");
const checkoutButton = document.getElementById("checkout-button");
const checkoutMessage = document.getElementById("checkout-message");

const state = {
    search: "",
    category: "all",
    sort: "featured"
};

function formatPrice(amount) {
    return new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP"
    }).format(amount);
}

// ---------- Products ----------

function getVisibleProducts() {
    const query = state.search.trim().toLowerCase();

    const list = PRODUCTS.filter(function (product) {
        const categoryLabel = CATEGORIES[product.category].label.toLowerCase();
        const matchesCategory = state.category === "all" || product.category === state.category;
        const matchesSearch = product.name.toLowerCase().includes(query) || categoryLabel.includes(query);
        return matchesCategory && matchesSearch;
    });

    if (state.sort === "price-low") {
        list.sort(function (a, b) { return a.price - b.price; });
    } else if (state.sort === "price-high") {
        list.sort(function (a, b) { return b.price - a.price; });
    } else if (state.sort === "rating") {
        list.sort(function (a, b) { return b.rating - a.rating || b.reviews - a.reviews; });
    }

    return list;
}

// onerror removes the <img> so the category placeholder shows underneath
// when a photo is missing.
function createProductCard(product) {
    const category = CATEGORIES[product.category];

    return `
        <article class="product-card">
            <div class="product-image" style="background-color: ${category.color}">
                <i class="fa-solid ${category.icon} product-placeholder"></i>
                <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.remove()">
            </div>
            <div class="product-info">
                <p class="product-category">${category.label}</p>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-rating">&#9733; ${product.rating.toFixed(1)} <span>(${product.reviews})</span></p>
                <p class="product-price">${formatPrice(product.price)}</p>
                <button type="button" class="add-to-cart" data-id="${product.id}">Add to cart</button>
            </div>
        </article>
    `;
}

function updateHeading(count) {
    const query = state.search.trim();

    if (state.category !== "all") {
        productsTitle.textContent = CATEGORIES[state.category].label;
    } else if (query) {
        productsTitle.textContent = "Search results";
    } else {
        productsTitle.textContent = "All products";
    }

    let text = count + (count === 1 ? " product" : " products");
    if (query) {
        text += ' for "' + query + '"';
    }
    resultsCount.textContent = text;
}

function updateControls() {
    categorySelect.value = state.category;
    sortSelect.value = state.sort;

    categoryChips.querySelectorAll(".chip").forEach(function (chip) {
        const isActive = chip.dataset.category === state.category;
        chip.classList.toggle("active", isActive);
        chip.setAttribute("aria-pressed", isActive);
    });
}

function render() {
    const list = getVisibleProducts();

    productGrid.innerHTML = list.map(createProductCard).join("");
    emptyState.hidden = list.length > 0;
    updateHeading(list.length);
    updateControls();
}

function scrollToProducts() {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    productsSection.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
}

function buildCategoryControls() {
    let chipsHtml = '<button type="button" class="chip" data-category="all">All</button>';

    for (const key in CATEGORIES) {
        const option = document.createElement("option");
        option.value = key;
        option.textContent = CATEGORIES[key].label;
        categorySelect.appendChild(option);

        chipsHtml += `<button type="button" class="chip" data-category="${key}">${CATEGORIES[key].label}</button>`;
    }

    categoryChips.innerHTML = chipsHtml;
}

// ---------- Cart ----------

function createCartItem(item) {
    const product = findProduct(item.id);
    const category = CATEGORIES[product.category];

    return `
        <li class="cart-item">
            <div class="cart-item-image" style="background-color: ${category.color}">
                <i class="fa-solid ${category.icon}"></i>
                <img src="${product.image}" alt="" onerror="this.remove()">
            </div>
            <div class="cart-item-details">
                <p class="cart-item-name">${product.name}</p>
                <p class="cart-item-price">${formatPrice(product.price)} each</p>
                <div class="quantity-controls">
                    <button type="button" class="qty-button" data-action="decrease" data-id="${product.id}"
                        aria-label="Decrease quantity of ${product.name}" ${item.quantity <= 1 ? "disabled" : ""}>&minus;</button>
                    <span class="quantity">${item.quantity}</span>
                    <button type="button" class="qty-button" data-action="increase" data-id="${product.id}"
                        aria-label="Increase quantity of ${product.name}" ${item.quantity >= MAX_QUANTITY ? "disabled" : ""}>+</button>
                </div>
            </div>
            <div class="cart-item-side">
                <p class="cart-item-total">${formatPrice(product.price * item.quantity)}</p>
                <button type="button" class="remove-button" data-action="remove" data-id="${product.id}"
                    aria-label="Remove ${product.name} from cart">Remove</button>
            </div>
        </li>
    `;
}

function renderCart() {
    const count = getCartCount();
    const isEmpty = count === 0;

    cartCount.textContent = count;
    cartButton.setAttribute("aria-label", "Cart, " + count + (count === 1 ? " item" : " items"));

    cartEmpty.hidden = !isEmpty;
    cartSummary.hidden = isEmpty;
    cartItems.innerHTML = cart.map(createCartItem).join("");
    checkoutMessage.hidden = true;

    if (!isEmpty) {
        const totals = getCartTotals();

        cartSubtotal.textContent = formatPrice(totals.subtotal);
        cartDelivery.textContent = totals.delivery === 0 ? "Free" : formatPrice(totals.delivery);
        cartTotal.textContent = formatPrice(totals.total);

        if (totals.delivery === 0) {
            deliveryNote.textContent = "You have free delivery.";
        } else {
            deliveryNote.textContent = "Add " + formatPrice(FREE_DELIVERY_THRESHOLD - totals.subtotal) + " more for free delivery.";
        }
    }
}

let elementBeforeCart = null;

function openCart() {
    elementBeforeCart = document.activeElement;
    cartDrawer.classList.add("open");
    cartOverlay.classList.add("open");
    document.body.classList.add("cart-open");
    cartClose.focus();
}

function closeCart() {
    cartDrawer.classList.remove("open");
    cartOverlay.classList.remove("open");
    document.body.classList.remove("cart-open");
    if (elementBeforeCart) {
        elementBeforeCart.focus();
    }
}

// ---------- Events ----------

searchInput.addEventListener("input", function () {
    state.search = searchInput.value;
    render();

    if (productsSection.getBoundingClientRect().top > 100) {
        scrollToProducts();
    }
});

searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        scrollToProducts();
    }
});
searchButton.addEventListener("click", scrollToProducts);

categorySelect.addEventListener("change", function () {
    state.category = categorySelect.value;
    render();
    scrollToProducts();
});

categoryChips.addEventListener("click", function (event) {
    const chip = event.target.closest(".chip");
    if (!chip) {
        return;
    }
    state.category = chip.dataset.category;
    render();
});

categoryTiles.forEach(function (tile) {
    tile.addEventListener("click", function (event) {
        event.preventDefault();
        state.category = tile.dataset.category;
        render();
        scrollToProducts();
    });
});

sortSelect.addEventListener("change", function () {
    state.sort = sortSelect.value;
    render();
});

clearFiltersButton.addEventListener("click", function () {
    state.search = "";
    state.category = "all";
    state.sort = "featured";
    searchInput.value = "";
    render();
});

productGrid.addEventListener("click", function (event) {
    const button = event.target.closest(".add-to-cart");
    if (!button) {
        return;
    }

    addToCart(Number(button.dataset.id));
    renderCart();

    button.textContent = "Added ✓";
    setTimeout(function () {
        button.textContent = "Add to cart";
    }, 1000);
});

cartItems.addEventListener("click", function (event) {
    const button = event.target.closest("button[data-action]");
    if (!button) {
        return;
    }

    const id = Number(button.dataset.id);
    const action = button.dataset.action;

    if (action === "increase") {
        changeQuantity(id, 1);
    } else if (action === "decrease") {
        changeQuantity(id, -1);
    } else if (action === "remove") {
        removeFromCart(id);
    }
    renderCart();
});

cartButton.addEventListener("click", openCart);
cartClose.addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);
continueShoppingButton.addEventListener("click", closeCart);

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && cartDrawer.classList.contains("open")) {
        closeCart();
    }
});

checkoutButton.addEventListener("click", function () {
    checkoutMessage.hidden = false;
});

document.querySelectorAll('a[href="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
        event.preventDefault();
    });
});

buildCategoryControls();
render();
renderCart();