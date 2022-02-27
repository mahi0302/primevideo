import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import firebase from "../../Api/firebase";
import { toast } from "react-toastify";
import './auth.css'


const Login = ({ history }) => {
  let [state, setState] = useState({
    email: "",
    password: "",
    loading: false,
  });

  let { email, password, loading } = state;
  let handleChange = e => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  let handleSubmit = async e => {
    e.preventDefault();
    try {
      setState({ loading: true });
      let userData = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      if (userData.user.emailVerified) {
        toast.success(`successfully  ${email} logged in`);
        // history.push("/");
        window.location.assign("/");
      } else {
        toast.error(`${email} not yet verified please verify and login`);
        history.push("/login");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setState({ email: "", password: "" });
    }
    setState({ loading: false });
  };
  return (
    <section id="authBlock">
      <div id="logoBlock">
                <img src="signinlogo.png" alt="logo" />
      </div>
      <article>
        <h2>Sign-In</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">email or phone number</label>
            <input
              type="text"
              name="email"
              value={email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password">
              <span>Password</span>
              <span id="fp">
                <Link to="/forgot-password">Forgot password</Link>
              </span>
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </div>

          <div>
            <button>{loading === true ? "loading..." : "Sign-In"}</button>
          </div>
          <div>
            <p>
              By creating an account, you agree to Amazon's{" "}
              <a href="/">Conditions of Use</a>
              and <a href="/">Privacy Notice.</a>
            </p>
          </div>
          <div>
            <p>New to Amazon?</p>
            <Link to="/register">create your amazon account</Link>
          </div>
        </form>
      </article>
    </section>
  );
};

export default withRouter(Login);
