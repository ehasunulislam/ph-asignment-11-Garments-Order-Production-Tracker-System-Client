import React, { useEffect, useState } from "react";
import useAxios from "../Hooks/useAxios";
import LatestProductCard from "../Card-Design/LatestProductCard";
import { Link } from "react-router";

const LatestProductCom = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosInstance = useAxios();

  useEffect(() => {
    axiosInstance
      .get("/products")
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [axiosInstance]);

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <span className="loading loading-spinner text-neutral"></span>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-4 py-5">
      {data.map((item) => {
        return (
          <Link key={item._id} to={`/details/${item._id}`}>
            <LatestProductCard
              images={item.images}
              productName={item.productName}
              description={item.description}
              category={item.category}
              price={item.price}
              createdBy={item.createdBy}
            />
          </Link>
        );
      })}
    </div>
  );
};

export default LatestProductCom;
