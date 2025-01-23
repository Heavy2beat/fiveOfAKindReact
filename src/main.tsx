import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./app";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import End from "./pages/End";
import Game from "./pages/Game";
import Start from "./pages/Start";
import NotFoundPage from "./pages/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "",
        element: <Start></Start>,
      },
      {
        path: "/game",
        element: <Game></Game>,
      },
      {
        path: "/end",
        element: <End></End>,
      },
    ],
  },
  
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
);
