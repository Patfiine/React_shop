
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { removeFromBasket, addToBasket } from "../features/basket/basketSlice";
import { showNotification, hideNotification } from "../features/notification/notificationSlice";

import ProductCard from "../components/ProductCard";

export default function BasketPage() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.basket.items);

  const total = items.reduce((sum, item) => sum + item.price, 0);

  const [countdown, setCountdown] = useState(0);

  const handleRemove = (item) => {
    // Удаляем товар сразу
    dispatch(removeFromBasket(item.id));

    // Устанавливаем таймер 5 секунд
    setCountdown(5);

    // Показываем уведомление один раз
    dispatch(
      showNotification({
        message: `Товар "${item.title}" удалён из корзины. Отмена.`,
        type: "warning",
        undoAction: () => {
          dispatch(addToBasket(item));
          dispatch(
            showNotification({
              message: "Действие отменено",
              type: "info",
            })
          );
        },
      })
    );
  };

  // Эффект для отсчета секунд
  useEffect(() => {
    if (countdown > 0) {
      const interval = setInterval(() => {
        setCountdown((prev) => {
          const newCount = prev - 1;
          if (newCount <= 0) {
            dispatch(hideNotification());
          }
          return newCount;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [countdown, dispatch]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Корзина</h2>

      {items.length === 0 && <p>Корзина пуста</p>}

      {items.map((item) => (
        <div key={item.id} style={{ marginBottom: 20 }}>
          <ProductCard product={item} showButton={false} />
          <button onClick={() => handleRemove(item)}>Удалить</button>
        </div>
      ))}

      {items.length > 0 && <h3>Итого: {total} $</h3>}
    </div>
  );
}
