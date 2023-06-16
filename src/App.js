import React, { lazy, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { themeChange } from "theme-change";
import initializeApp from "./app/init";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./features/common/userSlice";

// Importing pages
const Layout = lazy(() => import("./containers/Layout"));
const Login = lazy(() => import("./pages/Login"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const Register = lazy(() => import("./pages/Register"));

// Initializing different libraries
initializeApp();

// Check for login and initialize axios

function App() {
  const dispatch = useDispatch();
  // const user = useSelector((state) => state);

  useEffect(() => {
    // 👆 daisy UI themes initialization
    themeChange(true);
  }, []);

  //Refresh
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    dispatch(setUser(user));
  }, [dispatch])

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/register" element={<Register />} />

          {/* Place new routes over this */}
          <Route path="/app/*" element={<Layout />} />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
