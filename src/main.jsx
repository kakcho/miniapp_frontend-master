import "./App.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Router } from "react-router-dom";
import RoutesSwitch from "./routes/RoutesSwitch";
import Bar from "./components/Bar/Bar";
import ApiDataProvider from "./context/ApiDataProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApiDataProvider>
    <BrowserRouter>
      <RoutesSwitch />
    </BrowserRouter>
  </ApiDataProvider>
);
