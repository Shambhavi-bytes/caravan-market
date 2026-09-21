# Caravan Market

A fictional e-commerce storefront I built as a front-end portfolio project. I started with a static HTML/CSS layout I had previously created and developed it into a working e-commerce interface using HTML, CSS and vanilla JavaScript.

**Live demo:** Coming soon

## What it does

- Browse 20 products across 8 categories
- Search products by name or category
- Filter by category (dropdown, chips, or clicking a category tile)
- Sort products by price or rating
- Add products to a shopping cart
- Increase, decrease or remove cart items
- Automatically calculate the subtotal, delivery fee and total
- Free delivery for orders over £50
- Cart is saved in the browser (localStorage), so it's still there if you refresh or come back later
- Responsive layout for desktop, tablet and mobile
- Demo checkout flow with no real payments or orders

## Why I built it this way

I chose to build this project with HTML, CSS and vanilla JavaScript rather than using a framework. This gave me the opportunity to focus on the fundamentals of front-end development, including DOM manipulation, event handling, filtering, sorting, state management and browser storage.

I also wanted to take a previously static project and turn it into something interactive and closer to a real e-commerce experience.

## Tech used

- HTML5
- CSS3
  - Flexbox
  - CSS Grid
  - Media queries
  - CSS custom properties
- Vanilla JavaScript
  - DOM manipulation
  - Event handling
  - Event delegation
  - `localStorage`
- Font Awesome for icons

## Running it locally

There is no build step required.

Clone the repository:

```bash
git clone https://github.com/Shambhavi-bytes/caravan-market.git
cd caravan-market
```

Then open `index.html` in a browser, or serve the project locally using a development server such as VS Code Live Server.

## Project structure

```text
caravan-market/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── data.js
│   ├── cart.js
│   └── app.js
└── images/
    ├── categories/
    └── products/
```

### JavaScript files

- `data.js` — product and category data
- `cart.js` — cart state, quantities, totals and `localStorage`
- `app.js` — product rendering, search, filtering, sorting and cart UI

## Images

The 8 category images are AI-generated and were created specifically for this project.

Product photography is being added gradually. Until the product images are available, the product cards use category-based placeholders so the catalogue remains fully functional.

## Known limitations

This is a portfolio project rather than a production e-commerce platform, so it does not include:

- Real payment processing or order management
- User accounts or authentication
- A backend or database
- A real product inventory system

## Future improvements

Some features I may add as the project develops:

- Product detail pages
- Product photography
- Wishlist/favourites
- More products and categories
- Backend/database integration

---

Built by Shambhavi as a front-end portfolio project.