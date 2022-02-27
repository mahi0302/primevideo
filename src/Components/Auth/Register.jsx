import React, { useState } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import firebase from "../../Api/firebase";
import { toast } from "react-toastify";
import "./auth.css";
import { Fragment } from "react";
import Spinner from "../../Pages/Spinner/Spinner";
const Register = props => {
  let { history } = props;

  let [state, setState] = useState({
    your_name: "",
    email: "",
    password: "",
    password1: "",
    loading: false,
  });
  let { your_name, email, password, password1, loading } = state;
  let handleChange = e => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  let handleSubmit = async e => {
    e.preventDefault();
    try {
      setState({ loading: true });
      if (password === password1) {
        //connect firebase
        let userData = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);
        //? notification mail
        let message = ` verify email has been sent to  ${email} please confirm and login`;
        console.log(userData);
        userData.user.sendEmailVerification();
        //update Profile
        userData.user.updateProfile({
          displayName: your_name,
          photoURL: "https://www.w3schools.com/w3images/avatar2.png",
        });
        toast.info(message);
        history.push("/login");
        //?window.location.assign("/login"); //pure javascript way
      } else {
        toast.error("Password is not match");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
    }
    setState({ loading: false });
  };

  return (
    <Fragment>
      <section id="authBlock">
      <div id="logoBlock">
                <img src="signinlogo.png" alt="logo" />
      </div>
        <article>
          <h2>Create account</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="yourname">Your name</label>
              <input
                type="text"
                name="your_name"
                value={your_name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email">email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                placeholder="Atleast 6 characters"
                onChange={handleChange}
              />
              <p>Passwords must be at least 6 characters.</p>
            </div>
            <div>
              <label htmlFor="password1">Re-enter password</label>
              <input
                type="password"
                name="password1"
                value={password1}
                onChange={handleChange}
              />
            </div>
            <div>
              <button>
                {loading === true ? "loading..." : "create your amazon account"}
              </button>
            </div>
            <div>
              <p>
                By creating an account, you agree to Amazon's
                <p>
                  <a href="/">Conditions of Use</a>
                  and <a href="/">Privacy Notice.</a>
                </p>
              </p>
            </div>
            <div>
              <span>Already have an account?</span>{" "}
              <Link to="/login"> Sign-In</Link>
            </div>
          </form>
        </article>
      </section>
    </Fragment>
  );
};

export default withRouter(Register);
