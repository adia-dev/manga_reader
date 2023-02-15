import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorGeneric from "./pages/errors/ErrorGeneric";
import Homepage from "./pages/Homepage";
import Signin from "./components/Signin";
import Signup from "./components/Signup";

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