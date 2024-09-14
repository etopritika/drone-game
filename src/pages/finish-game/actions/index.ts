interface Player {
  name: string;
  topScore: number;
  complexity: number;
}

export const getStoredPlayers = (): Player[] => {
  const storedPlayers = localStorage.getItem("players");
  return storedPlayers ? JSON.parse(storedPlayers) : [];
};

export const updatePlayerScore = (
  name: string,
  complexity: number,
  score: number
) => {
  const players = getStoredPlayers();

  const playerIndex = players.findIndex((player) => player.name === name);

  if (playerIndex !== -1) {
    const currentTopScore = players[playerIndex].topScore;
    if (score > currentTopScore) {
      players[playerIndex].topScore = score;
      players[playerIndex].complexity = complexity;
    }
  } else {
    players.push({ name, topScore: score, complexity });
  }

  localStorage.setItem("players", JSON.stringify(players));
};

export const getTopPlayerByName = (name: string): Player | null => {
  const players = getStoredPlayers();
  return players.find((player) => player.name === name) || null;
};
