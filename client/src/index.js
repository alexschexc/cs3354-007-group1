import React from "react";
import { createRoot } from 'react-dom/client';
import App from "./App";
import Homepage from "./pages/Homepage";
import LoginSignup from "./components/LoginSignup/LoginSignup";
import Chatroom from "./pages/Chatroom";
import CurrentChats from "./pages/CurrentChats";
import CreateChatroom from "./pages/CreateChatroom";
import CoursePage from "./pages/CoursePage";
import{
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
 {
    path: "homepage",
    element: <Homepage/>,
  },
  {
    path: "chatroom",
    element: <Chatroom/>,
  },
  {
    path: "currentchats",
    element: <CurrentChats/>,
  },
  {
    path: "createchatroom",
    element: <CreateChatroom/>,
  },
  {
    path: "courses",
    element: <CoursePage/>,
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router = {router} />
  </React.StrictMode>
);