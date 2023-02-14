import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorGeneric from "./routes/errors/ErrorGeneric";
import Homepage from "./routes/Homepage";
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