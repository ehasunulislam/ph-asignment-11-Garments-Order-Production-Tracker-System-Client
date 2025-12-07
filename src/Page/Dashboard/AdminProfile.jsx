import React from "react";
import useAuthInfo from "../../Components/Hooks/useAuthInfo";

const AdminProfile = () => {
  const { user } = useAuthInfo();

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
          <div className="card-actions">
            <button className="btn btn-primary">Edit Profile</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
