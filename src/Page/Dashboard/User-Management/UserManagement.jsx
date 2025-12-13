import React, { useEffect, useState } from "react";
import Title from "../../../Components/Title/Title";
import useAxios from "../../../Components/Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import PageLoading from "../../../Components/Loading/PageLoading";
import DataLoading from "../../../Components/Loading/Data-loading/DataLoading";
import Swal from "sweetalert2";
import { GiCheckMark } from "react-icons/gi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { GoSearch } from "react-icons/go";

const UserManagement = () => {
  const axiosInstance = useAxios();
  const [search, setSearch] = useState("");

  const { data: users = [], isLoading, refetch } = useQuery({
    queryKey: ["all-users", search],
    queryFn: async () => {
      const res = await axiosInstance.get(`/all-user?search=${search}`);
      return res.data;
    },
  });

  // useEffect for time in search-box
  useEffect(() => {
    const delay = setTimeout(() => {
      refetch();
    }, 500);

    return () => clearTimeout(delay);
  }, [search, refetch]);

  // handle Approve user
  const handleApproveUser = async (id) => {
    try {
      const res = await axiosInstance.put(`/approve-user/${id}`);
      if (res.data.success) {
        Swal.fire("Approved!", "User has been approved.", "success");
        refetch();
      }
    } catch (err) {
      Swal.fire("Error", "Failed to approve user", err.message);
    }
  };

  //  handle Delete user
  const handleDeleteUser = async (id) => {
    try {
      const deleteConfirmation = await Swal.fire({
        title: "Are you sure?",
        text: "This action cannot be undone!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (deleteConfirmation.isConfirmed) {
        const res = await axiosInstance.delete(`/delete-user/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire("Deleted!", "User has been deleted.", "success");
          refetch();
        }
      }
    } catch (err) {
      Swal.fire("Error", "Failed to delete user", err.message);
    }
  };

  if (isLoading) return <PageLoading />;

  return (
    <div>
      <Title text2={"User Management"} />

      {/* search box */}
      <div className="flex justify-end">
        <label className="input outline-0 w-[210px]">
          <GoSearch />
          <input
            type="search"
            required
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
      </div>

      {/* table */}
      <div className="overflow-x-auto mt-4">
        <table className="table w-full">
          {/* Table Head hide on mobile */}
          <thead className="hidden md:table-header-group">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  <DataLoading />
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr
                  key={user._id}
                  className="
              flex flex-col md:table-row 
              mb-4 md:mb-0 
              border md:border-0 
              rounded-lg md:rounded-none 
              p-4 md:p-0 
              bg-white md:bg-transparent 
              shadow md:shadow-none
            "
                >
                  {/* Index */}
                  <td className="flex justify-between md:table-cell mb-2 md:mb-0">
                    <span className="font-semibold md:hidden">#</span>
                    {index + 1}
                  </td>

                  {/* Image */}
                  <td className="flex justify-between items-center md:table-cell mb-2 md:mb-0">
                    <span className="font-semibold md:hidden">Image</span>
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={
                            user.photoURL ||
                            "https://img.daisyui.com/images/profile/demo/2@94.webp"
                          }
                          alt={user.name}
                        />
                      </div>
                    </div>
                  </td>

                  {/* Name */}
                  <td className="flex justify-between md:table-cell mb-2 md:mb-0">
                    <span className="font-semibold md:hidden">Name</span>
                    {user.name}
                  </td>

                  {/* Email */}
                  <td className="flex justify-between md:table-cell mb-2 md:mb-0">
                    <span className="font-semibold md:hidden">Email</span>
                    {user.email}
                  </td>

                  {/* Role */}
                  <td className="flex justify-between md:table-cell mb-2 md:mb-0">
                    <span className="font-semibold md:hidden">Role</span>

                    <span
                      className={`badge ${
                        user.role === "admin"
                          ? "badge-success badge badge-soft"
                          : user.role === "user"
                          ? "badge-secondary badge badge-soft"
                          : user.role === "buyer"
                          ? "badge-info badge badge-soft"
                          : user.role === "manager"
                          ? "badge-primary badge badge-soft"
                          : "badge-neutral"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  {/* Status */}
                  <td
                    className={`flex justify-between md:table-cell mb-2 md:mb-0 ${
                      user.status === "Approved"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    <span className="font-semibold md:hidden">Status</span>
                    {user.status || "Pending"}
                  </td>

                  {/* Actions */}
                  <td className="flex justify-between md:table-cell">
                    <span className="font-semibold md:hidden">Actions</span>

                    <div className="flex gap-2">
                      <button
                        className="btn btn-sm bg-primary text-white font-normal"
                        onClick={() => handleApproveUser(user._id)}
                      >
                        <GiCheckMark />
                      </button>

                      <button
                        className="btn btn-sm bg-secondary text-white font-normal"
                        onClick={() => handleDeleteUser(user._id)}
                      >
                        <RiDeleteBin5Fill />
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

export default UserManagement;
