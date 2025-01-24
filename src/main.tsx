import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./app";
import { createHashRouter, RouterProvider } from "react-router-dom";
import End from "./pages/End";
import Game from "./pages/Game";
import Start from "./pages/Start";
import NotFoundPage from "./pages/NotFoundPage";
import Highscores from "./pages/Highscores";

const router = createHashRouter([
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
      {
        path: "/highscores",
        element: <Highscores></Highscores>

      },
    ],
  },
  
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
);
