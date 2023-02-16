import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Carousel from "./components/Carousel";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Homepage from "./pages/Homepage";
import ErrorGeneric from "./pages/errors/ErrorGeneric";

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