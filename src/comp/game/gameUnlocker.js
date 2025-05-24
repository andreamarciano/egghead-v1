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
