import { createBrowserRouter } from "react-router";
import { Landing } from "./components/Landing";
import { Reservation } from "./components/Reservation";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Landing,
  },
  {
    path: "/reservation",
    Component: Reservation,
  },
]);
