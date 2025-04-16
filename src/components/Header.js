// import { onAuthStateChanged, signOut } from "firebase/auth";
// import { auth } from "../utils/firebase";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import { addUser, removeUser } from "../utils/appSlice";
// import { LOGO, SUPPORTED_LANGUAGES, USER_AVATAR } from "../utils/constants";
// import { toggleGptSearchView } from "../utils/gptSlice";
// import { changeLanguage } from "../utils/configSlice";
// import GptSearch from "./GptSearch";


// const Header = () => {
//   const user = useSelector((store) => store.user);
//   const showGptSearch = useSelector((store)=> store.gpt.showGptSearch)
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const handleSignout = () => {
//     signOut(auth)
//       .then(() => {})
//       .catch((error) => {
//         // An error happened.
//         navigate("/error");
//       });
//   };

//   //handleGptSearch
//   const handleGptSearchClick = () => {
//     dispatch(toggleGptSearchView());
//   };

//   const handleLanguageChange = (e) => {
//     //console.log(e.target.value)
//     dispatch(changeLanguage(e.target.value));
//   };
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         const { uid, email, displayName } = user;
//         dispatch(addUser({ uid, email, displayName }));
//         navigate("/browse");
//       } else {
//         // User is signed out
//         dispatch(removeUser()); //no need to pass anything
//         navigate("/");
//       }
//     });
//     return () => unsubscribe(); //unsubscribing onauthstatechange
//   }, []);

//   return (
//     <div className="absolute justify-between flex top-0 left-0 px-8 py-4 bg-gradient-to-b from-black z-50 w-full">
//       <img className="w-44 cursor-pointer" src={LOGO} alt="Netflix Logo" />
//       {user && (
//         <div className="flex p-2 gap-2">
//           {/* language */}
//           {showGptSearch && (
//             <div className="inline-block">
//               <select
//                 onChange={handleLanguageChange}
//                 className="bg-gray-900 p-2 text-white px-4 py-2 rounded-md cursor-pointer"
//               >
//                 {SUPPORTED_LANGUAGES.map((lang) => (
//                   <option key={lang.identifier} value={lang.identifier}>
//                     {lang.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           )}

//           <button
//             onClick={handleGptSearchClick}
//             className="p-2 rounded-lg my-2 mx-4 text-white  bg-purple-800"
//           >
//             {showGptSearch?"HomePage":"Gpt Search"}
//           </button>

//           <img
//             className="size-12 rounded-md"
//             alt="user-icon"
//             src={USER_AVATAR}
//           />
//           <button onClick={handleSignout} className="font-bold text-white">
//             Sign Out
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Header;





// .....................................................................
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/appSlice";
import { LOGO, SUPPORTED_LANGUAGES, USER_AVATAR } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignout = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid, email, displayName }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="fixed flex flex-col md:flex-row md:justify-between items-center top-0 left-0 px-4 md:px-8 py-3 bg-gradient-to-b from-black z-50 w-full">
      <img className="w-32 md:w-44 cursor-pointer" src={LOGO} alt="Netflix Logo" />

      {user && (
        <div className="flex flex-col md:flex-row items-center gap-4 mt-4 md:mt-0">
          {showGptSearch && (
            <div>
              <select
                onChange={handleLanguageChange}
                className="bg-gray-900 text-white p-2 rounded-md cursor-pointer"
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.identifier} value={lang.identifier}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <button
            onClick={handleGptSearchClick}
            className="px-4 py-2 rounded-lg text-white bg-purple-800 hover:bg-purple-700 transition"
          >
            {showGptSearch ? "HomePage" : "Gpt Search"}
          </button>

          <img
            className="w-10 h-10 rounded-md"
            alt="user-icon"
            src={USER_AVATAR}
          />

          <button
            onClick={handleSignout}
            className="font-bold text-white hover:underline"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
