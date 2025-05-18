export function collisionPlayerHitFolower(
  projectilesRef,
  followersRef,
  followerConfig,
  soundURL,
  hitEnemy,
  destroyEnemy
) {
  projectilesRef.current.forEach((p, pIndex) => {
    followersRef.current.forEach((follower, fIndex) => {
      const { hitParticles: fh, stats: fs } = followerConfig;

      const hit =
        p.x < follower.x + follower.width &&
        p.x + p.width > follower.x &&
        p.y < follower.y + follower.height &&
        p.y + p.height > follower.y;

      // === HIT: FOLLOWER ===
      if (hit) {
        follower.lives -= 1;

        const centerX = follower.x + follower.width / 2;
        const centerY = follower.y + follower.height / 2;

        if (follower.lives > 0) {
          hitEnemy({
            x: centerX,
            y: centerY,
            particles: fh,
            sound: soundURL.hitFollower,
            volume: 0.6,
          });
        } else {
          destroyEnemy({
            x: centerX,
            y: centerY,
            particles: fh,
            sound: soundURL.destroyFollower,
            volume: 0.6,
            score: fs.score,
          });

          followersRef.current.splice(fIndex, 1);
        }

        projectilesRef.current.splice(pIndex, 1);
      }
    });
  });
}
