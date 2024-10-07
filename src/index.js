import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/stylesheet/index.css";
import App from "./App";
import { AuthContextprovider } from "./context/AuthContext";
import { ChatContextprovider } from "./context/ChatContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextprovider>
    <ChatContextprovider>
      {/* <React.StrictMode> */}
        <App />
      {/* </React.StrictMode> */}
    </ChatContextprovider>
  </AuthContextprovider>
);
