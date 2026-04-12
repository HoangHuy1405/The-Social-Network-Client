import { useNavigate } from "react-router-dom";
import AppButton from "@/components/common/AppButton/AppButton";
import { ROUTE_PATHS } from "@/constants/routes";
import { Home } from "lucide-react";

/**
 * NotFoundPage component
 * Displayed when a user navigates to a non-existent route.
 */
const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[100vh] bg-background text-foreground p-4">
      {/* 404 Heading with Gradient */}
      <h1 className="text-9xl font-black mb-4 select-none bg-gradient-to-t from-primary/60 to-primary bg-clip-text text-transparent">
        404
      </h1>

      {/* Message */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Oops! Page not found</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
      </div>

      {/* Navigation Button */}
      <AppButton
        variant="default"
        size="lg"
        leadingIcon={<Home className="w-5 h-5" />}
        onClick={() => navigate(ROUTE_PATHS.HOME)}
      >
        Go back home
      </AppButton>
    </div>
  );
};

export default NotFoundPage;
