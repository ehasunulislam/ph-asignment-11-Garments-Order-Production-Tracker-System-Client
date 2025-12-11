import React, { useRef, useState } from "react";
import Title from "../../../Components/Title/Title";
import useAxios from "../../../Components/Hooks/useAxios";
import PageLoading from "../../../Components/Loading/PageLoading";
import { useQuery } from "@tanstack/react-query";
import DataLoading from "../../../Components/Loading/Data-loading/DataLoading";
import { PiUserSwitchBold } from "react-icons/pi";
import { TbLockOpen2 } from "react-icons/tb";
import { IoLockClosedOutline } from "react-icons/io5";
import Swal from "sweetalert2";

const UserRole = () => {
  const axiosInstance = useAxios();
  const changeUserRole = useRef();

  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState("user");

  const { data: users = [], isLoading, refetch } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await axiosInstance.get("/all-user");
      return res.data;
    },
  });

  // OPEN MODAL FUNCTION
  const openRoleModal = (user) => {
    setSelectedUser(user);
    setSelectedRole(user.role);
    changeUserRole.current.showModal();
  };

  // handle change role functionality
  const handleChangeRole = async () => {
    try {
      const res = await axiosInstance.put(`/change-role/${selectedUser._id}`, {role: selectedRole});

      if (res.data.success) {
        Swal.fire({
          title: "User's Role Changed Successfully",
          icon: "success",
        });
        changeUserRole.current.close();
        refetch();
      }
    } catch (err) {
      console.log(err);
    }
  };


  // ROLE BADGE CLASS FUNCTION
  const getRoleBadge = (role) => {
    let color = "badge-secondary"; 

    if (role === "admin") color = "badge-success";
    if (role === "buyer") color = "badge-primary";
    if (role === "manager") color = "badge-accent";

    return `badge badge-soft ${color}`;
  };

  if (isLoading) {
    return <PageLoading />
  }

  return (
    <div>
      <Title text2={"User Role Manage"} />

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <DataLoading />
            ) : (
              users.map((item, index) => (
                <tr key={item._id}>
                  <th>{index + 1}</th>

                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={item.photoURL} alt={item.name} />
                      </div>
                    </div>
                  </td>

                  <td>{item.name}</td>

                  <td>
                    <span className={getRoleBadge(item.role)}>
                      {item.role}
                    </span>
                  </td>

                  <td className="flex gap-2">
                    <button
                      className="btn btn-sm bg-primary text-white"
                      onClick={() => openRoleModal(item)}
                    >
                      <PiUserSwitchBold />
                    </button>

                    <button className="btn btn-sm bg-green-400 text-white">
                      <TbLockOpen2 />
                    </button>

                    <button className="btn btn-sm bg-secondary text-white">
                      <IoLockClosedOutline />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile View (Cards) */}
      <div className="md:hidden space-y-4">
        {users.map((item) => (
          <div
            key={item._id}
            className="p-4 border border-gray-300 shadow rounded-lg shadow-sm bg-base-200 flex flex-col gap-3"
          >
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="mask mask-squircle w-14 h-14">
                  <img src={item.photoURL} alt={item.name} />
                </div>
              </div>

              <div>
                <h3 className="font-bold">{item.name}</h3>
                <span className={getRoleBadge(item.role)}>
                  {item.role}
                </span>
              </div>
            </div>

            <div className="flex gap-2 mt-2">
              <button
                className="btn btn-sm bg-primary text-white flex-1"
                onClick={() => openRoleModal(item)}
              >
                <PiUserSwitchBold />
              </button>

              <button className="btn btn-sm bg-green-400 text-white flex-1">
                <TbLockOpen2 />
              </button>

              <button className="btn btn-sm bg-secondary text-white flex-1">
                <IoLockClosedOutline />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* change user role modal */}
      <dialog ref={changeUserRole} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-3">
            Change Role for: {selectedUser?.name}
          </h3>

          <div className="space-y-3">
            {["admin", "buyer", "manager", "user"].map((role) => (
              <label key={role} className="flex items-center gap-3">
                <input
                  type="radio"
                  name="role"
                  className="radio radio-primary"
                  checked={selectedRole === role}
                  onChange={() => setSelectedRole(role)}
                />
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </label>
            ))}
          </div>

          <div className="modal-action">
            <button className="btn btn-primary" onClick={handleChangeRole}>
              Save Changes
            </button>

            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default UserRole;
