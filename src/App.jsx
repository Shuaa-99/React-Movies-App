import React from "react";
import "./index.css";
import { AuthContextProvider } from "./context/AuthContext";
import Router from "./router/Router";
import { ToastContainer } from "react-toastify";
import { MovieContextProvider } from "./context/MovieContext";

function App() {
  return (
    <div className="dark:bg-gray-dark-main">
      <AuthContextProvider>
        <MovieContextProvider>
          <Router />
          <ToastContainer />
        </MovieContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
