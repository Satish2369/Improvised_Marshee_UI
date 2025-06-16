"use client";

import { useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.user);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login?redirect=" + pathname);
    }
  }, [isAuthenticated, loading]);

  if (loading) return <div></div>; 

  if (!isAuthenticated) return null;

  return children;
};

export default ProtectedRoute;
