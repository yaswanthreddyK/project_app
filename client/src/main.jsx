import React from "react";
import ReactDOM from "react-dom/client";
import { StyledEngineProvider } from "@mui/material/styles";
import UserContextProvider from "./context/UserContextProvider"
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
    <StyledEngineProvider injectFirst>
      <UserContextProvider>
       <App />
      </UserContextProvider>
    </StyledEngineProvider>
);


