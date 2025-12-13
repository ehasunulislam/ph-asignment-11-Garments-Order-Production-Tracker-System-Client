import React from "react";
import Title from "../../../Components/Title/Title";
import useAxios from "../../../Components/Hooks/useAxios";
import useAuthInfo from "../../../Components/Hooks/useAuthInfo";
import { useQuery } from "@tanstack/react-query";
import DataLoading from "../../../Components/Loading/Data-loading/DataLoading";
import PageLoading from "../../../Components/Loading/PageLoading";
import { Link } from "react-router";

const CartInfo = () => {
  const axiosInstance = useAxios();
  const { user } = useAuthInfo();

  // tanstack query data..
  const { data: cartItems = [], isLoading, error } = useQuery({
    queryKey: ["cartItems", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosInstance.get(`/carts/${user.email}`);
      return res.data.data;
    },
  });

  // handle payment method
  const handlePayment = async (item) => {
    try {
      const res = await axiosInstance.post("/create-checkout-session", {
        cartId: item._id,
        productName: item.productName,
        totalPrice: item.totalPrice,
        userEmail: user?.email,
      });

      const checkoutUrl = res.data.url;

      // redirect safely inside useEffect
      window.setTimeout(() => {
        window.location.assign(checkoutUrl);
      }, 100);
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) {
    return <PageLoading />;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
     <div className="p-4">
      <Title text2={"Your Cart Info"} />

      {cartItems.length === 0 ? (
        <DataLoading />
      ) : (
        <>
          {/* ================= DESKTOP TABLE ================= */}
          <div className="hidden md:block overflow-x-auto mt-6">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product Name</th>
                  <th>Order Quantity</th>
                  <th>Total Price</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={item._id}>
                    <th>{index + 1}</th>
                    <td>{item.productName}</td>
                    <td>{item.orderedQty} pcs</td>
                    <td>${item.totalPrice}</td>
                    <td>
                      {new Date(item.createdAt).toLocaleString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td>
                      {item.paymentStatus === "paid" ? (
                        <button className="btn btn-sm bg-primary text-white">
                          Paid
                        </button>
                      ) : (
                        <button
                          className="btn btn-sm bg-secondary text-white"
                          onClick={() => handlePayment(item)}
                        >
                          Pay
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ================= MOBILE CARD VIEW ================= */}
          <div className="md:hidden space-y-4 mt-6">
            {cartItems.map((item, index) => (
              <div
                key={item._id}
                className="bg-white border rounded-xl shadow-sm p-4 space-y-2"
              >
                <div className="flex justify-between text-sm text-gray-500">
                  <span>#{index + 1}</span>
                  <span>
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="font-semibold text-lg">
                  {item.productName}
                </h3>

                <div className="flex justify-between text-sm">
                  <p>
                    <span className="text-gray-500">Qty:</span>{" "}
                    {item.orderedQty} pcs
                  </p>
                  <p>
                    <span className="text-gray-500">Price:</span>{" "}
                    ${item.totalPrice}
                  </p>
                </div>

                {item.paymentStatus === "paid" ? (
                  <button className="btn btn-sm w-full bg-primary text-white">
                    Paid
                  </button>
                ) : (
                  <button
                    className="btn btn-sm w-full bg-secondary text-white"
                    onClick={() => handlePayment(item)}
                  >
                    Pay Now
                  </button>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CartInfo;
