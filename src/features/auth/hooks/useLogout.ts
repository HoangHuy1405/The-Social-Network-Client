import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { logoutApi } from "@/features/auth/api";
import { useAppDispatch, persistor } from "@/store";
import { logout } from "@/store/authSlice";
import { ROUTE_PATHS } from "@/constants/routes";
import { useLoading, LOADING_TYPE } from "@/hooks/useLoading";

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { show: showLoading, hide: hideLoading } = useLoading(LOADING_TYPE.TOPBAR);

  const { mutate: handleLogout } = useMutation({
    mutationFn: logoutApi,
    onMutate: () => showLoading(),
    onSuccess: async () => {
      dispatch(logout());
      await persistor.purge();
      hideLoading();
      void navigate(ROUTE_PATHS.HOME);
    },
    // Always clear local state even if API fails (token may already be expired)
    onError: async () => {
      dispatch(logout());
      await persistor.purge();
      hideLoading();
      void navigate(ROUTE_PATHS.HOME);
    },
  });

  return { handleLogout };
};
