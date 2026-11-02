const TILES = [
  { key: "clothing", heading: "Clothing", image: "clothing.jpg", alt: "Folded t-shirt, chinos, jacket and sweater" },
  { key: "health", heading: "Health & Personal Care", image: "health.jpg", alt: "Toothbrush, skincare bottles and grooming accessories" },
  { key: "furniture", heading: "Furniture", image: "furniture.jpg", alt: "Armchair and wooden side table with a lamp" },
  { key: "electronics", heading: "Electronics", image: "electronics.jpg", alt: "Headphones, tablet, phone and charging accessories" },
  { key: "beauty", heading: "Beauty Picks", image: "beauty.jpg", alt: "Makeup brushes, eyeshadow palette and lipstick" },
  { key: "pets", heading: "Pet Care", image: "pets.jpg", alt: "Pet bed, scratching post and other pet accessories" },
  { key: "toys", heading: "Toys & Games", image: "toys.jpg", alt: "Teddy bear, wooden blocks and a remote control car" },
  { key: "fashion", heading: "Fashion Trends", image: "fashion.jpg", alt: "Straw hat, sunglasses, jewellery and a handbag" },
];

export default function CategoryGrid({ onSelectCategory }) {
  return (
    <section className="category-grid" id="categories">
      {TILES.map((tile) => (
        <article
          className="box"
          data-category={tile.key}
          key={tile.key}
          onClick={(event) => {
            event.preventDefault();
            onSelectCategory(tile.key);
          }}
        >
          <div className="box-content">
            <h2>{tile.heading}</h2>
            <img className="box-img" src={`/images/categories/${tile.image}`} alt={tile.alt} />
            <a href="#products" className="box-link">See more</a>
          </div>
        </article>
      ))}
    </section>
  );
}