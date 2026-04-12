import { createBrowserRouter } from "react-router-dom";
import { ROUTE_PATHS } from "@/constants/routes";
import App from "@/App";
import NotFoundPage from "@/views/NotFoundPage";
import { LoginPage } from "@/features/auth/views/login";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: ROUTE_PATHS.HOME,
    element: <App />,
    children: [
      // Public routes
      {
        path: ROUTE_PATHS.LOGIN,
        element: <LoginPage />,
      },
      // Protected routes
      {
        element: <ProtectedRoute />,
        children: [],
      },
      // 404
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
