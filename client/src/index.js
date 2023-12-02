import React from "react";
import { createRoot } from 'react-dom/client';
import App from "./App";
import Homepage from "./components/Homepage/Homepage";
import LoginSignup from "./components/LoginSignup/LoginSignup";
import CurrentChats from "./components/CurrentChats/CurrentChats";
import CreateChatroom from "./components/CreateChatroom/CreateChatroom";
import{
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginSignup/>,
  },
 {
    path: "homepage",
    element: <Homepage/>,
  },
  {
    path: "currentchats",
    element: <CurrentChats/>,
  },
  {
    path: "createchatroom",
    element: <CreateChatroom/>,
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router = {router} />
  </React.StrictMode>
);