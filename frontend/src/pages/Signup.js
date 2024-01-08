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
import "react-toastify/dist/ReactToastify.css";

const Signup = ({ setShowSignupModal }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
  const [closeModal, setCloseModal] = useState(false);
  
  const [displayName, setDisplayName] = useState("");
  
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  
  const navigate = useNavigate()
 
  // const handleClose2 = () => {
  //   setCloseModal(true);
  //   setSignUp(false);
  // };

  

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      // Validate password and confirmPassword
      if (password !== confirmPassword) {
        // Passwords don't match, handle this case accordingly
        console.error("Passwords do not match");
        return;
      }

      console.log("Before createUserWithEmailAndPassword");
      // Create a new user account with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("After createUserWithEmailAndPassword");

      console.log("Before uploadBytes");
      const storageRef = ref(
        storage,
        `profile_pics/${userCredential.user.uid}`
      );
      await uploadBytes(storageRef, profilePic);
      console.log("After uploadBytes");

      console.log("Before updateProfile");
      // Optionally, update the user's display name
      await updateProfile(userCredential.user, {
        displayName: displayName,
        photoURL: `https://firebasestorage.googleapis.com/v0/b/${auth.app.options.storageBucket}/o/profile_pics%2F${userCredential.user.uid}?alt=media`,
      });
      console.log("After updateProfile");

      // Set success message
      toast.success("Account created successfully!");
      setShowSignupModal(false);

      // Close the signup modal or perform any other UI update
      // setSignUpModal(false);
    } catch (error) {
      console.error("Error creating account:", error.message);
      // Handle errors and display an error message to the user
    }
  };

  


  return (
    <div className="SignInModal">
      <div
        id="signup-popup"
        tabIndex="-1"
        className="bg-black/80 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 h-full items-center justify-center flex"
      >
        <div className="relative p-4 w-full max-w-md h-full md:h-auto">
          <div className="relative bg-white rounded-lg shadow">
            <button
              onClick={() => setShowSignupModal(false)}
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center popup-close"
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
                <h3 className="text-2xl mb-0.5 font-medium">
                  Create an Account
                </h3>

                <form
                  className="w-full flex flex-col gap-4 mt-4"
                  onSubmit={handleSignUp}
                >
                  <label htmlFor="displayName" className="text-[18px]">
                    Display Name
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      required
                      className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                      placeholder="Display Name"
                    />
                  </label>

                  <label htmlFor="email" className="text-[18px]">
                    Email address
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      required
                      className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                      placeholder="Email Address"
                    />
                  </label>

                  <label htmlFor="password" className="text-[18px]">
                    Password
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="new-password"
                      required
                      className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                      placeholder="Password"
                    />
                  </label>

                  <label htmlFor="confirmPassword" className="text-[18px]">
                    Confirm Password
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      autoComplete="new-password"
                      required
                      className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                      placeholder="Confirm Password"
                    />
                  </label>

                  <label htmlFor="profilePic" className="text-[18px]">
                    Profile Picture
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setProfilePic(e.target.files[0])}
                      required
                      className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none"
                    />
                  </label>

                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400"
                  >
                    Create Account
                  </button>
                </form>

                
              </div>
          
              {/* <div className="flex items-center justify-center">
                <h1 className="text-green-500">Account Created Successfully</h1>
                <span className="text-gray-500">You can close the window.</span>
              </div> */}
        
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
