// src/pages/Shop.js
import React from "react";
import products from "../data/products";
import { Link } from "react-router-dom";

function ProductCard({ p }) {
  return (
    <div style={{
      border: '1px solid #e6e6e6',
      borderRadius: 8,
      padding: 12,
      width: 260,
      margin: 10,
      boxSizing: 'border-box',
      background: '#fff'
    }}>
      <div style={{height: 140, display: 'flex', alignItems:'center', justifyContent:'center', overflow:'hidden'}}>
        {p.image ? <img src={p.image} alt={p.title} style={{maxWidth:'100%', maxHeight:'100%'}} /> : <div style={{color:'#999'}}>Нет изображения</div>}
      </div>
      <h3 style={{margin: '8px 0'}}>{p.title}</h3>
      <p style={{margin: '6px 0', color:'#555'}}>{p.description}</p>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <strong>{p.price} $</strong>
        <Link to="#" onClick={(e)=>{ e.preventDefault(); alert(`Добавлено в корзину: ${p.title}`); }} style={{textDecoration:'none'}}>
          <button style={{padding:'6px 10px', cursor:'pointer'}}>Добавить</button>
        </Link>
      </div>
    </div>
  );
}

export default function Shop() {
  return (
    <main style={{padding: 20}}>
      <h1>О магазине — Товары</h1>
      <p>Здесь представлен список товаров!</p>

      <div style={{display:'flex', flexWrap:'wrap', marginTop: 12}}>
        {products.map(p => <ProductCard key={p.id} p={p} />)}
      </div>
    </main>
  );
}
