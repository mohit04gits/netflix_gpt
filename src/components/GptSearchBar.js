// import { useSelector } from "react-redux";
// import lang from "../utils/languageConstants";
// import { useRef } from "react";
// import openai from "../utils/openai";

// const GptSearchBar = () => {
//   const langKey = useSelector((store) => store.config.lang);
//   const searchText = useRef(null);

//   const gptQuery = "Act as a Movie Recommendadtion system and suggest some movies for the query" + searchText.current.value + " only give me names of 5 movies,comma seperated like the example given ahead> Example Result:Gadar,Sholay,Don,Koio Mil Gaya,Golmaal";

//   const handleGptSearchClick = async () => {
//     // Make it async
//     if (!searchText.current) return;
//     console.log(searchText.current.value);
//     const gptResults = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: [
//         { role: "user", content: gptQuery },
//       ],
//     });
//     console.log(gptResults.choices); // You probably want to see the result too
//   };

//   return (
//     <div className="pt-[10%] flex justify-center">
//       <form
//         onSubmit={(e) => e.preventDefault()}
//         className="w-1/2 bg-black grid grid-cols-12"
//       >
//         <input
//           ref={searchText}
//           type="text"
//           className="p-4 m-4 col-span-9"
//           placeholder={lang[langKey].gptSearchPlaceholder}
//         />
//         <button
//           onClick={handleGptSearchClick}
//           className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg"
//         >
//           {lang[langKey].search}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default GptSearchBar;

import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { useRef } from "react";
import axios from "axios";
import { API_OPTIONS, OPEN_AI_KEY } from "../utils/constants";
import { addMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
    const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);

  //search movie in TMDB
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();

    return json.results;
  };

  const handleGptSearchClick = async () => {
    const prompt =
      "Act as a Movie Recommendation system and suggest some movies for the query: " +
      searchText.current.value +
      ". Only give me names of 5 movies, comma separated.no introduction just want movie Example: Gadar, Sholay, Don, Koi Mil Gaya, Golmaal.";

    try {
      const response = await axios.post(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          model: "llama3-70b-8192",
          messages: [{ role: "user", content: prompt }],
        },
        {
          headers: {
            Authorization: `Bearer ${OPEN_AI_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const choices = response.data?.choices;

      if (!choices || choices.length === 0) {
        console.error("No choices found from Groq API");
        return;
      }

      console.log(choices[0].message.content);

      const gptMovies = choices[0].message.content
        .split(",")
        .map((movie) => movie.trim());

      // Now search each movie on TMDB
      const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
      const tmdbResults = await Promise.all(promiseArray);
      console.log(tmdbResults);

      dispatch(addMovieResult({movieNames: gptMovies, movieResults:tmdbResults  }))
      
    } catch (error) {
      console.error("Groq API Error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="pt-[10%]  flex justify-center">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-1/2 bg-black grid grid-cols-12"
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 col-span-9"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          onClick={handleGptSearchClick}
          className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg"
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
