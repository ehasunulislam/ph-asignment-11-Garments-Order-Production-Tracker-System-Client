import React from "react";
import useAuthInfo from "./useAuthInfo";
import useAxios from "./useAxios";
import { useQuery } from "@tanstack/react-query";

const useRole = () => {
  const { user } = useAuthInfo();
  const axiosSecure = useAxios();

  const { data: role = "user" , isLoading: roleLoading, } = useQuery({
    queryKey: ["user-role", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}/role`);
      return res.data?.role || "user";
    },
  });

  return { role, roleLoading };
};

export default useRole;
