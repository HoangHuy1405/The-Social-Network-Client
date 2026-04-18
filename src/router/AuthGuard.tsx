import type { ReactNode } from "react";
import { Navigate, useLocation, useMatches } from "react-router-dom";
import { useAppSelector } from "@/store";
import { ROUTE_PATHS } from "@/constants/routes";

interface AuthGuardProps {
  children: ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const matches = useMatches();
  const location = useLocation();
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  // Checks if any matched route (layout or page) has handle: { requiresAuth: true }
  const requiresAuth = matches.some((match) => {
    const handle = match.handle as { requiresAuth?: boolean } | undefined;
    return handle?.requiresAuth;
  });

  if (requiresAuth && !accessToken) {
    return <Navigate to={ROUTE_PATHS.LOGIN} state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
