import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Home from "./pages/Home/Home.jsx";
import Signup from "./pages/Authentication/Signup.jsx";
import Login from "./pages/Authentication/Login.jsx";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store.js";
import ProtectedRoute from "./service/components/ProtectedRoute.jsx";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={<span className="loading loading-spinner loading-5xl"></span>} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
);
