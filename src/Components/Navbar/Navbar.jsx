import React from "react";
import { TiThMenu } from "react-icons/ti";
import { Link, NavLink } from "react-router";
import { assets } from "../../assets/assets";
import "./Navbar.css";
import useAuthInfo from "../Hooks/useAuthInfo";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, signOutFunction } = useAuthInfo();

  const handleSignOut = () => {
    signOutFunction()
      .then(() => {
        Swal.fire({
          title: "Drag me!",
          icon: "success",
          draggable: true,
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: error.message,
          text: "Something went wrong!",
          footer: '<a href="#">Why do I have this issue?</a>',
        });
      });
  };

  const link = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>

      <li>
        <NavLink to="/all-products">All-Product</NavLink>
      </li>

      <li>
        <NavLink to="/about">About us</NavLink>
      </li>

      <li>
        <NavLink to="/contact">Contact</NavLink>
      </li>

      {user && (
        <li>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar bg-primary shadow-sm text-white px-2 md:px-5 lg:px-15">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <TiThMenu />
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-[#3e4653] rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {link}
          </ul>
        </div>
        <Link to="/" className="flex gap-2 items-center">
          <img src={assets.logo} alt="logo" className="w-8" />
          <span className="font-semibold hidden md:block">Cartzilla</span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{link}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <img
            src={user.photoURL}
            alt="user image"
            className="w-8 h-8 rounded-full cursor-pointer"
            referrerPolicy="no-referrer"
          />
        ) : (
          <section>
            <Link to="/auth/login" className="btn btn-sm">
              Login
            </Link>
            <Link to="/auth/register" className="btn btn-sm ms-3">
              Register
            </Link>
          </section>
        )}

        {user ? (
          <button className="btn btn-sm ms-3" onClick={handleSignOut}>
            Log out
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Navbar;
