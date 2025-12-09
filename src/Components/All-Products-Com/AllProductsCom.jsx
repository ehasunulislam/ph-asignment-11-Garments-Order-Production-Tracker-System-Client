import React, { useEffect, useState } from "react";
import useAxios from "../Hooks/useAxios";
import AllProductsCard from "../Card-Design/AllProductsCard";
import { Link } from "react-router";
import PageLoading from "../Loading/PageLoading";

const AllProductsCom = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosInstance = useAxios();

  useEffect(() => {
    axiosInstance
      .get("/all-products")
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [axiosInstance]);

  if (loading) {
    return <PageLoading />;
  }
  return (
    <div className="grid grid-cols-1 md:grid-col-2 lg:grid-cols-3 gap-3 px-18 mx-auto pb-10">
      {data.map((item) => {
        return (
            <Link key={item._id} to={`/details/${item._id}`}>
              <AllProductsCard
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

export default AllProductsCom;
