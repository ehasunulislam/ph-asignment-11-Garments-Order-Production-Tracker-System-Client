import { createBrowserRouter } from "react-router";
import HomeLayout from "../../Layout/Home-Layout/HomeLayout";
import Home from "../../Page/Home/Home";
import AuthLayout from "../../Layout/Auth-Layout/AuthLayout";
import Register from "../../Page/Auth/Registration/Register";

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
    },
    {
        path: "auth",
        element: <AuthLayout></AuthLayout>,
        children: [
            {
                path: "register",
                Component: Register,
            }
        ]
    }
])