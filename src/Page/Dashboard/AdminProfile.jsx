import React from "react";
import useAuthInfo from "../../Components/Hooks/useAuthInfo";
import useAxios from "../../Components/Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import PageLoading from "../../Components/Loading/PageLoading";
import Swal from "sweetalert2";

const AdminProfile = () => {
  const { user, signOutFunction } = useAuthInfo();
  const axiosInstance = useAxios();

  const { data: userData = {}, isLoading, error } = useQuery({
    queryKey: ["userData", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosInstance.get(`/users/${user.email}`);
      return res.data;
    },
  });


  // handle signout functionality 
  const handleSignOut = () => {
    signOutFunction()
      .then(() => {
        Swal.fire({
          title: "Drag me!",
          icon: "success",
          draggable: true,
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: error.message,
          text: "Something went wrong!",
          footer: '<a href="#">Why do I have this issue?</a>',
        });
      });
  };
  


  if(isLoading) {
    return <PageLoading />
  }

  if(error) {
    return <p>Have some error</p>
  }

  return (
    <div className="flex justify-center items-center">
      <div className="card bg-base-100 w-96 shadow-sm">
        <figure className="px-10 pt-10">
          <img
            src={user.photoURL}
            alt={user.displayName}
            className="rounded-full w-33 h-35"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{user.displayName}</h2>
          <p>Role: {userData?.role || ""}</p>
          <div className="card-actions">
            <button className="btn btn-primary" onClick={handleSignOut}>Log out</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
