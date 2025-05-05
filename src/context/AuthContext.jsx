import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import { toastSuccessNotify } from "../helpers/ToastNotify";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../auth/firebase";

//  create context
export const AuthContext = createContext();

//  (provider)
export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const createUser = async (email, password, displayName) => {
    console.log("Trying to register:", email);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User created:", userCredential.user);
      await updateProfile(auth.currentUser, { displayName });
      console.log("Profile updated with name:", displayName);
      setCurrentUser(auth.currentUser);
      toastSuccessNotify("Registration successful");
      navigate("/");
    } catch (err) {
      console.error("❌ Error in createUser:", err.message);
      throw err;
    }
  };

  // sign in
  const signIn = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
    toastSuccessNotify("Login successful");
    navigate("/");
  };

  // sign in with google
  const signUpProvider = async () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        navigate("/");
        toastSuccessNotify("Logged in successfully!");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // logout
  const logOut = () => {
    signOut(auth);
    toastSuccessNotify("Logged out successfully!");
    navigate("/");
  };
  // forgot password
  const forgotPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      toastSuccessNotify("Password reset link sent. Please check your email!");
    } catch (error) {
      console.log(error.message);
    }
  };

  // current user observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      user ? setCurrentUser(user) : setCurrentUser(null);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        createUser,
        signIn,
        logOut,
        signUpProvider,
        forgotPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
