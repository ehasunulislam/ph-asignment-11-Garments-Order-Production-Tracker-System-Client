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
    <div>
      <section>
        <Title text2={"Your Cart Info"} />
      </section>
      {cartItems.length === 0 ? (
        <div>
          <DataLoading />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
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
              {cartItems.map((item, index) => {
                return (
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
                    <th>
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
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CartInfo;
