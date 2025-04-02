import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { createBrowserRouter } from "react-router-dom";

import "./index.css";
import store from "./redux/store";
import App from "./App";
import Shop from "./pages/Shop";
import ProductInfoCard from "./comp/product/ProductInfoCard";
import Checkout from "./pages/Checkout";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "/shop",
    element: <Shop></Shop>,
    children: [
      {
        path: ":cardID",
        element: <ProductInfoCard />,
      },
    ],
  },
  {
    path: "/checkout",
    element: <Checkout></Checkout>,
  },
  {
    path: "/about",
    element: <About></About>,
  },
  {
    path: "*",
    element: <NotFound></NotFound>,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
