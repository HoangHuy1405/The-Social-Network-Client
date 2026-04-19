import { createBrowserRouter, Navigate } from "react-router-dom";
import { ROUTE_PATHS } from "@/constants/routes";
import App from "@/App";
import NotFoundPage from "@/views/NotFoundPage";
import { AuthLayout } from "@/features/auth/views/layout";
import { LoginPage } from "@/features/auth/views/login";
import { RegisterPage } from "@/features/auth/views/register";
import { FeedPage } from "@/features/feed/views/FeedPage";
import { MainLayout } from "@/views/MainLayout";
import { ProfileLayout } from "@/views/ProfileLayout";
import { ProfilePage } from "@/features/profile/views/ProfilePage";
import { SettingsLayout } from "@/features/settings/views";
import { AccountTab } from "@/features/settings/views/AccountTab";
import { ProfileTab } from "@/features/settings/views/ProfileTab";
import { PrivacyTab } from "@/features/settings/views/PrivacyTab";
import { PreferencesTab } from "@/features/settings/views/PreferencesTab";
import { NotificationsTab } from "@/features/settings/views/NotificationsTab";

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
      // Authenticated routes with MainLayout (header + sidebar)
      {
        element: <MainLayout />,
        children: [
          {
            path: ROUTE_PATHS.HOME,
            element: <FeedPage />,
          },
          {
            path: "/settings",
            element: <SettingsLayout />,
            handle: { requiresAuth: true },
            children: [
              { index: true, element: <Navigate to="account" replace /> },
              { path: "account", element: <AccountTab /> },
              { path: "profile", element: <ProfileTab /> },
              { path: "privacy", element: <PrivacyTab /> },
              { path: "preferences", element: <PreferencesTab /> },
              { path: "notifications", element: <NotificationsTab /> },
            ],
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
