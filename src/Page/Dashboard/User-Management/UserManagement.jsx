import React from "react";
import Title from "../../../Components/Title/Title";
import useAxios from "../../../Components/Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import PageLoading from "../../../Components/Loading/PageLoading";
import DataLoading from "../../../Components/Loading/Data-loading/DataLoading";
import Swal from "sweetalert2";

const UserManagement = () => {
  const axiosInstance = useAxios();

  const { data: users = [], isLoading, refetch, } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await axiosInstance.get("/all-user");
      return res.data;
    },
  });

  // handle Approve user
  const handleApproveUser = async (id) => {
    try{
      const res = await axiosInstance.put(`/approve-user/${id}`);
      if (res.data.success) {
        Swal.fire("Approved!", "User has been approved.", "success");
        refetch();
      }
    }
    catch(err) {
        Swal.fire("Error", "Failed to approve user", err.message);
    }
  }


   //  handle Delete user
   const handleDeleteUser = async (id) => {
    try{
        const deleteConfirmation = await Swal.fire({
        title: "Are you sure?",
        text: "This action cannot be undone!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if(deleteConfirmation.isConfirmed) {
        const res = await axiosInstance.delete(`/delete-user/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire("Deleted!", "User has been deleted.", "success");
          refetch();
        }
      }
    }
    catch(err) {
        Swal.fire("Error", "Failed to delete user", err.message)
    }
   }


   if (isLoading) return <PageLoading />;

  return (
    <div>
      <Title text2={"User Management"} />

      {/* table */}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  <DataLoading />
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={user._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={
                            user.photoURL || "https://img.daisyui.com/images/profile/demo/2@94.webp"
                          }
                          alt={user.name}
                        />
                      </div>
                    </div>
                  </td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td className={user.status === "Approved" ? "text-green-500" : "text-red-500"}>
                    {user.status || "Pending"}
                   </td>

                  <td className="flex gap-2">
                    <button
                      className="btn btn-sm bg-primary text-white font-normal"
                      onClick={() => handleApproveUser(user._id)}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-sm bg-secondary text-white font-normal"
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      Delete
                    </button>
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

export default UserManagement;
