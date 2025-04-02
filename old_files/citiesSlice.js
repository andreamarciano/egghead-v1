import { createSlice } from "@reduxjs/toolkit";

export const citiesSlice = createSlice({
  name: "cities",
  initialState: {
    value: [
      {
        id: 0,
        name: "Tokyo",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, amet.",
        imgURL:
          "https://plus.unsplash.com/premium_photo-1661902398022-762e88ff3f82?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dG9reW98ZW58MHx8MHx8fDA%3D",
        isVisited: true,
      },
      {
        id: 1,
        name: "New York",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, amet.",
        imgURL:
          "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bmV3JTIweW9ya3xlbnwwfHwwfHx8MA%3D%3D",
        isVisited: false,
      },
      {
        id: 2,
        name: "Rome",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, amet.",
        imgURL:
          "https://plus.unsplash.com/premium_photo-1675975706513-9daba0ec12a8?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cm9tZXxlbnwwfHwwfHx8MA%3D%3D",
        isVisited: true,
      },
      {
        id: 3,
        name: "Paris",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, amet.",
        imgURL:
          "https://plus.unsplash.com/premium_photo-1661919210043-fd847a58522d?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGFyaXN8ZW58MHx8MHx8fDA%3D",
        isVisited: false,
      },
    ],
  },
  reducers: {
    add: (state, action) => {
      state.value.push(action.payload);
    },
  },
});

export const { add } = citiesSlice.actions;

export const citiesReducer = citiesSlice.reducer;
