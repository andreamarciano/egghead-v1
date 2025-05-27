import { configureStore } from "@reduxjs/toolkit";
import { animalsReducer } from "./animalSlice";
import { eggsReducer } from "./eggSlice";
import { carouselReducer } from "./carouselSlice";
import { reviewsReducer } from "./reviewSlice";
import { cartReducer } from "./cartSlice";
import { cabinetReducer } from "./cabinetSlice";

export default configureStore({
  reducer: {
    animals: animalsReducer,
    eggs: eggsReducer,
    carousel: carouselReducer,
    reviews: reviewsReducer,
    cart: cartReducer,
    cabinet: cabinetReducer,
  },
});
