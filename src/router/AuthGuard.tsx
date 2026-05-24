import { useEffect, type ReactNode } from "react";
import { Navigate, useLocation, useMatches } from "react-router-dom";
import { useAppSelector } from "@/store";
import { ROUTE_PATHS } from "@/constants/routes";
import { showErrorMessage } from "@/hooks/useMessage";

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

  const isUnauthorized = requiresAuth && !accessToken;

  useEffect(() => {
    let ignore = false;

    if (isUnauthorized) {
      setTimeout(() => {
        if (!ignore) {
          showErrorMessage("403 Forbidden. Please login to access this page.");
        }
      }, 0);
    }

    return () => {
      ignore = true;
    };
  }, [isUnauthorized]);

  if (isUnauthorized) {
    return <Navigate to={ROUTE_PATHS.UNAUTHORIZED} state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
