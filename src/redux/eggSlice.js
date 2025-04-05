import { createSlice } from "@reduxjs/toolkit";

export const eggsSlice = createSlice({
  name: "eggs",
  initialState: {
    value: [
      {
        id: "egg-0",
        imgURL:
          "https://images.unsplash.com/photo-1607690424560-35d967d6ad7c?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dW92YXxlbnwwfHwwfHx8MA%3D%3D",
        alt: "Uova Bianche",
        description:
          "Uova bianche, dalle nostre galline Livornesi. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, enim.",
        price: 0.25,
        available: 100,
        shipping: true,
        universe: true,
      },
      {
        id: "egg-1",
        imgURL:
          "https://images.unsplash.com/photo-1587486913049-53fc88980cfc?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHVvdmF8ZW58MHx8MHx8fDA%3D",
        alt: "Uova Marroni",
        description:
          "Uova marroni, dalle nostre galline Ovaiole. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, enim.",
        price: 0.25,
        available: 100,
        shipping: true,
        universe: true,
      },
      {
        id: "egg-2",
        imgURL:
          "https://plus.unsplash.com/premium_photo-1676977395396-ce297307f97b?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dW92YSUyMHF1YWdsaWF8ZW58MHx8MHx8fDA%3D",
        alt: "Uova Quaglia",
        description:
          "Uova di Quaglia. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, enim.",
        price: 0.2,
        available: 100,
        shipping: true,
        universe: true,
      },
      {
        id: "egg-3",
        imgURL:
          "https://plus.unsplash.com/premium_photo-1676592430160-19e2a0c2ebe3?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHVvdmElMjBsdWNlcnRvbGF8ZW58MHx8MHx8fDA%3D",
        alt: "Uova Tacchino",
        description:
          "Uova di tacchino. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, enim.",
        price: 0.5,
        available: 100,
        shipping: true,
        universe: true,
      },
      {
        id: "egg-4",
        imgURL:
          "https://plus.unsplash.com/premium_photo-1677159451012-6722af343f1c?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fHVvdmElMjBkaW5vc2F1cm98ZW58MHx8MHx8fDA%3D",
        alt: "Uova Dinosauro",
        description:
          "Uova di dinosauro. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, enim.",
        price: 500,
        available: 2,
        shipping: true,
        universe: false,
      },
      {
        id: "egg-5",
        imgURL:
          "https://plus.unsplash.com/premium_photo-1664302684338-7ad8685177bb?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dW92YSUyMGNvY2NvZHJpbGxvfGVufDB8fDB8fHww",
        alt: "Uova Coccodrillo",
        description:
          "Uova di Coccodrillo. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, enim.",
        price: 100,
        available: 50,
        shipping: true,
        universe: true,
      },
      {
        id: "egg-6",
        imgURL:
          "https://plus.unsplash.com/premium_photo-1667239071736-888ef64c7927?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dW92YSUyMGx1Y2VydG9sYXxlbnwwfHwwfHx8MA%3D%3D",
        alt: "Uova Lucertola",
        description:
          "Uova di lucertola. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, enim.",
        price: 0.15,
        available: 100,
        shipping: true,
        universe: true,
      },
      {
        id: "egg-7",
        imgURL:
          "https://plus.unsplash.com/premium_vector-1740156768038-65a24eb50f2f?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dW92YSUyMHRhcnRhcnVnYXxlbnwwfHwwfHx8MA%3D%3D",
        alt: "Uova Tartaruga",
        description:
          "Uova di Tartaruga. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, enim.",
        price: 5,
        available: 10,
        shipping: true,
        universe: true,
      },
      {
        id: "egg-8",
        imgURL:
          "https://images.unsplash.com/photo-1488867605300-0380106bc701?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fHVvdmElMjBkaW5vc2F1cm98ZW58MHx8MHx8fDA%3D",
        alt: "Uova Pokemon",
        description:
          "Uova di Pokemon. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, enim.",
        price: 1,
        available: 100,
        shipping: true,
        universe: false,
      },
      {
        id: "egg-9",
        imgURL:
          "https://images.unsplash.com/photo-1587734528720-dc22307700bc?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Uova Yoshi",
        description:
          "Uovo di Yoshi. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, enim.",
        price: 1000,
        available: 10,
        shipping: true,
        universe: false,
      },
      {
        id: "egg-10",
        imgURL:
          "https://images.unsplash.com/photo-1666426265235-81e832ef78a9?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Uovo Alieno",
        description:
          "Uovo di Alieno. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, enim.",
        price: 5000000000,
        available: 1,
        shipping: false,
        universe: true,
      },
      {
        id: "egg-11",
        imgURL: "",
        alt: "Uovo Pinguino",
        description:
          "Uovo di Pinguino. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, enim.",
        price: 150,
        available: 10,
        shipping: true,
        universe: false,
      },
      {
        id: "egg-12",
        imgURL: "",
        alt: "Uovo Aquila",
        description:
          "Uovo di Aquila. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, enim.",
        price: 250,
        available: 5,
        shipping: true,
        universe: true,
      },
      {
        id: "egg-13",
        imgURL: "",
        alt: "Uovo Serpente",
        description:
          "Uovo di Serpente. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, enim.",
        price: 2,
        available: 40,
        shipping: true,
        universe: true,
      },
      {
        id: "egg-14",
        imgURL: "",
        alt: "Uovo Squalo",
        description:
          "Uovo di Squalo. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, enim.",
        price: 500,
        available: 2,
        shipping: false,
        universe: false,
      },
      {
        id: "egg-15",
        imgURL: "",
        alt: "Uovo Granchio",
        description:
          "Uovo di Granchio. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, enim.",
        price: 0.5,
        available: 10000,
        shipping: true,
        universe: true,
      },
      {
        id: "egg-16",
        imgURL: "",
        alt: "Uovo Rana",
        description:
          "Uovo di Rana. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, enim.",
        price: 0.2,
        available: 5000,
        shipping: true,
        universe: true,
      },
      {
        id: "egg-17",
        imgURL: "",
        alt: "Uovo Farfalla",
        description:
          "Uovo di Farfalla. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, enim.",
        price: 750,
        available: 25,
        shipping: true,
        universe: true,
      },
      {
        id: "egg-18",
        imgURL: "",
        alt: "Uovo Mosca",
        description:
          "Uovo di Mosca. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, enim.",
        price: 0.1,
        available: 10000,
        shipping: true,
        universe: true,
      },
      {
        id: "egg-19",
        imgURL: "",
        alt: "Uovo Formica",
        description:
          "Uovo di Formica. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, enim.",
        price: 0.1,
        available: 10000,
        shipping: true,
        universe: true,
      },
      {
        id: "egg-20",
        imgURL: "",
        alt: "Uovo Mantide",
        description:
          "Uovo di Mantide. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, enim.",
        price: 2.5,
        available: 80,
        shipping: true,
        universe: true,
      },
      {
        id: "egg-21",
        imgURL: "",
        alt: "Uovo Ragno",
        description:
          "Uovo di Ragno. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, enim.",
        price: 0.49,
        available: 1000,
        shipping: true,
        universe: true,
      },
      {
        id: "egg-22",
        imgURL: "",
        alt: "Uovo Scorpione",
        description:
          "Uovo di Scorpione. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, enim.",
        price: 2.99,
        available: 100,
        shipping: true,
        universe: true,
      },
      {
        id: "egg-23",
        imgURL: "",
        alt: "Uovo Polpo",
        description:
          "Uovo di Polpo. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, enim.",
        price: 0.99,
        available: 500,
        shipping: true,
        universe: false,
      },
      {
        id: "egg-24",
        imgURL: "",
        alt: "Uovo Ornitorinco",
        description:
          "Uovo di Ornitorinco. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, enim.",
        price: 20,
        available: 10,
        shipping: true,
        universe: true,
      },
      {
        id: "egg-25",
        imgURL: "",
        alt: "Uovo Drago",
        description:
          "Uovo di Drago. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, enim.",
        price: 1000000,
        available: 2,
        shipping: false,
        universe: true,
      },
      {
        id: "egg-26",
        imgURL: "",
        alt: "Uovo Fenice",
        description:
          "Uovo di Fenice. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, enim.",
        price: 5000000,
        available: 2,
        shipping: false,
        universe: true,
      },
      {
        id: "egg-27",
        imgURL: "",
        alt: "Uovo Grifone",
        description:
          "Uovo di Grifone. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, enim.",
        price: 2500000,
        available: 3,
        shipping: false,
        universe: true,
      },
      {
        id: "egg-28",
        imgURL: "",
        alt: "Uovo Kraken",
        description:
          "Uovo di Kraken. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, enim.",
        price: 10000,
        available: 3,
        shipping: false,
        universe: true,
      },
      {
        id: "egg-29",
        imgURL: "",
        alt: "Uovo Vogon",
        description:
          "Uovo di Vogon. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, enim.",
        price: 10,
        available: 1000,
        shipping: true,
        universe: true,
      },
      {
        id: "egg-30",
        imgURL: "",
        alt: "Uovo Basilisco",
        description:
          "Uovo di Basilisco. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, enim.",
        price: 50000,
        available: 10,
        shipping: true,
        universe: false,
      },
      {
        id: "egg-31",
        imgURL: "",
        alt: "Uovo Steve",
        description:
          "Uovo di Steve. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, enim.",
        price: 1,
        available: 1000000000,
        shipping: false,
        universe: false,
      },
    ],
  },
  reducers: {
    decreaseAvailability: (state, action) => {
      const { id, quantity } = action.payload;
      const egg = state.value.find((e) => e.id === id);
      if (egg && egg.available >= quantity) {
        egg.available -= quantity;
      }
    },
    increaseAvailability: (state, action) => {
      const { id, quantity } = action.payload;
      const egg = state.value.find((egg) => egg.id === id);
      if (egg) {
        egg.available += quantity;
      }
    },
  },
});

export const { decreaseAvailability, increaseAvailability } = eggsSlice.actions;
export const eggsReducer = eggsSlice.reducer;
