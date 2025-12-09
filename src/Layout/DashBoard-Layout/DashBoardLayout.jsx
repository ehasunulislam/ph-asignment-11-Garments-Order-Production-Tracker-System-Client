import React from "react";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { Link, Outlet } from "react-router";
import { assets } from "../../assets/assets";
import { CgProfile } from "react-icons/cg";
import { FaSellcast } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";


const DashBoardLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <HiArrowRightOnRectangle />
          </label>
          <div className="px-4">
            <Link to="/" className="flex gap-1 items-center">
              <img src={assets.logo} alt="logo" className="w-10" />
              <span className="font-bold">CartZilla</span>
            </Link>
          </div>
        </nav>

        {/* Outlet */}
        <main className="w-11/12 mx-auto py-5">
          <Outlet></Outlet>
        </main>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* user profile */}
            <li>
              <Link
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="User Profile"
                to="/dashboard/admin-profile"
              >
                <CgProfile size={25} />
                <span className="is-drawer-close:hidden">User Profile</span>
              </Link>
            </li>

            {/* Sell Your Product */}
            <li>
              <Link
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Sell Your Product"
                to="/dashboard/sell-product"
              >
                <FaSellcast  size={25} />
                <span className="is-drawer-close:hidden">Sell Your Product</span>
              </Link>
            </li>

            {/* Add-To-Cart Info */}
            <li>
              <Link
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Cart Info"
                to="/dashboard/cart-info"
              >
                <MdOutlineShoppingCart size={25} />
                <span className="is-drawer-close:hidden">Cart Info</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayout;
