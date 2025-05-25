import { createSlice } from "@reduxjs/toolkit";

export const cabinetSlice = createSlice({
  name: "cabinet",
  initialState: {
    value: [
      {
        id: "Tris",
        title: "Tris",
        description: "Sfreccia tra i neon evitando gli ostacoli.",
        highscore: "9320",
      },
      {
        id: "Flower",
        title: "Flower",
        description: "Distruggi le navicelle aliene prima che ti colpiscano!",
        highscore: "7280",
      },
      {
        id: "ConnectFour",
        title: "Connect Four",
        description: "Mastica pixel e diventa infinito!",
        highscore: "10450",
      },
      {
        id: "OrderGame",
        title: "Order",
        description: "Rimbalza la pallina per distruggere i blocchi.",
        highscore: "8820",
      },
      {
        id: "SpaceInvaders",
        title: "Space Invaders",
        description: "Difendi la Terra da onde di alieni pixelati.",
        highscore: "13370",
      },
    ],
  },
  reducers: {},
});

export const cabinetReducer = cabinetSlice.reducer;
