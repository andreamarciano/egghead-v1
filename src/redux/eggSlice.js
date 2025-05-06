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
          "https://images.unsplash.com/photo-1645218168047-5f8bb882f717?q=80&w=300&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
          "https://images.unsplash.com/photo-1587734528720-dc22307700bc?q=80&w=300&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
          "https://images.unsplash.com/photo-1666426265235-81e832ef78a9?q=80&w=300&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Uovo Alieno",
        description:
          "Uovo di Alieno. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, enim.",
        price: 5000000000,
        available: 1,
        shipping: false,
        universe: true,
        game: true,
      },
      {
        id: "egg-11",
        imgURL:
          "https://images.unsplash.com/photo-1744899306747-606549a5e96d?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTUyfHx1b3ZhJTIwY29sb3JhdGV8ZW58MHx8MHx8fDI%3D",
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
        imgURL:
          "https://images.unsplash.com/photo-1591476222315-7123c46cc1c7?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTY1fHx1b3ZhJTIwY29sb3JhdGV8ZW58MHx8MHx8fDI%3D",
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
        imgURL:
          "https://images.unsplash.com/photo-1617002937824-1c2f5577ff2f?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTkwfHx1b3ZhJTIwY29sb3JhdGV8ZW58MHx8MHx8fDI%3D",
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
        imgURL:
          "https://images.unsplash.com/photo-1711705422785-1080757d3c84?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTk5fHx1b3ZhJTIwY29sb3JhdGV8ZW58MHx8MHx8fDI%3D",
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
        imgURL:
          "https://images.unsplash.com/photo-1649648075259-952613bff63f?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjMxfHx1b3ZhJTIwY29sb3JhdGV8ZW58MHx8MHx8fDI%3D",
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
        imgURL:
          "https://images.unsplash.com/photo-1651952355771-c07e50437629?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTczfHx1b3ZhJTIwY29sb3JhdGV8ZW58MHx8MHx8fDI%3D",
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
        imgURL:
          "https://images.unsplash.com/photo-1577781345786-99b30b2cfe07?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dW92YSUyMGNvbG9yYXRlfGVufDB8fDB8fHwy",
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
        imgURL:
          "https://images.unsplash.com/photo-1636407703476-0c9111fecfb7?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjM4fHx1b3ZhJTIwY29sb3JhdGV8ZW58MHx8MHx8fDI%3D",
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
        imgURL:
          "https://images.unsplash.com/photo-1742094509964-800134cb1f75?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjQ0fHx1b3ZhJTIwY29sb3JhdGV8ZW58MHx8MHx8fDI%3D",
        alt: "Uovo Formica",
        description:
          "Uovo di Formica. Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, enim.",
        price: 0.1,
        available: 10000,
        shipping: true,
        universe: true,
        // game: true,
      },
      {
        id: "egg-20",
        imgURL:
          "https://images.unsplash.com/photo-1645103243269-699b0740dee3?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjU3fHx1b3ZhJTIwY29sb3JhdGV8ZW58MHx8MHx8fDI%3D",
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
        imgURL:
          "https://images.unsplash.com/photo-1650728305461-0249188f4c3e?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjY2fHx1b3ZhJTIwY29sb3JhdGV8ZW58MHx8MHx8fDI%3D",
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
        imgURL:
          "https://images.unsplash.com/photo-1587049857921-303e0f3f1a34?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjgyfHx1b3ZhJTIwY29sb3JhdGV8ZW58MHx8MHx8fDI%3D",
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
        imgURL:
          "https://images.unsplash.com/photo-1680535447353-97e1f23ded88?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzA4fHx1b3ZhJTIwY29sb3JhdGV8ZW58MHx8MHx8fDI%3D",
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
        imgURL:
          "https://images.unsplash.com/photo-1583219691003-11f9a428e212?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA0fHx1b3ZhJTIwY29sb3JhdGV8ZW58MHx8MHx8fDI%3D",
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
        imgURL:
          "https://images.unsplash.com/photo-1649288674128-46334eacf374?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAxfHx1b3ZhJTIwY29sb3JhdGV8ZW58MHx8MHx8fDI%3D",
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
        imgURL:
          "https://images.unsplash.com/photo-1743844479489-f6f1e47f4b12?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjJ8fHVvdmElMjBjb2xvcmF0ZXxlbnwwfHwwfHx8Mg%3D%3D",
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
        imgURL:
          "https://images.unsplash.com/photo-1681485643332-6fe2830a27a5?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzN8fHVvdmElMjBjb2xvcmF0ZXxlbnwwfHwwfHx8Mg%3D%3D",
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
        imgURL:
          "https://images.unsplash.com/photo-1649797335407-93f09228c8fd?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzg2fHx1b3ZhJTIwY29sb3JhdGV8ZW58MHx8MHx8fDI%3D",
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
        imgURL:
          "https://images.unsplash.com/photo-1566200417568-75fba9ffb3c9?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTI0fHx1b3ZhJTIwY29sb3JhdGV8ZW58MHx8MHx8fDI%3D",
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
        imgURL:
          "https://images.unsplash.com/photo-1651144440711-9824c0d50520?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzV8fHVvdmElMjBjb2xvcmF0ZXxlbnwwfHwwfHx8Mg%3D%3D",
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
        imgURL:
          "https://images.unsplash.com/vector-1738925710041-c67746b5e168?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dW92YSUyMG1pbmVjcmFmdHxlbnwwfHwwfHx8Mg%3D%3D",
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
