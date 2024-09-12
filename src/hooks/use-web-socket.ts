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

    socket.onopen = function () {
      const playerMessage = `player:${playerId}-${token}`;
      socket.send(playerMessage);
      console.log(`Connection established: ${playerMessage}`);
    };

    socket.onmessage = function (event) {
      onMessage(event.data);
    };

    socket.onclose = function (event) {
      if (event.wasClean) {
        console.log(
          `Connection closed cleanly, code=${event.code}, reason=${event.reason}`
        );
      } else {
        console.log("Connection interrupted");
      }
    };

    socket.onerror = function (event) {
      console.error("WebSocket error:", event);
    };

    return () => {
      socket.close();
    };
  }, [playerId, token, onMessage]);
};
