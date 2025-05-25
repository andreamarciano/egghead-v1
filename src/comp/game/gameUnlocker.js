export function getUnlockedGames() {
  return JSON.parse(localStorage.getItem("unlockedGames") || "[]");
}

export function addUnlockedGame(gameName) {
  const current = getUnlockedGames();
  if (!current.includes(gameName)) {
    current.push(gameName);
    localStorage.setItem("unlockedGames", JSON.stringify(current));
    window.dispatchEvent(new Event("gameUnlocked"));
  }
}

export function isGameUnlocked(gameName) {
  return getUnlockedGames().includes(gameName);
}

export const GameNames = {
  BATTLE: "Battle",
  CONNECT_FOUR: "ConnectFour",
  ORDER_GAME: "OrderGame",
  SPACE_INVADERS: "SpaceInvaders",
  TRIS: "Tris",
  FLOWER: "Flower",
};

export function getTopScore(gameId) {
  const scoreKeyMap = {
    [GameNames.SPACE_INVADERS]: "spaceInvadersTopScores",
    [GameNames.ORDER_GAME]: "orderGameLevel5Scores",
  };

  const key = scoreKeyMap[gameId];
  if (!key) return null;

  try {
    const scores = JSON.parse(localStorage.getItem(key));
    if (!Array.isArray(scores) || scores.length === 0) return null;
    return Math.max(...scores);
  } catch (err) {
    console.error(`Errore nel recupero score per ${gameId}:`, err);
    return null;
  }
}
