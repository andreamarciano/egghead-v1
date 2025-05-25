import { createSlice } from "@reduxjs/toolkit";

export const cabinetSlice = createSlice({
  name: "cabinet",
  initialState: {
    value: [
      {
        id: "Tris",
        title: "Tic-Tac-Toe",
        description: "Outsmart your opponent!",
      },
      {
        id: "Flower",
        title: "Minesweeper",
        description: "Collect all the eggs!",
      },
      {
        id: "ConnectFour",
        title: "Connect Four",
        description: "Stack discs, block opponent, claim victory!",
      },
      {
        id: "OrderGame",
        title: "Order",
        description:
          "Tap numbers in sequence before time runs out. Stay sharp!",
      },
      {
        id: "SpaceInvaders",
        title: "Space Invaders",
        description: "Defend Earth from waves of pixelated aliens.",
      },
    ],
  },
  reducers: {},
});

export const cabinetReducer = cabinetSlice.reducer;
