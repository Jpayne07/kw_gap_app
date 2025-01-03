import React from "react";
import "./index.css";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from "./routes";

const container = document.getElementById("root");
const root = createRoot(container);
const router = createBrowserRouter(routes)
root.render(<RouterProvider router={router} />)

