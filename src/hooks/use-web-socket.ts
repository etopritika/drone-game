import { useEffect } from "react";

export const useWebSocket = (
  shouldConnect: boolean,
  playerId: string | null,
  token: string | null,
  onMessage: (data: string) => void
) => {
  useEffect(() => {
    if (!shouldConnect || !playerId || !token) {
      console.error("Missing player ID or token.");
      return;
    }

    const socket = new WebSocket(`${import.meta.env.VITE_BACKEND_URL}/cave`);

    socket.onopen = function () {
      console.log("WebSocket opened successfully.");

      const playerMessage = `player:${playerId}-${token}`;
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(playerMessage);
        console.log(`Sent player info: ${playerMessage}`);
      } else {
        console.error("WebSocket is not open.");
      }
    };

    socket.onmessage = function (event) {
      onMessage(event.data);
    };

    socket.onerror = function (event) {
      console.error("WebSocket error:", event);
    };

    socket.onclose = function (event) {
      if (event.wasClean) {
        console.log(
          `WebSocket closed cleanly: code=${event.code}, reason=${event.reason}`
        );
      } else {
        console.error("WebSocket connection closed unexpectedly.");
      }
    };

    return () => {
      console.log("Closing WebSocket connection.");
      if (socket.readyState === WebSocket.OPEN) {
        socket.close();
        console.log("WebSocket connection closed.");
      }
    };
  }, [shouldConnect, playerId, token, onMessage]);
};
