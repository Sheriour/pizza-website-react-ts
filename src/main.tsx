import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
//import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import MainApp from "./components/MainApp";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MainApp />
  </StrictMode>
);
