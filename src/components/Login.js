import { useState, useRef } from "react";
import Header from "./Header";
import { checkValidInput } from "../utils/validate";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import { BG_IMG_URL } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState();
  const email = useRef(null);
  const password = useRef(null);
  const firstName = useRef(null);


  const toggleSigInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleButtonClick = () => {
    console.log(email.current.value);
    console.log(password.current.value);
    const message = checkValidInput(
      email.current.value,
      password.current.value
    );

    // console.log(message);
    setErrorMessage(message);
    if (message) return;

    //siginin/signup logic
    if (!isSignInForm) {
      //signup logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
        firstName.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          
          console.log(user);
          console.log(firstName.current.value)
          
        })
        
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " " + errorMessage);
        });
    } else {
      //signin logic
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " " + errorMessage);
        });
    }
  };

  return (
    <div>
      <Header />
      <div className="relative h-screen w-screen">
        {/* Background Image */}
        <img
          className="h-full w-full absolute object-cover"
          src={BG_IMG_URL}
          alt="Netflix Background"
        />

        <div className="absolute inset-0 flex justify-center items-center">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex gap-2 flex-col p-10 w-96 items-center bg-black bg-opacity-80 rounded-lg"
          >
            <h2 className="text-white text-2xl font-bold mb-4">
              {isSignInForm ? "Sign In" : "Sign Up"}
            </h2>

            {!isSignInForm && (
              <input
              ref={firstName}
                type="text"
                placeholder="First Name"
                className="p-2 m-2 w-full border border-gray-500 rounded-md bg-gray-800 text-white"
              />
            )}

            <input
              type="text"
              ref={email}
              placeholder="Email Address"
              className="p-2 m-2 w-full border border-gray-500 rounded-md bg-gray-800 text-white"
            />
            <input
              type="password"
              ref={password}
              placeholder="Password"
              className="p-2 m-2 w-full border border-gray-500 rounded-md bg-gray-800 text-white"
            />
            {/* //showing error */}
            <p className="text-red-500 text-lg font-semiboldbold">
              {errorMessage}
            </p>

            <button
              onClick={handleButtonClick}
              className="p-2 m-4 w-full bg-red-600 hover:bg-red-700 text-white font-bold rounded-md"
            >
              {isSignInForm ? "Sign In" : "Sign Up"}
            </button>
            <p
              className="text-white py-4 cursor-pointer"
              onClick={toggleSigInForm}
            >
              {isSignInForm
                ? "New to Netflix? Sign Up"
                : "Already a user? Sign In"}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login; 