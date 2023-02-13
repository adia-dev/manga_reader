import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorGeneric from "./routes/errors/ErrorGeneric";
import Homepage from "./routes/Homepage";

export default createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorGeneric />,
        children: [
            {
                path: "/homepage",
                element: <Homepage />,
            },
        ],
    }
])