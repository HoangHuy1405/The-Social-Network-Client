import { createBrowserRouter } from "react-router-dom";
import { ROUTE_PATHS } from "@/constants/routes";
import App from "@/App";
import NotFoundPage from "@/views/NotFoundPage";
import { AuthLayout } from "@/features/auth/views/layout";
import { LoginPage } from "@/features/auth/views/login";
import { RegisterPage } from "@/features/auth/views/register";
import ProtectedRoute from "./ProtectedRoute";
import { FeedPage } from "@/features/feed/views/FeedPage";
import { MainLayout } from "@/views/MainLayout";
import { ProfileLayout } from "@/views/ProfileLayout";
import { ProfilePage } from "@/features/profile/views/ProfilePage";

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
      // Public + authenticated routes with MainLayout (header + sidebar)
      {
        element: <MainLayout />,
        children: [
          {
            path: ROUTE_PATHS.HOME,
            element: <FeedPage />,
          },
        ],
      },
      // Profile page (header only, no sidebar)
      {
        element: <ProfileLayout />,
        children: [
          {
            path: ROUTE_PATHS.PROFILE,
            element: <ProfilePage />,
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
