import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import GoogleIcon from "../assets/GoogleIcon";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toastErrorNotify } from "../helpers/ToastNotify";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, signUpProvider, forgotPassword } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      navigate("/");
    } catch (err) {
      toastErrorNotify("Login failed: " + err.message);
    }
  };

  return (
    <div className="overflow-hidden flex-1 h-screen justify-center items-center dark:bg-gray-dark-main">
      <div className={`form-container mt-[10vh] w-[380px] h-[500px]`}>
        <form onSubmit={handleSubmit}>
          <h2 className="text-red-main text-2xl font-[500] text-center tracking-[0.1em] mb-3">
            Sign In
          </h2>
          <div className="relative z-0 w-full mb-6 group">
            <input
              name="floating_email"
              type="email"
              className="peer"
              placeholder=" "
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="floating_email">Email</label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              name="floating_password"
              type="password"
              className="peer"
              placeholder=" "
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="floating_password">Password</label>
          </div>
          <div className="flex justify-between">
            <span
              onClick={() => forgotPassword(email)}
              className="py-3 font-[0.75em] cursor-pointer decoration-none text-gray-500 hover:text-[#ff4b45]"
            >
              Forgot Password
            </span>
            <Link
              className="py-3 font-[0.75em] cursor-pointer decoration-none text-gray-500 hover:text-[#ff4b45]"
              to="/register"
            >
              Sign Up
            </Link>
          </div>
          <button className="btn-danger" type="submit">
            Login
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

export default Login;
