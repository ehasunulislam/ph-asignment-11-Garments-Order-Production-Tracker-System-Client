import React from "react";
import Title from "../../../Components/Title/Title";
import { FiEdit3 } from "react-icons/fi";
import { ImBin } from "react-icons/im";
import useAuthInfo from "../../../Components/Hooks/useAuthInfo";
import useAxios from "../../../Components/Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import PageLoading from "../../../Components/Loading/PageLoading";
import DataLoading from "../../../Components/Loading/Data-loading/DataLoading";

const SellInfo = () => {
  const { user } = useAuthInfo();
  const axiosInstance = useAxios();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["my-products", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosInstance.get(`/selling-products/${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) return <PageLoading />;

  return (
    <div>
      <Title text2={"Sell Information"} />

      {/* table section */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full border-collapse md:table-fixed">
          <thead className="hidden md:table-header-group">
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Available Qty</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody className="md:table-row-group">
            {products.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center text-gray-500 py-4">
                  <DataLoading />
                </td>
              </tr>
            ) : (
              products.map((item, index) => (
                <tr
                  key={item._id}
                  className="flex flex-col md:table-row mb-4 md:mb-0 border md:border-0 rounded-lg md:rounded-none p-4 md:p-0 bg-white md:bg-transparent shadow md:shadow-none"
                >
                  <td className="flex justify-between md:table-cell mb-2 md:mb-0">
                    <span className="font-semibold md:hidden">#</span>
                    {index + 1}
                  </td>
                  <td className="flex justify-between md:table-cell mb-2 md:mb-0">
                    <span className="font-semibold md:hidden">
                      Product Name
                    </span>
                    {item.productName}
                  </td>
                  <td className="flex justify-between md:table-cell mb-2 md:mb-0">
                    <span className="font-semibold md:hidden">Category</span>
                    {item.category}
                  </td>
                  <td className="flex justify-between md:table-cell mb-2 md:mb-0">
                    <span className="font-semibold md:hidden">Price</span>$
                    {item.price}
                  </td>
                  <td className="flex justify-between md:table-cell mb-2 md:mb-0">
                    <span className="font-semibold md:hidden">
                      Available Qty
                    </span>
                    {item.availableQuantity} pcs
                  </td>
                  <td className="flex justify-between md:table-cell mb-2 md:mb-0">
                    <span className="font-semibold md:hidden">Created At</span>
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                  <td className="flex justify-between md:table-cell">
                    <span className="font-semibold md:hidden">Actions</span>
                    <div className="flex gap-2">
                      <button className="btn btn-sm bg-primary text-white">
                        <FiEdit3 />
                      </button>
                      <button className="btn btn-sm bg-secondary text-white">
                        <ImBin />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellInfo;
