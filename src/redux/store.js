import { configureStore } from "@reduxjs/toolkit";
import { animalsReducer } from "./animalSlice";
import { eggsReducer } from "./eggSlice";
import { reviewsReducer } from "./reviewSlice";
import { cartReducer } from "./cartSlice";

export default configureStore({
  reducer: {
    animals: animalsReducer,
    eggs: eggsReducer,
    reviews: reviewsReducer,
    cart: cartReducer,
  },
});
