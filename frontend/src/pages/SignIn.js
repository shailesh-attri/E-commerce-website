import { React, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes } from "firebase/storage";
import { storage, auth } from "../firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useFirebase } from "../context/firebaseContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { ToastContainer, toast } from "react-toastify";
import Signup from "./Signup";
import "react-toastify/dist/ReactToastify.css";

const SignIn = ({ setShowLoginModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupModal, setSignupModal] = useState(false);
  const [closeModal, setCloseModal] = useState(false);
  const navigate = useNavigate();

  const { updateUser } = useFirebase();
  const handleSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Update the user information in the FirebaseContext
      updateUser({
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      });
      // setShowLoginModal(false);
      setShowLoginModal(false);
      toast.success("Signed in successfully");
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  const handleSignInWithEmail = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      await user.reload(); // Refresh the user details
      setShowLoginModal(false);
      toast.success("Signed in successfully");
    } catch (error) {
      console.error("Email/Password sign-in error:", error);
      toast.error("Signed in failed");
    }
  };

  return (
    <div className="SignInModal z-[2000]">
      <div
        id="login-popup"
        tabIndex="-1"
        className="bg-black/80 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 h-full items-center justify-center flex"
      >
        <div className="relative p-4 w-full max-w-md h-full md:h-auto">
          <div className="relative bg-white rounded-lg shadow">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center popup-close"
              onClick={() => setShowLoginModal(false)}
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="#c6c7c7"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close popup</span>
            </button>

            <div className="p-5">
              <h3 className="text-2xl mb-0.5 font-medium"></h3>
              <p className="mb-4 text-sm font-normal text-gray-800"></p>

              <div className="text-center">
                <p className="mb-3 text-2xl font-semibold leading-5 text-slate-900">
                  Login to your account
                </p>
                <p className="mt-2 text-sm leading-4 text-slate-600">
                  You must be logged in to perform this action.
                </p>
              </div>

              <div className="mt-7 flex flex-col gap-2">
                <button
                  onClick={handleSignInWithGoogle}
                  className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="Google"
                    className="h-[18px] w-[18px]"
                  />
                  Continue with Google
                </button>
              </div>

              <div className="flex w-full items-center gap-2 py-6 text-sm text-slate-600">
                <div className="h-px w-full bg-slate-200"></div>
                OR
                <div className="h-px w-full bg-slate-200"></div>
              </div>

              <form
                className="w-full flex flex-col gap-4"
                onSubmit={handleSignInWithEmail}
              >
                <label htmlFor="email" className="text-[20px]">
                  Email address
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                    placeholder="Email Address"
                  />
                </label>

                <label htmlFor="password" className="text-[20px]">
                  Password
                  <input
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                  />
                </label>

                <p className="mb-3 mt-2 text-sm text-gray-500">
                  <a
                    href="/forgot-password"
                    className="text-blue-800 hover:text-blue-600"
                  >
                    Reset your password?
                  </a>
                </p>

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400"
                >
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
