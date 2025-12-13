import React, { useEffect, useState } from "react";
import useAxios from "../Hooks/useAxios";
import AllProductsCard from "../Card-Design/AllProductsCard";
import { Link } from "react-router";
import PageLoading from "../Loading/PageLoading";
import { GoSearch } from "react-icons/go";

const AllProductsCom = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const axiosInstance = useAxios();

  // handle search
  const handleSearch = (value) => {
    setSearch(value);
  };

  useEffect(() => {
    axiosInstance.get(`/all-products?search=${search}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [axiosInstance, search]);

  if (loading) {
    return <PageLoading />;
  }

  return (
    <div className="px-18 mx-auto pb-10">
      <div className="search-filter-sec">
        <label className="input outline-0">
          <GoSearch />
          <input
            type="search"
            placeholder="Search"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-col-2 lg:grid-cols-4 gap-3 mt-4">
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
    </div>
  );
};

export default AllProductsCom;
