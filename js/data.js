// Caravan Market - product data
// Read by app.js to build the page.

const CATEGORIES = {
    clothing:    { label: "Clothing",               icon: "fa-shirt",        color: "#4a6fa5" },
    health:      { label: "Health & Personal Care", icon: "fa-heart-pulse",  color: "#3d8f8f" },
    furniture:   { label: "Furniture",              icon: "fa-couch",        color: "#8b6b4a" },
    electronics: { label: "Electronics",            icon: "fa-headphones",   color: "#3b4a5c" },
    beauty:      { label: "Beauty",                 icon: "fa-spa",          color: "#c0607a" },
    pets:        { label: "Pet Care",               icon: "fa-paw",          color: "#c98a3d" },
    toys:        { label: "Toys & Games",           icon: "fa-puzzle-piece", color: "#7b5ea7" },
    fashion:     { label: "Fashion",                icon: "fa-gem",          color: "#2f8f6b" }
};

// If an image file doesn't exist yet, the category placeholder shows instead.
const PRODUCTS = [
    { id: 1,  name: "Cotton Crew T-Shirt",        category: "clothing",    price: 14.99,  rating: 4.4, reviews: 312,  image: "images/products/cotton-t-shirt.jpg" },
    { id: 2,  name: "Slim Fit Chinos",            category: "clothing",    price: 34.99,  rating: 4.2, reviews: 148,  image: "images/products/slim-fit-chinos.jpg" },
    { id: 3,  name: "Padded Winter Jacket",       category: "clothing",    price: 59.99,  rating: 4.6, reviews: 421,  image: "images/products/winter-jacket.jpg" },
    { id: 4,  name: "Electric Toothbrush",        category: "health",      price: 29.99,  rating: 4.5, reviews: 892,  image: "images/products/electric-toothbrush.jpg" },
    { id: 5,  name: "Daily Moisturising Lotion",  category: "health",      price: 8.49,   rating: 4.3, reviews: 267,  image: "images/products/moisturising-lotion.jpg" },
    { id: 6,  name: "Ergonomic Office Chair",     category: "furniture",   price: 129.00, rating: 4.4, reviews: 213,  image: "images/products/office-chair.jpg" },
    { id: 7,  name: "Oak Bedside Table",          category: "furniture",   price: 45.00,  rating: 4.1, reviews: 96,   image: "images/products/bedside-table.jpg" },
    { id: 8,  name: "Compact Writing Desk",       category: "furniture",   price: 89.99,  rating: 4.5, reviews: 178,  image: "images/products/writing-desk.jpg" },
    { id: 9,  name: "Wireless Headphones",        category: "electronics", price: 79.99,  rating: 4.6, reviews: 1204, image: "images/products/wireless-headphones.jpg" },
    { id: 10, name: "Portable Bluetooth Speaker", category: "electronics", price: 39.99,  rating: 4.3, reviews: 655,  image: "images/products/bluetooth-speaker.jpg" },
    { id: 11, name: "Fast Phone Charger",         category: "electronics", price: 16.99,  rating: 4.7, reviews: 2031, image: "images/products/phone-charger.jpg" },
    { id: 12, name: "Makeup Brush Set",           category: "beauty",      price: 18.99,  rating: 4.5, reviews: 534,  image: "images/products/makeup-brushes.jpg" },
    { id: 13, name: "Matte Lipstick",             category: "beauty",      price: 9.99,   rating: 4.2, reviews: 389,  image: "images/products/matte-lipstick.jpg" },
    { id: 14, name: "Orthopaedic Dog Bed",        category: "pets",        price: 42.00,  rating: 4.7, reviews: 310,  image: "images/products/dog-bed.jpg" },
    { id: 15, name: "Cat Scratching Post",        category: "pets",        price: 24.99,  rating: 4.3, reviews: 187,  image: "images/products/cat-scratching-post.jpg" },
    { id: 16, name: "Wooden Building Blocks",     category: "toys",        price: 19.99,  rating: 4.6, reviews: 243,  image: "images/products/building-blocks.jpg" },
    { id: 17, name: "Remote Control Car",         category: "toys",        price: 27.50,  rating: 4.0, reviews: 121,  image: "images/products/remote-control-car.jpg" },
    { id: 18, name: "Colouring Pencil Set",       category: "toys",        price: 6.99,   rating: 4.8, reviews: 764,  image: "images/products/colouring-pencils.jpg" },
    { id: 19, name: "Straw Sun Hat",              category: "fashion",     price: 15.99,  rating: 4.1, reviews: 84,   image: "images/products/sun-hat.jpg" },
    { id: 20, name: "Pearl Drop Earrings",        category: "fashion",     price: 22.00,  rating: 4.4, reviews: 152,  image: "images/products/pearl-earrings.jpg" }
];