import React, { createContext, useState, useEffect } from "react";
import firebase from "./firebase";
export let AuthContextApi = createContext();

const AuthProvider = ({ children }) => {
  let [state, setState] = useState(null);
  useEffect(() => {
    return firebase.auth().onAuthStateChanged(user => {
      if (user.emailVerified === true) {
        setState(user);
        console.log(user);
      } else {
        setState(null);
      }
    });
  }, []);
  return (
    <AuthContextApi.Provider value={state}>{children}</AuthContextApi.Provider>
  );
};

export default AuthProvider;
