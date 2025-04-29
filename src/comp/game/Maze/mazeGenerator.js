export function generateMazeData(rows, cols, numTraps, numHearts, numEnemies) {
  const dirs = [
    [0, 1], // right
    [1, 0], // down
    [0, -1], // left
    [-1, 0], // up
  ];

  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));

  const mazeGrid = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      top: true,
      right: true,
      bottom: true,
      left: true,
    }))
  );

  function isValid(r, c) {
    return r >= 0 && c >= 0 && r < rows && c < cols && !visited[r][c];
  }

  // DFS Algorithm
  function dfs(r, c) {
    visited[r][c] = true;
    dirs.sort(() => Math.random() - 0.5);

    for (let [dr, dc] of dirs) {
      const nr = r + dr;
      const nc = c + dc;
      if (isValid(nr, nc)) {
        if (dr === -1) {
          mazeGrid[r][c].top = false;
          mazeGrid[nr][nc].bottom = false;
        } else if (dr === 1) {
          mazeGrid[r][c].bottom = false;
          mazeGrid[nr][nc].top = false;
        } else if (dc === -1) {
          mazeGrid[r][c].left = false;
          mazeGrid[nr][nc].right = false;
        } else if (dc === 1) {
          mazeGrid[r][c].right = false;
          mazeGrid[nr][nc].left = false;
        }
        dfs(nr, nc);
      }
    }
  }

  // Break Walls
  function addFakePaths(grid, extraConnections = 25) {
    let count = 0;

    while (count < extraConnections) {
      const r = Math.floor(Math.random() * (rows - 1));
      const c = Math.floor(Math.random() * (cols - 1));

      const directions = [
        { dr: -1, dc: 0, wall: "top", opposite: "bottom" },
        { dr: 1, dc: 0, wall: "bottom", opposite: "top" },
        { dr: 0, dc: -1, wall: "left", opposite: "right" },
        { dr: 0, dc: 1, wall: "right", opposite: "left" },
      ];

      const { dr, dc, wall, opposite } =
        directions[Math.floor(Math.random() * directions.length)];

      const nr = r + dr;
      const nc = c + dc;

      if (
        nr >= 0 &&
        nc >= 0 &&
        nr < rows &&
        nc < cols &&
        grid[r][c][wall] &&
        grid[nr][nc][opposite]
      ) {
        grid[r][c][wall] = false;
        grid[nr][nc][opposite] = false;
        count++;
      }
    }
  }

  // Find Solution
  function findSolutionPath(grid) {
    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
    const path = [];

    function dfsPath(r, c) {
      if (r === rows - 1 && c === cols - 1) {
        path.push({ row: r, col: c });
        return true;
      }

      visited[r][c] = true;
      const cell = grid[r][c];

      const directions = [
        { dr: -1, dc: 0, wall: "top" },
        { dr: 1, dc: 0, wall: "bottom" },
        { dr: 0, dc: -1, wall: "left" },
        { dr: 0, dc: 1, wall: "right" },
      ];

      for (let { dr, dc, wall } of directions) {
        const nr = r + dr;
        const nc = c + dc;
        if (
          nr >= 0 &&
          nc >= 0 &&
          nr < rows &&
          nc < cols &&
          !visited[nr][nc] &&
          !cell[wall]
        ) {
          if (dfsPath(nr, nc)) {
            path.push({ row: r, col: c });
            return true;
          }
        }
      }

      return false;
    }

    dfsPath(0, 0);
    return path.reverse();
  }

  // Trap & Heart
  function generateItems(count, rows, cols, forbiddenSet = new Set()) {
    const positions = new Set();
    while (positions.size < count) {
      const r = Math.floor(Math.random() * rows);
      const c = Math.floor(Math.random() * cols);
      const key = `${r}-${c}`;
      if (!forbiddenSet.has(key) && !positions.has(key)) {
        positions.add(key);
      }
    }

    return Array.from(positions).map((key) => {
      const [row, col] = key.split("-").map(Number);
      return { row, col };
    });
  }

  dfs(0, 0); // start

  addFakePaths(mazeGrid, 200); // break walls
  const solutionPath = findSolutionPath(mazeGrid); // show solution

  const forbidden = new Set(["0-0", `${rows - 1}-${cols - 1}`]);
  const traps = generateItems(numTraps, rows, cols, forbidden);
  const trapSet = new Set(traps.map(({ row, col }) => `${row}-${col}`));
  const hearts = generateItems(
    numHearts,
    rows,
    cols,
    new Set([...forbidden, ...trapSet])
  );
  const heartSet = new Set(hearts.map(({ row, col }) => `${row}-${col}`));
  const enemies = generateItems(
    numEnemies,
    rows,
    cols,
    new Set([...forbidden, ...trapSet, ...heartSet])
  );

  return {
    mazeGrid,
    solutionPath,
    traps,
    hearts,
    enemies,
  };
}
