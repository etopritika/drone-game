import { useEffect } from "react";

export const useWebSocket = (
  shouldConnect: boolean,
  playerId: string | null,
  token: string | null,
  onMessage: (data: string) => void,
  onError: (error: Event) => void
) => {
  useEffect(() => {
    if (!shouldConnect || !playerId || !token) {
      return;
    }

    const timeoutId = setTimeout(() => {
      const socket = new WebSocket(`${import.meta.env.VITE_SOCKET_URL}`);

      socket.onopen = function () {
        const playerMessage = `player:${playerId}-${token}`;
        socket.send(playerMessage);
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
        onError(event);
      };

      return () => {
        socket.close();
      };
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [shouldConnect, playerId, token, onMessage, onError]);
};
