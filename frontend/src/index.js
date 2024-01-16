import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

//Google Login Provider
import { GoogleOAuthProvider } from "@react-oauth/google";

//CONTEXT API
import { AuthContextProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_googleClientId}>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
