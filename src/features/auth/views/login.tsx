import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { AppInput } from "@/components/core/AppInput";
import { AppButton } from "@/components/core/AppButton";
import { useLogin } from "@/features/auth/hooks/useLogin";
import { ROUTE_PATHS } from "@/constants/routes";

export const LoginPage = () => {
  const { email, password, isLoading, isFormValid, handleSubmit } = useLogin();

  return (
    <div className="w-full max-w-md space-y-8 animate-in fade-in duration-300">
      {/* Heading */}
      <div className="space-y-2">
        <h2 className="text-foreground">Welcome back</h2>
        <p className="text-muted-foreground text-sm">Sign in to continue your audio journey</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <AppInput
          label="Email"
          type="email"
          placeholder="yourname@example.com"
          value={email.value}
          onChange={(e) => email.setValue(e.target.value)}
          variant="filled"
          size="lg"
          fullWidth
          validate={email.validate}
          validateOnTyping
        />

        <div className="space-y-1">
          <div className="flex items-center justify-between" tabIndex={-1}>
            <label className="text-sm font-semibold text-foreground">Password</label>
            <Link to="#" className="text-sm font-semibold text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
          <AppInput
            type="password"
            placeholder="••••••••"
            value={password.value}
            onChange={(e) => password.setValue(e.target.value)}
            variant="filled"
            size="lg"
            fullWidth
            validate={password.validate}
            validateOnTyping
          />
        </div>

        <AppButton type="submit" loading={isLoading} disabled={!isFormValid} className="h-11 w-full rounded-lg text-base">
          Sign in
        </AppButton>
      </form>

      {/* Register link */}
      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link to={ROUTE_PATHS.REGISTER} className="font-semibold text-foreground hover:underline">
          Sign up
        </Link>
      </p>

      {/* Divider */}
      <div className="flex items-center gap-4">
        <span className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">Or continue with</span>
        <span className="h-px flex-1 bg-border" />
      </div>

      {/* OAuth buttons */}
      <div className="grid grid-cols-2 gap-4">
        <AppButton
          type="button"
          variant="outline"
          size="lg"
          className="h-11 border-border/50 hover:bg-muted/50"
          leadingIcon={<FcGoogle size={20} />}
        >
          Google
        </AppButton>
        <AppButton
          type="button"
          variant="outline"
          size="lg"
          className="h-11 border-border/50 hover:bg-muted/50"
          leadingIcon={<FaGithub size={20} />}
        >
          GitHub
        </AppButton>
      </div>
    </div>
  );
};
