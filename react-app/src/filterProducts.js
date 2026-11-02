// Filtering and sorting logic for the product catalogue.
// Mirrors getVisibleProducts() from the original js/app.js.
export function getVisibleProducts(products, categories, { search, category, sort }) {
    const query = search.trim().toLowerCase();

    const list = products.filter(function (product) {
        const categoryLabel = categories[product.category].label.toLowerCase();
        const matchesCategory = category === "all" || product.category === category;
        const matchesSearch = product.name.toLowerCase().includes(query) || categoryLabel.includes(query);
        return matchesCategory && matchesSearch;
    });

    if (sort === "price-low") {
        list.sort(function (a, b) { return a.price - b.price; });
    } else if (sort === "price-high") {
        list.sort(function (a, b) { return b.price - a.price; });
    } else if (sort === "rating") {
        list.sort(function (a, b) { return b.rating - a.rating || b.reviews - a.reviews; });
    }

    return list;
}