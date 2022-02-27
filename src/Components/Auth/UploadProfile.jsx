import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import firebase from "../../Api/firebase";
import { Link, withRouter } from "react-router-dom";
import { AuthContextApi } from "../../Api/AuthContext";
import { Fragment } from "react";

const UploadProfile = ({ history }) => {
  let currentUSER = useContext(AuthContextApi);
  let [state, setState] = useState({
    photo: "",
    loading: false,
    progress: 0,
    barStatus: false,
  });

  let { photo, loading, progress, barStatus } = state;
  let handleChange = e => {
    setState({ [e.target.name]: e.target.files[0] });
  };
  let handleSubmit = async e => {
    e.preventDefault();
    try {
      let { name } = photo;
      let uploadTask = firebase
        .storage()
        .ref(`/profile-photo/${name}`)
        .put(photo);

      //firebase event
      uploadTask.on(
        "state_changed",
        snapShot => {
          //progress bar ...
          let progressBar =
            (snapShot.bytesTransferred / snapShot.totalBytes) * 100;
          setState({ loading: true, barStatus: true, progress: progressBar });
        },
        error => {
          //error handling
        },
        async () => {
          //task completion
          let downloadURL = await firebase
            .storage()
            .ref("profile-photo")
            .child(name)
            .getDownloadURL();
          currentUSER.updateProfile({
            photoURL: downloadURL,
          });
          setState({ loading: false, barStatus: false, progress: 0 });
          toast.success("successfully profile photo updated");
          window.location.assign("/profile");
        }
      );
    } catch (error) {
      toast.error(error.message);
    }
    setState({ loading: false });
  };

  let ProgressBar = () => (
    <Fragment>
      <progress value={progress} min="0" max="100"></progress>
    </Fragment>
  );
  return (
    <section id="authBlock">
      <article>
        {barStatus === true ? <ProgressBar /> : ""}
        <h2>Upload Photo</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="photo">Photo</label>
            <input type="file" name="photo" onChange={handleChange} />
          </div>

          <div>
            <button>{loading === true ? "loading..." : "Upload Photo"}</button>
          </div>
          <div>
            <p>
              By upload profile, you agree to Amazon's{" "}
              <a href="/">Conditions of Use</a>
              and <a href="/">Privacy Notice.</a>
            </p>
          </div>
          <div>
            <p>go back to profile?</p>
            <Link to="/profile">Profile</Link>
          </div>
        </form>
      </article>
    </section>
  );
};

export default withRouter(UploadProfile);
