import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/store";
import { ROUTE_PATHS } from "@/constants/routes";

const ProtectedRoute = () => {
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  if (!accessToken) {
    return <Navigate to={ROUTE_PATHS.LOGIN} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
