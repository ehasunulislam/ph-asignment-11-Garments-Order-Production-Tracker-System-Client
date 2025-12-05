import { createBrowserRouter } from "react-router";
import HomeLayout from "../../Layout/Home-Layout/HomeLayout";
import Home from "../../Page/Home/Home";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout></HomeLayout>,
        children: [
            {
                index: true,
                Component: Home
            }
        ]
    }
])