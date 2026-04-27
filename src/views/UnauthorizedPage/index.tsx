import { useNavigate } from "react-router-dom";
import { ShieldAlert } from "lucide-react";
import { AppButton } from "@/components/core/AppButton";
import { ROUTE_PATHS } from "@/constants/routes";

function UnauthorizedPage() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background p-4 text-center">
      <div className="mb-6 rounded-full bg-destructive/10 p-4 text-destructive">
        <ShieldAlert className="size-16" />
      </div>
      <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground">Access Restricted</h1>
      <p className="mb-8 max-w-md text-muted-foreground">
        You need to be logged in to access this page. Please log in to your account and try again.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <AppButton variant="outline" onClick={() => navigate(-1)} className="w-full sm:w-auto">
          Go Back
        </AppButton>
        <AppButton onClick={() => navigate(ROUTE_PATHS.LOGIN)} className="w-full sm:w-auto">
          Login to Account
        </AppButton>
      </div>
    </div>
  );
}

export default UnauthorizedPage;
