import { createSlice } from "@reduxjs/toolkit";

const defaultReviews = [
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
    name: "Definitely Not an Egg",
    rating: 0,
    text: "Stop eating my people!",
  },
];

const savedUserReviews = JSON.parse(localStorage.getItem("userReviews")) || []; // localStorage user reviews

export const reviewsSlice = createSlice({
  name: "reviews",
  initialState: {
    value: [...defaultReviews, ...savedUserReviews],
  },
  reducers: {
    add: (state, action) => {
      const newReview = { id: Date.now(), ...action.payload };
      state.value.push(newReview);

      const updatedUserReviews = [...savedUserReviews, newReview];
      // localStorage user reviews
      localStorage.setItem("userReviews", JSON.stringify(updatedUserReviews));
    },
  },
});

export const { add } = reviewsSlice.actions;

export const reviewsReducer = reviewsSlice.reducer;
