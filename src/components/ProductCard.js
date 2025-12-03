import React from "react";

const ProductCard = ({ product, onAddToBasket, showButton = true }) => {
  return (
    <div style={{ border: "1px solid #e6e6e6", borderRadius: 8, padding: 12, width: 260, margin: 10, background: "#fff" }}>
      <div style={{ height: 140, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <img src={product.image} alt={product.title} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover" }} />
      </div>
      <h3>{product.title}</h3>
      <p>{product.description}</p>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <strong>{product.price} $</strong>
        {showButton && <button onClick={() => onAddToBasket(product)}>Добавить</button>}
      </div>
    </div>
  );
};

export default ProductCard;
