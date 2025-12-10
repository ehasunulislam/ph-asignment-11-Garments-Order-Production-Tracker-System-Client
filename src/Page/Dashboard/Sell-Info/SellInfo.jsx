import React, { useRef, useState } from "react";
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
  const updateFormRef = useRef();
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Tanstack Query
  const { data: products = [], isLoading, refetch } = useQuery({
    queryKey: ["my-products", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosInstance.get(`/selling-products/${user?.email}`);
      return res.data;
    },
  });

  // Delete product
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

  // Open update modal
  const handleEditClick = (product) => {
    setSelectedProduct(product);
    const modal = document.getElementById("my_modal_5");
    modal.showModal();
  };

  // Loading
  if (isLoading) return <PageLoading />;

  return (
    <div>
      <Title text2={"Sell Information"} />

      {/* Table */}
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
                    <span className="font-semibold md:hidden">Product Name</span>
                    {item.productName}
                  </td>
                  <td className="flex justify-between md:table-cell mb-2 md:mb-0">
                    <span className="font-semibold md:hidden">Category</span>
                    {item.category}
                  </td>
                  <td className="flex justify-between md:table-cell mb-2 md:mb-0">
                    <span className="font-semibold md:hidden">Price</span>${item.price}
                  </td>
                  <td className="flex justify-between md:table-cell mb-2 md:mb-0">
                    <span className="font-semibold md:hidden">Available Qty</span>
                    {item.availableQuantity} pcs
                  </td>
                  <td className="flex justify-between md:table-cell mb-2 md:mb-0">
                    <span className="font-semibold md:hidden">Created At</span>
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                  <td className="flex justify-between md:table-cell">
                    <span className="font-semibold md:hidden">Actions</span>
                    <div className="flex gap-2">
                      <button
                        className="btn btn-sm bg-primary text-white"
                        onClick={() => handleEditClick(item)}
                      >
                        <FiEdit3 />
                      </button>
                      <button
                        className="btn btn-sm bg-secondary text-white"
                        onClick={() => handleDelete(item._id)}
                      >
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

      {/* Update Product Modal */}
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <form
          ref={updateFormRef}
          className="modal-box flex flex-col gap-3"
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              const formData = new FormData(updateFormRef.current);
              const updatedProduct = {
                productName: formData.get("productName"),
                description: formData.get("description"),
                availableQuantity: Number(formData.get("availableQuantity")),
                minimumOrderQuantity: Number(formData.get("minimumOrderQuantity")),
                demoVideo: formData.get("demoVideo"),
              };

              const res = await axiosInstance.put(`/update-product/${selectedProduct._id}`, updatedProduct);

              if (res.data.success) {
                Swal.fire("Updated!", "Product has been updated.", "success");
                refetch();
                document.getElementById("my_modal_5").close();
              } else {
                Swal.fire("Error", res.data.message, "error");
              }
            } catch (err) {
              Swal.fire("Error", err.message, "error");
            }
          }}
        >
          <h3 className="font-bold text-lg">Update Your Product Details</h3>

          {/* Product Name */}
          <label htmlFor="" className="text-[0.9rem] text-primary">Product Name</label>
          <input
            type="text"
            name="productName"
            defaultValue={selectedProduct?.productName || ""}
            placeholder="product Name"
            className="input input-bordered w-full outline-0"
            required
          />

          <label htmlFor="" className="text-[0.9rem] text-primary pt-1">Description</label>
          <textarea
            name="description"
            defaultValue={selectedProduct?.description || ""}
            placeholder="Description"
            className="textarea textarea-bordered w-full outline-0"
            required
          />

          <label htmlFor="" className="text-[0.9rem] text-primary pt-1">Available Quantity</label>
          <input
            type="number"
            name="availableQuantity"
            defaultValue={selectedProduct?.availableQuantity }
            placeholder="Available Quantity"
            className="input input-bordered w-full outline-0"
            required
          />
         
          <label htmlFor="" className="text-[0.9rem] text-primary pt-1">Minimum OrderQuantity</label>
          <input
            type="number"
            name="minimumOrderQuantity"
            defaultValue={selectedProduct?.minimumOrderQuantity}
            placeholder="Minimum Order Quantity"
            className="input input-bordered w-full outline-0"
            required
          />
          
          <label htmlFor="" className="text-[0.9rem] text-primary pt-1">DemoVideo Link (optional)</label>
          <input
            type="text"
            name="demoVideo"
            defaultValue={selectedProduct?.demoVideo || ""}
            placeholder="Demo Video URL"
            className="input input-bordered w-full outline-0"
          />

          <div className="modal-action">
            <button type="submit" className="btn btn-primary">
              Update
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => document.getElementById("my_modal_5").close()}
            >
              Close
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default SellInfo;
