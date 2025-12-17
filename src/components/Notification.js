// src/components/Notification.js
import React, { useEffect, useState } from "react";
import { Snackbar, Button, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { hideNotification } from "../features/notification/notificationSlice";

export default function Notification() {
  const dispatch = useDispatch();
  const { open, message, type, undoAction, duration } = useSelector(
    (state) => state.notification
  );
  
  const [secondsLeft, setSecondsLeft] = useState(duration ? duration / 1000 : 3);
  const [displayMessage, setDisplayMessage] = useState(message);

  useEffect(() => {
    setDisplayMessage(message);
    setSecondsLeft(duration ? duration / 1000 : 5);

    if (!open) return;

    if (undoAction) {
      // Запускаем обратный отсчет
      const interval = setInterval(() => {
        setSecondsLeft(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            dispatch(hideNotification());
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    } else {
      // Если нет undoAction — просто таймер закрытия
      const timer = setTimeout(() => {
        dispatch(hideNotification());
      }, duration || 3000);

      return () => clearTimeout(timer);
    }
  }, [open, message, duration, undoAction, dispatch]);

  const handleUndo = () => {
    if (undoAction) {
      undoAction();
      setDisplayMessage("Действие отменено");
      setSecondsLeft(0);
      setTimeout(() => dispatch(hideNotification()), 1500);
    }
  };

  return (
    <Snackbar
      open={open}
      onClose={() => dispatch(hideNotification())}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        severity={type || "info"}
        action={
          undoAction && (
            <Button color="inherit" size="small" onClick={handleUndo}>
              ОТМЕНИТЬ
            </Button>
          )
        }
      >
        {undoAction
          ? `${displayMessage} (${secondsLeft})`
          : displayMessage
        }
      </Alert>
    </Snackbar>
  );
}
