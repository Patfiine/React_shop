
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { addToBasket } from "../features/basket/basketSlice";
import { showNotification } from "../features/notification/notificationSlice";

import products from "../data/products";
import ProductCard from "../components/ProductCard";

export default function Shop() {
  const dispatch = useDispatch();
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

  const handleAddToBasket = (product) => {
    dispatch(addToBasket(product));

    dispatch(
      showNotification({
        message: "Товар добавлен в корзину",
        type: "success",
      })
    );
  };

  return (
    <main style={{ padding: 20 }}>
      <h1>О магазине — Товары</h1>

      {!selectedCategory ? (
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              style={{
                cursor: "pointer",
                border: "1px solid #e6e6e6",
                padding: 10,
                borderRadius: 8,
                textAlign: "center",
                background: "#fff",
              }}
            >
              <img src={cat.image} alt={cat.title} width={200} />
              <h3>{cat.title}</h3>
            </div>
          ))}
        </div>
      ) : (
        <>
          <button
            onClick={() => setSelectedCategory(null)}
            style={{ marginBottom: 20 }}
          >
            ← Назад к категориям
          </button>

          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToBasket={() => handleAddToBasket(product)}
              />
            ))}
          </div>
        </>
      )}
    </main>
  );
}
