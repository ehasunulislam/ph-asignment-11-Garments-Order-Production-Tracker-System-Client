import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { auth } from "../Firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  /* register functionality start */
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  /* register functionality end */

  /* SignIn with Google Functionality start */
  const signInWithGoogle = (provider) => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };
  /* SignIn with Google Functionality end */

  /* update profile functionality start */
  const updateProfileFunction = (name, photoURL) => {
    if (!auth.currentUser) {
      return;
    }

    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
  };
  /* update profile functionality end */

  /* get Current User functionality start */
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unSubscribe();
    };
  }, []);
  /* get Current User functionality end */

  const authInfo = {
    user,
    loading,
    createUser,
    updateProfileFunction,
    signInWithGoogle
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
