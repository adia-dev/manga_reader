import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Carousel from "./components/Carousel";
import MangaPage from "./components/MangaPage";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import ErrorGeneric from "./pages/errors/ErrorGeneric";
import Homepage from "./pages/Homepage";


export default createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorGeneric />,
        children: [
            {
                path: "/",
                element: <Homepage />,
            },
            {
                path: "/carousel",
                element: <Carousel />,
            },
            {
                path: "/profile",
                element: <Profile />,
            },
            {
                path: "/manga/:id",
                element: <MangaPage />,
            },
        ],
    },
    {
        path: "/login",
        element: <Signin accountSectionOpened={true} setAccountSectionOpened={() => { }} />,
    },
    {
        path: "/signup",
        element: <Signup />,
    },

])