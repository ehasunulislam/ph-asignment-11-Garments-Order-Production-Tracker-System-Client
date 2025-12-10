import React from "react";
import Title from "../../../Components/Title/Title";
import LatestProductCom from "../../../Components/Latest-Product-Com/LatestProductCom";
import { Link } from "react-router";
import { FaArrowTrendUp } from "react-icons/fa6";

const LatestProduct = () => {
  return (
    <div>
      <Title text2={"Latest Product"} />

      <section className="px-8">
        <LatestProductCom></LatestProductCom>
      </section>

      <Link to="/all-products" className="flex justify-center items-center">
        <button
          className="btn bg-secondary text-white"
        >
          Show all <FaArrowTrendUp />
        </button>
      </Link>
    </div>
  );
};

export default LatestProduct;
