import { createSlice } from "@reduxjs/toolkit";

export const carouselSlice = createSlice({
  name: "carousel",
  initialState: {
    value: [
      {
        src: "https://images.unsplash.com/photo-1444858291040-58f756a3bdd6?q=80&w=1978&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        caption: "Our farm here on Earth",
      },
      {
        src: "https://images.unsplash.com/photo-1541873676-a18131494184?q=80&w=2036&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        caption: "Our breeder Mario at work",
      },
      {
        src: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=1908&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        caption: "Guaranteed one-day shipping across the universe",
      },
      {
        src: "https://t3.ftcdn.net/jpg/03/01/64/66/240_F_301646631_42E6MJ9eexfworD9GfIPWSeTznBg8bb2.jpg",
        caption: "Our regular customers",
      },
    ],
  },
  reducers: {},
});

export const carouselReducer = carouselSlice.reducer;
