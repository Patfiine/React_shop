import React, { useState } from "react";
import products from "../data/products";
import ProductCard from "../components/ProductCard";

export default function Shop({ addToBasket }) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    { id: "macbook-pro", title: "MacBook Pro", image: "/images/m3 silver.jpeg" },
    { id: "macbook-air", title: "MacBook Air", image: "/images/air.jpeg" },
    { id: "iphone-base", title: "Iphone", image: "/images/iphone.png" },
    { id: "iphone-pro", title: "Iphone Pro", image: "/images/iphone pro.png" },
  ];

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.categoryId === selectedCategory)
    : [];

  return (
    <main style={{ padding: 20 }}>
      <h1>О магазине — Товары</h1>

      {!selectedCategory ? (
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          {categories.map((cat) => (
            <div key={cat.id} onClick={() => setSelectedCategory(cat.id)}>
              <img src={cat.image} alt={cat.title} width={200} />
              <h3>{cat.title}</h3>
            </div>
          ))}
        </div>
      ) : (
        <>
          <button onClick={() => setSelectedCategory(null)}>
            ← Назад
          </button>

          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            {filteredProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onAddToBasket={addToBasket}
              />
            ))}
          </div>
        </>
      )}
    </main>
  );
}
