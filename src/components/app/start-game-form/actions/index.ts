export interface InitGameRequest {
  name: string;
  complexity: number;
}

export interface InitGameResponse {
  id: string;
}

export const initGame = async (
  data: InitGameRequest
): Promise<InitGameResponse> => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/init`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to initialize the game");
  }

  const result = await response.json();
  return result;
};

export const getTokenChunk = async (id: string | null, chunkNo: number) => {
  if (!id) {
    throw new Error(`Failed to retrieve player id on chunk: ${chunkNo}`);
  }

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/token/${chunkNo}?id=${id}`,
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to retrieve chunks`);
  }

  const result = await response.json();
  return result;
};

export const getLastPlayer = () => {
  const storedPlayers = localStorage.getItem("players");
  const players = storedPlayers ? JSON.parse(storedPlayers) : [];
  return players.length > 0
    ? players[players.length - 1]
    : { name: "", complexity: 1 };
};

export const savePlayerToLocalStorage = (name: string) => {
  const storedPlayers = localStorage.getItem("players");
  const players = storedPlayers ? JSON.parse(storedPlayers) : [];

  const playerIndex = players.findIndex(
    (player: { name: string }) => player.name === name
  );

  const newPlayerData = {
    name,
    complexity: 0,
    topScore: 0,
  };

  if (playerIndex !== -1) {
    players[playerIndex] = { ...players[playerIndex] };
  } else {
    players.push(newPlayerData);
  }

  localStorage.setItem("players", JSON.stringify(players));
};
