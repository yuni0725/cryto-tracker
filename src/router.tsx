import { createBrowserRouter } from "react-router-dom";
import Home from "./router/Home";
import Layout from "./components/Layout";
import Coin from "./router/Coin";
import Price from "./components/Price";
import Chart from "./components/Chart";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout></Layout>,
      children: [
        {
          path: "",
          element: <Home></Home>,
        },
        {
          path: ":coinId",
          element: <Coin></Coin>,
          children: [
            { path: "chart", element: <Chart></Chart> },
            { path: "price", element: <Price></Price> },
          ],
        },
      ],
    },
  ],
  { basename: "/cryto-tracker/" }
);
