import { createBrowserRouter, Navigate } from "react-router";
import HomeLayout from "../../Layout/Home-Layout/HomeLayout";
import Home from "../../Page/Home/Home";
import AuthLayout from "../../Layout/Auth-Layout/AuthLayout";
import Register from "../../Page/Auth/Registration/Register";
import Login from "../../Page/Auth/Login/Login";
import Error from "../../Page/Error/Error";
import DashBoardLayout from "../../Layout/DashBoard-Layout/DashBoardLayout";
import AdminProfile from "../../Page/Dashboard/AdminProfile";
import PrivateRoute from "../Private-Route/PrivateRoute";
import SellProduct from "../../Page/Dashboard/Sell-Product/SellProduct";
import AllProducts from "../../Page/All-Products/AllProducts";
import About from "../../Page/About/About";
import Contact from "../../Page/Contact/Contact";
import ProductDetails from "../../Page/Details/ProductDetails";
import CartInfo from "../../Page/Dashboard/Cart-Info/CartInfo";
import PaymentSuccess from "../../Page/Dashboard/Payment/PaymentSuccess";
import PaymentCancelled from "../../Page/Dashboard/Payment/PaymentCancelled";
import SellInfo from "../../Page/Dashboard/Sell-Info/SellInfo";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error></Error>,
    element: <HomeLayout></HomeLayout>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "about",
        Component: About,
      },
      {
        path: "contact",
        Component: Contact,
      },
      {
        path: "all-products",
        Component: AllProducts,
      },
      {
        path: "details/:id",
        Component: ProductDetails,
      },
    ],
  },
  {
    path: "auth",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "register",
        Component: Register,
      },
      {
        path: "login",
        Component: Login,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashBoardLayout></DashBoardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "",
        element: <Navigate to="admin-profile"></Navigate>,
      },
      {
        path: "admin-profile",
        Component: AdminProfile,
      },
      {
        path: "sell-product",
        Component: SellProduct,
      },
      {
        path: "sell-info",
        Component: SellInfo
      },
      {
        path: "cart-info",
        Component: CartInfo,
      },
      {
        path: "payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "payment-cancelled",
        Component: PaymentCancelled,
      },
    ],
  },
]);
