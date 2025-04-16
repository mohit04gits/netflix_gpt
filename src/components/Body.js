// import { createBrowserRouter } from "react-router-dom";
// import Browse from "./Browse";
// import { RouterProvider } from "react-router-dom";
// import Login from "./Login";

// import MovieDetails from "./MovieDetails";

// const Body = () => {
//   const appRouter = createBrowserRouter([
//     {
//       path: "/",
//       element: <Login />,
//     },
//     {
//       path: "/browse",
//       element: <Browse />,
//     },
//     {
//       path: `/moviedetails/:id`, // dynamic routing used here
//       element: <MovieDetails />,
//     },
//   ]);

//   return (
//     <div>
//       <RouterProvider router={appRouter}></RouterProvider>
//     </div>
//   );
// };

// export default Body;

// Body.js
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login";
import Layout from "./Layout";
import Browse from "./Browse";
import MovieDetails from "./MovieDetails";


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Login />, // Login at root
  },
  {
    path: "/browse",
    element: <Layout />, // Header always here
    children: [
      {
        index: true, // /browse
        element: <Browse />, // Browse contains MainContainer and SecondaryContainer
      },
      {
        path: "moviedetails/:id", // /browse/moviedetails/123
        element: <MovieDetails />,
      },
    ],
  },
  
]);

const Body = () => {
  return <RouterProvider router={appRouter} />;
};

export default Body;
