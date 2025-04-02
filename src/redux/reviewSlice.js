import { createSlice } from "@reduxjs/toolkit";

export const reviewsSlice = createSlice({
  name: "reviews",
  initialState: {
    value: [
      {
        id: 1,
        name: "Mario",
        rating: 5,
        text: "Le uova migliori della galassia! Non avrei mai pensato di poter assaggiare qualcosa di così incredibile!",
      },
      {
        id: 2,
        name: "Throlg’Nax, Zeqlon-6",
        rating: 6,
        text: "Zrex trix zin'kra! Ux'koo fratz zhilk'nan! Sog trulor xanth-xantho!",
      },
      {
        id: 3,
        name: "Claire",
        rating: 4,
        text: "Les œufs les plus délicieux que j'ai jamais goûtés ! Ils ont un goût incroyable, digne d'une autre planète ",
      },
      {
        id: 4,
        name: "John",
        rating: 2,
        text: "Not impressed. The eggs are fine, but not worth the high price.",
      },
      {
        id: 5,
        name: "Torg",
        rating: 3,
        text: "Qo'noS lo'taH jajmey! uov poHmey rIn! tIn mInDu' Qav! JIHvo' yImej!",
      },
      {
        id: 6,
        name: "Yuki",
        rating: 5,
        text: "これらの卵は最高です！食べるたびに宇宙を感じます。外はカリカリ、中はふわふわで、まさに完璧です",
      },
      {
        id: 7,
        name: "Ivan",
        rating: 1,
        text: "Абсолютно отвратительно! Вкус ужасный и цена не оправдана.",
      },
      {
        id: 8,
        name: "Sicuramente non un uovo",
        rating: 0,
        text: "Smettetela di mangiare il mio popolo!",
      },
    ],
  },
  reducers: {
    add: (state, action) => {
      state.value.push({ id: Date.now(), ...action.payload });
    },
  },
});

export const { add } = reviewsSlice.actions;

export const reviewsReducer = reviewsSlice.reducer;
