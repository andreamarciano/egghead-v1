export function handleShipBubbleSpawn({
  shipUpgradeRef,
  playerXRef,
  playerYRef,
  playerWidth,
  playerStats,
  playerImageRef,
  playerPart2Ref,
  playSound,
  imgURL,
  playerColor,
  soundURL,
  c,
}) {
  const u = shipUpgradeRef.current;
  if (!u) return;

  if (u.y < u.stopY) {
    u.y += u.speed;
  }

  c.drawImage(u.image, u.x, u.y, u.width, u.height);

  // COLLISION DETECTION: SHIP BUBBLE → PLAYER
  const hit =
    u.x < playerXRef.current + playerWidth &&
    u.x + u.width > playerXRef.current &&
    u.y < playerYRef.current + playerStats.height &&
    u.y + u.height > playerYRef.current;

  if (hit) {
    shipUpgradeRef.current = null;

    playerImageRef.current = new Image();
    playerImageRef.current.src = imgURL[`${playerColor}2`];
    playerPart2Ref.current = true;

    playSound(soundURL.shipUpgrade);
  }
}
