import { createSlice } from "@reduxjs/toolkit";

const initialCards = [
  {
    id: "1",
    imgURL:
      "https://images.unsplash.com/photo-1561488111-5d800fd56b8a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2l0aWVzfGVufDB8fDB8fHwy",
    alt: "Illuminated City",
    title: "Illuminated City",
    description:
      "Illuminated city buildings near the body of water under cloudy sky",
    author: "Clément Falize",
  },
  {
    id: "2",
    imgURL:
      "https://images.unsplash.com/photo-1516844113229-18646a422956?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2l0aWVzfGVufDB8fDB8fHwy",
    alt: "City Night Lights",
    title: "City Night Lights",
    description: "Time-lapse photography of city night lights",
    author: "Adrian Schwarz",
  },
  {
    id: "3",
    imgURL:
      "https://images.unsplash.com/photo-1571951103752-53c15cad28e5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y2l0aWVzfGVufDB8fDB8fHwy",
    alt: "Night Bridge",
    title: "Night Bridge",
    description: "Black and brown bridge lit up at night",
    author: "Alejandro Luengo",
  },
  {
    id: "4",
    imgURL:
      "https://images.unsplash.com/photo-1561488111-5d800fd56b8a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2l0aWVzfGVufDB8fDB8fHwy",
    alt: "Illuminated City",
    title: "Illuminated City",
    description:
      "Illuminated city buildings near the body of water under cloudy sky",
    author: "Clément Falize",
  },
  {
    id: "5",
    imgURL:
      "https://images.unsplash.com/photo-1516844113229-18646a422956?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2l0aWVzfGVufDB8fDB8fHwy",
    alt: "City Night Lights",
    title: "City Night Lights",
    description: "Time-lapse photography of city night lights",
    author: "Adrian Schwarz",
  },
  {
    id: "6",
    imgURL:
      "https://images.unsplash.com/photo-1571951103752-53c15cad28e5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y2l0aWVzfGVufDB8fDB8fHwy",
    alt: "Night Bridge",
    title: "Night Bridge",
    description: "Black and brown bridge lit up at night",
    author: "Alejandro Luengo",
  },
  {
    id: "7",
    imgURL:
      "https://images.unsplash.com/photo-1561488111-5d800fd56b8a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2l0aWVzfGVufDB8fDB8fHwy",
    alt: "Illuminated City",
    title: "Illuminated City",
    description:
      "Illuminated city buildings near the body of water under cloudy sky",
    author: "Clément Falize",
  },
  {
    id: "8",
    imgURL:
      "https://images.unsplash.com/photo-1516844113229-18646a422956?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2l0aWVzfGVufDB8fDB8fHwy",
    alt: "City Night Lights",
    title: "City Night Lights",
    description: "Time-lapse photography of city night lights",
    author: "Adrian Schwarz",
  },
  {
    id: "9",
    imgURL:
      "https://images.unsplash.com/photo-1571951103752-53c15cad28e5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y2l0aWVzfGVufDB8fDB8fHwy",
    alt: "Night Bridge",
    title: "Night Bridge",
    description: "Black and brown bridge lit up at night",
    author: "Alejandro Luengo",
  },
  {
    id: "10",
    imgURL:
      "https://images.unsplash.com/photo-1561488111-5d800fd56b8a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2l0aWVzfGVufDB8fDB8fHwy",
    alt: "Illuminated City",
    title: "Illuminated City",
    description:
      "Illuminated city buildings near the body of water under cloudy sky",
    author: "Clément Falize",
  },
  {
    id: "11",
    imgURL:
      "https://images.unsplash.com/photo-1516844113229-18646a422956?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2l0aWVzfGVufDB8fDB8fHwy",
    alt: "City Night Lights",
    title: "City Night Lights",
    description: "Time-lapse photography of city night lights",
    author: "Adrian Schwarz",
  },
  {
    id: "12",
    imgURL:
      "https://images.unsplash.com/photo-1571951103752-53c15cad28e5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y2l0aWVzfGVufDB8fDB8fHwy",
    alt: "Night Bridge",
    title: "Night Bridge",
    description: "Black and brown bridge lit up at night",
    author: "Alejandro Luengo",
  },
];

export const playgroundSlice = createSlice({
  name: "playground",
  initialState: {
    value: initialCards,
  },
  reducers: {
    removePhoto: (state, action) => {
      state.value = state.value.filter((city) => city.id !== action.payload);
    },
    restoreAll: (state) => {
      state.value = initialCards;
    },
  },
});

export const { removePhoto, restoreAll } = playgroundSlice.actions;
export const playgroundReducer = playgroundSlice.reducer;
