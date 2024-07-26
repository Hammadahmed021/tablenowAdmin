import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function AuthLayout({ children, authentication = false}) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (authentication && authStatus) {
      // Redirect to dashboard if user is already authenticated and trying to access login
      navigate("/dashboard", { replace: true });
    } else if (!authentication && !authStatus) {
      // Redirect to login if user is not authenticated and trying to access protected routes
      navigate("/login", { replace: true });
    }
    setLoader(false);
  }, [authentication, authStatus, navigate]);

  return loader ? <h2 className="text-center ">Loading...</h2> : <>{children}</>;
}
