const getStoredPlayers = () => {
  const storedPlayers = localStorage.getItem("players");
  return storedPlayers ? JSON.parse(storedPlayers) : [];
};

export const updatePlayerScore = (
  name: string,
  complexity: number,
  score: number
) => {
  const players = getStoredPlayers();

  const playerIndex = players.findIndex(
    (player: { name: string; complexity: number; topScore: number }) =>
      player.name === name
  );

  if (playerIndex !== -1) {
    const currentTopScore = players[playerIndex].topScore;
    if (score > currentTopScore) {
      players[playerIndex].topScore = score;
      players[playerIndex].complexity = complexity;
      localStorage.setItem("players", JSON.stringify(players));
    }
  }
};
