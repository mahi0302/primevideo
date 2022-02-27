import React, { useState } from "react";
import { toast } from "react-toastify";
import firebase from "../../Api/firebase";
import { Link, withRouter } from "react-router-dom";

const ForgotPassword = ({ history }) => {
  let [state, setState] = useState({
    email: "",
    loading: false,
  });

  let { email, loading } = state;
  let handleChange = e => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  let handleSubmit = async e => {
    e.preventDefault();
    try {
      setState({ loading: true });
      await firebase.auth().sendPasswordResetEmail(email);
      toast.info(
        `Password reset message has been sent to ${email} please change new password `
      );
      history.push("/login");
    } catch (error) {
      toast.error(error.message);
    }
    setState({ loading: false });
  };
  return (
    <section id="authBlock">
      <article>
        <h2>Reset password</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">email</label>
            <input
              type="text"
              name="email"
              value={email}
              onChange={handleChange}
            />
          </div>

          <div>
            <button>
              {loading === true ? "loading..." : "Forgot Password"}
            </button>
          </div>
          <div>
            <p>
              By Resetting password, you agree to Amazon's{" "}
              <a href="/">Conditions of Use</a>
              and <a href="/">Privacy Notice.</a>
            </p>
          </div>
          <div>
            <p>go back to login?</p>
            <Link to="/login">Login</Link>
          </div>
        </form>
      </article>
    </section>
  );
};

export default withRouter(ForgotPassword);
