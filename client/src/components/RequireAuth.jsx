import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hook/useAuth";

const role = {
  guest: "guest",
  admin: "admin",
  user: "user",
  salesperson: "salesperson",
};

const RequireAuth = ({ allowedRoles }) => {
  const auth = useAuth();
  const location = useLocation();

  if (allowedRoles === "" && auth?.user && auth?.user?.role !== "user") {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }
  if (allowedRoles === role.guest && auth?.user && auth?.user?.role) {
    return <Navigate to={-1} replace />;
  }
  if (
    allowedRoles !== role.guest &&
    allowedRoles !== "" &&
    (!auth?.user || !auth?.user?.role)
  ) {
    return allowedRoles === role.user ? (
      <Navigate to={`/login`} state={{ from: location }} replace />
    ) : (
      <Navigate
        to={`/${allowedRoles}-login`}
        state={{ from: location }}
        replace
      />
    );
  }
  if (
    allowedRoles !== role.guest &&
    allowedRoles !== "" &&
    allowedRoles !== auth.user.role
  ) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default RequireAuth;
