import { createBrowserRouter } from "react-router";
import HomeLayout from "../../Layout/Home-Layout/HomeLayout";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout></HomeLayout>,
        children: [
            {
                path: "/"
            }
        ]
    }
])