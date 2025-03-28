// import Header from "./Header";

// const Login = () => {
//   return (
//     <div>
//       <Header />
//       <div>
//         <img
//         className="h-screen w-screen absolute"
//           src="https://assets.nflxext.com/ffe/siteui/vlv3/fbf440b2-24a0-49f5-b2ba-a5cbe8ea8736/web/IN-en-20250324-TRIFECTA-perspective_d7c906ec-0531-47de-8ece-470d5061c88a_large.jpg"
//           alt="Netflix Background"
//         />
//         <form className="flex flex-col p-10 w-3/12 items-center bg-black absolute ">
//             <input type="text" placeholder="Email Address" className="p-2 m-2"/>
//             <input type="text" placeholder="Email Address" className="p-2 m-2"/>
//             <button className="p-4 m-4">Sign In</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;

import { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);

  const toggleSigInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <div className="relative h-screen w-screen">
        {/* Background Image */}
        <img
          className="h-full w-full absolute object-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/fbf440b2-24a0-49f5-b2ba-a5cbe8ea8736/web/IN-en-20250324-TRIFECTA-perspective_d7c906ec-0531-47de-8ece-470d5061c88a_large.jpg"
          alt="Netflix Background"
        />

        {/* Form Container - Centered */}
        <div className="absolute inset-0 flex justify-center items-center">
          <form className="flex gap-2 flex-col p-10 w-96 items-center bg-black bg-opacity-80 rounded-lg">
            <h2 className="text-white text-2xl font-bold mb-4">
              {isSignInForm ? "Sign In" : "Sign Up"}
            </h2>

            {/* First Name Field (Only for Sign Up) */}
            {!isSignInForm && (
              <input
                type="text"
                placeholder="First Name"
                className="p-2 m-2 w-full border border-gray-500 rounded-md bg-gray-800 text-white"
              />
            )}

            <input
              type="text"
              placeholder="Email Address"
              className="p-2 m-2 w-full border border-gray-500 rounded-md bg-gray-800 text-white"
            />
            <input
              type="password"
              placeholder="Password"
              className="p-2 m-2 w-full border border-gray-500 rounded-md bg-gray-800 text-white"
            />
            <button className="p-2 m-4 w-full bg-red-600 hover:bg-red-700 text-white font-bold rounded-md">
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
