import { createBrowserRouter } from "react-router-dom";
import { ROUTE_PATHS } from "@/constants/routes";
import App from "@/App";
import NotFoundPage from "@/views/NotFoundPage";
import { AuthLayout } from "@/features/auth/views/layout";
import { LoginPage } from "@/features/auth/views/login";
import { RegisterPage } from "@/features/auth/views/register";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: ROUTE_PATHS.HOME,
    element: <App />,
    children: [
      // Public Auth routes
      {
        element: <AuthLayout />,
        children: [
          {
            path: ROUTE_PATHS.LOGIN,
            element: <LoginPage />,
          },
          {
            path: ROUTE_PATHS.REGISTER,
            element: <RegisterPage />,
          },
        ],
      },
      // Protected routes
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/test",
            element: <NotFoundPage />,
          },
        ],
      },
      // 404
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
