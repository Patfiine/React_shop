import React from "react";
import ProductCard from "../components/ProductCard";


const BasketPage = ({ basketItems, onRemove }) => {
  const total = basketItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="basket-container">
      <h2>Корзина</h2>
      {basketItems.length === 0 && <p>Корзина пуста</p>}
      <div className="basket-items" style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {basketItems.map((item, index) => (
          <div key={index} className="basket-item">
            {/* Передаем один продукт, а не массив */}
            <ProductCard product={item} onAddToBasket={() => {}} showButton={false} />
            <button onClick={() => onRemove(item)}>Удалить</button>
          </div>
        ))}
      </div>
      {basketItems.length > 0 && <h3>Итого: {total} $</h3>}
    </div>
  );
};

export default BasketPage;
