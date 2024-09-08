import { useEffect } from "react";

export const useWebSocket = (
  playerId: string | null,
  token: string | null,
  onMessage: (data: string) => void
) => {
  useEffect(() => {
    if (!playerId || !token) {
      console.error("Player ID or token missing");
      return;
    }

    const socket = new WebSocket(`${import.meta.env.VITE_BACKEND_URL}/cave`);

    // Відправляємо ідентифікатор гравця та токен після відкриття з'єднання
    socket.onopen = function () {
      console.log("Connection established");

      // Формуємо повідомлення player:[id]-[token]
      const playerMessage = `player:${playerId}-${token}`;
      socket.send(playerMessage); // Відправляємо дані гравця
      console.log(`Connection established: ${playerMessage}`);
    };

    // Обробка отриманих повідомлень
    socket.onmessage = function (event) {
      console.log(`Message received: ${event.data}`);
      onMessage(event.data); // Викликаємо callback для обробки повідомлення
    };

    // Обробка закриття з'єднання
    socket.onclose = function (event) {
      if (event.wasClean) {
        console.log(
          `Connection closed cleanly, code=${event.code}, reason=${event.reason}`
        );
      } else {
        console.log("Connection interrupted");
      }
    };

    // Обробка помилок
    socket.onerror = function (event) {
      console.error("WebSocket error:", event);
    };

    // Закриття WebSocket при демонтажі компонента
    return () => {
      socket.close();
    };
  }, [playerId, token, onMessage]);
};
