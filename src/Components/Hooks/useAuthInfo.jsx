import React, { use } from "react";
import { AuthContext } from "../../Context/AuthContext";

const useAuthInfo = () => {
  const authInfo = use(AuthContext);
  return authInfo;
};

export default useAuthInfo;
