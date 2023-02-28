import { React } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { createRoot } from "react-dom/client";
import App from "./App.js";


const rootContainer = document.getElementById("root");

createRoot(rootContainer).render(<App />);
