import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import Home from "./Components/HomeComponent/Home";
import Navbar from "./Pages/NavbarPage/Navbar";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "./Api/AuthContext";
import Profile from "./Components/UserProfile/Profile";
import ProtectedRoute from "./Helpers/ProtectedRoute";
import PublicRoute from "./Helpers/PublicRoute";
import ForgotPassword from "./Components/Auth/ForgotPassword";
import UploadProfile from "./Components/Auth/UploadProfile";

const App = () => {
  return (
    <section>
      <article>
        <AuthProvider>
          <Router>
            <header>
              <Navbar />
              <ToastContainer theme="dark" />
            </header>
            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
              {/* Auth Block Route Starts here */}
              <PublicRoute path="/login" exact>
                <Login />
              </PublicRoute>
              <PublicRoute path="/register" exact>
                <Register />
              </PublicRoute>
              <PublicRoute path="/forgot-password" exact>
                <ForgotPassword />
              </PublicRoute>
              {/*  !Auth Block Route Ends here */}

              {/* Profile Route Starts here */}
              <ProtectedRoute path="/profile" exact>
                <Profile />
              </ProtectedRoute>

              <ProtectedRoute path="/upload-profile" exact>
                <UploadProfile />
              </ProtectedRoute>
            </Switch>
          </Router>
        </AuthProvider>
      </article>
    </section>
  );
};

export default App;
