import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { logoutApi } from "@/features/auth/api";
import { useAppDispatch, persistor } from "@/store";
import { logout } from "@/store/authSlice";
import { ROUTE_PATHS } from "@/constants/routes";

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { mutate: handleLogout } = useMutation({
    mutationFn: logoutApi,
    onSuccess: async () => {
      dispatch(logout());
      await persistor.purge();
      void navigate(ROUTE_PATHS.LOGIN);
    },
    // Always clear local state even if API fails (token may already be expired)
    onError: async () => {
      dispatch(logout());
      await persistor.purge();
      void navigate(ROUTE_PATHS.LOGIN);
    },
  });

  return { handleLogout };
};
