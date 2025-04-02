import { createSlice } from "@reduxjs/toolkit";

export const reviewsSlice = createSlice({
  name: "reviews",
  initialState: {
    value: [
      {
        id: 1,
        name: "Giovanni",
        rating: 5,
        text: "Le uova migliori della galassia! Non avrei mai pensato di poter assaggiare qualcosa di così incredibile!",
      },
      {
        id: 2,
        name: "Laura",
        rating: 6,
        text: "Non tornerò mai più alle uova normali! Hanno un sapore unico e sembrano provenire direttamente dallo spazio!",
      },
      {
        id: 3,
        name: "Marco",
        rating: 4,
        text: "Ottime, ma il prezzo è lunare! Sapore eccellente, ma il portafoglio piange.",
      },
      {
        id: 4,
        name: "Serena",
        rating: 6,
        text: "Un’esperienza unica, complimenti! Le uova cantano davvero?",
      },
      {
        id: 5,
        name: "Alessandro",
        rating: 3,
        text: "Sono buone, ma mi aspettavo di più. Non sono ancora convinto.",
      },
      {
        id: 6,
        name: "Chiara",
        rating: 5,
        text: "Perfette per la colazione stellare! Croccanti fuori, morbide dentro e dal sapore spaziale!",
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
