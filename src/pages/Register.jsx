import React, { useContext, useState } from "react";
import { toastSuccessNotify, toastErrorNotify } from "../helpers/ToastNotify";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import GoogleIcon from "../assets/GoogleIcon";
const Register = () => {
  const { createUser, signUpProvider } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUser(email, password, firstName, lastName);
      toastSuccessNotify("Registration successful");
      navigate("/");
    } catch (err) {
      toastErrorNotify("Registration failed", err.message);
    }
  };

  return (
    <div className="overflow-hidden flex-1 h-screen justify-center items-center dark:bg-gray-dark-main">
      <div className="form-container mt-[5vh] w-[380px] h-[580px]">
        <form onSubmit={handleRegister}>
          <h2 className="text-red-main text-2xl font-[500] text-center tracking-[0.1em] mb-3">
            Create Account
          </h2>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              placeholder="First Name"
              className="peer"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              placeholder="Last Name"
              className="peer"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="email"
              placeholder="Email"
              className="peer"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="password"
              placeholder="Password"
              className="peer"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-danger">
            Register
          </button>
          <button
            className="flex justify-between text-center btn-danger"
            type="button"
            onClick={() => signUpProvider()}
          >
            Continue with Google
            <GoogleIcon color="currentColor" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
