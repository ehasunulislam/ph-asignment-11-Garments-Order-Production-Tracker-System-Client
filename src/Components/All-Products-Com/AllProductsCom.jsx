import React, { useEffect, useState } from "react";
import useAxios from "../Hooks/useAxios";
import AllProductsCard from "../Card-Design/AllProductsCard";
import { Link } from "react-router";
import PageLoading from "../Loading/PageLoading";
import { GoSearch } from "react-icons/go";

const AllProductsCom = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(true);
  const axiosInstance = useAxios();

  // handle search
  const handleSearch = (value) => {
    setSearch(value);
  };

  // handle sort 
  const handleSort = (value) => {
    if (value === "Low to high") setSort("low");
    if (value === "High to low") setSort("high");
  }
 
  useEffect(() => {
    axiosInstance.get(`/all-products?search=${search}&sort=${sort}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [axiosInstance, search, sort]);

  if (loading) {
    return <PageLoading />;
  }

  return (
    <div className="px-9 md:px-13 lg:px-15 mx-auto pb-10">
      <div className="search-filter-sec flex justify-between">
        <section>
          <label className="input outline-0 w-[180px]">
            <GoSearch />
            <input
              type="search"
              placeholder="Search"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </label>
        </section>

        <section>
          <select defaultValue="Filter By Price" className="select select-md w-[180px] outline-0" onChange={(e) => handleSort(e.target.value)}>
            <option disabled={true}>Filter By Price</option>
            <option>Low to high</option>
            <option>High to low</option>
          </select>
        </section>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-4 justify-items-center">
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
