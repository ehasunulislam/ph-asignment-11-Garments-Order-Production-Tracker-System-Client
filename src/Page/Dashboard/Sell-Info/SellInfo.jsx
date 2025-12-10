import React from "react";
import Title from "../../../Components/Title/Title";
import { FiEdit3 } from "react-icons/fi";
import { ImBin } from "react-icons/im";
import useAuthInfo from "../../../Components/Hooks/useAuthInfo";
import useAxios from "../../../Components/Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import PageLoading from "../../../Components/Loading/PageLoading";
import DataLoading from "../../../Components/Loading/Data-loading/DataLoading";
import Swal from "sweetalert2";

const SellInfo = () => {
  const { user } = useAuthInfo();
  const axiosInstance = useAxios();

  // tanstack query
  const { data: products = [], isLoading, refetch, } = useQuery({
    queryKey: ["my-products", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosInstance.get(`/selling-products/${user?.email}`);
      return res.data;
    },
  });

  //   handle Delete for single product
  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const res = await axiosInstance.delete(`/delete-product/${id}`);

        if (res.data.deletedCount > 0) {
          Swal.fire("Deleted!", "Your product has been deleted.", "success");
          
          refetch(); 
        }
      }
    } catch (err) {
      Swal.fire("Error", "Failed to delete the product", err.message);
    }
  };

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

                      <button className="btn btn-sm bg-secondary text-white" onClick={() => handleDelete(item._id)}>
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
