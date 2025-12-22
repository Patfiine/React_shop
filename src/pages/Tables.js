
import React from "react";

export default function Tables() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Таблицы</h1>
      <p>Здесь представлены схемы и таблицы по проекту.</p>

      <div style={{
        display: "flex",
        gap: 20,
        flexWrap: "wrap",
        marginTop: 20
      }}>
        <div style={{ flex: "1 1 45%", textAlign: "center" }}>
          <img
            src="/images/table1.png"
            alt="Таблица 1"
            style={{ width: "100%", borderRadius: 10, boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}
          />
          <p>Таблица №1 — Производительность (CPU)</p>
        </div>

        <div style={{ flex: "1 1 45%", textAlign: "center" }}>
          <img
            src="/images/table2.png"
            alt="Таблица 2"
            style={{ width: "100%", borderRadius: 10, boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}
          />
          <p>Таблица №2 — Графика (GPU)</p>
        </div>
      </div>
    </div>
  );
}
