import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { auth } from "../Firebase/firebase.config";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
// import useAxios from "../Components/Hooks/useAxios";
import axios from "axios";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // const axiosInstance = useAxios();

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

  /* login with email, password functionality start */
  const loginWithEmailPassword = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  /* login with email, password functionality end */

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

  /* Sign Out Functionality start */
  const signOutFunction = () => {
    setLoading(true);
    return signOut(auth);
  };
  /* Sign Out Functionality end */

  /* Current User functionality start */
 useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/${currentUser.email}`);
          setUser(res.data); 
        } catch (err) {
          console.log(err);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unSubscribe();
  }, []);

  /* Current User functionality end */

  const authInfo = {
    user,
    loading,
    createUser,
    updateProfileFunction,
    signInWithGoogle,
    loginWithEmailPassword,
    signOutFunction,
  };
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
