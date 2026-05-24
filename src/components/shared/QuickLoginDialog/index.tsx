import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { AppInput } from "@/components/core/AppInput";
import { AppButton } from "@/components/core/AppButton";
import { AppDialog } from "@/components/core/AppDialog";
import { useLogin } from "@/features/auth/hooks/useLogin";
import { ROUTE_PATHS } from "@/constants/routes";

type QuickLoginDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
};

function QuickLoginDialog({ open, onOpenChange, onSuccess }: QuickLoginDialogProps) {
  const { email, password, isLoading, isFormValid, handleSubmit } = useLogin({
    onSuccess: () => {
      onOpenChange(false);
      onSuccess?.();
    },
  });

  return (
    <AppDialog open={open} onOpenChange={onOpenChange} width={440}>
      <div className="w-full space-y-6 p-2 animate-in fade-in duration-300">
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-foreground">Welcome back</h3>
          <p className="text-muted-foreground text-xs">Sign in to continue your audio journey</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <AppInput
            label="Email"
            type="email"
            placeholder="yourname@example.com"
            value={email.value}
            onChange={(e) => email.setValue(e.target.value)}
            variant="filled"
            size="default"
            fullWidth
            validate={email.validate}
            validateOnTyping
          />

          <div className="space-y-1">
            <div className="flex items-center justify-between" tabIndex={-1}>
              <label className="text-xs font-semibold text-foreground">Password</label>
              <Link to="#" className="text-xs font-semibold text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
            <AppInput
              type="password"
              placeholder="••••••••"
              value={password.value}
              onChange={(e) => password.setValue(e.target.value)}
              variant="filled"
              size="default"
              fullWidth
              validate={password.validate}
              validateOnTyping
            />
          </div>

          <AppButton type="submit" loading={isLoading} disabled={!isFormValid} className="h-10 w-full rounded-lg text-sm">
            Sign in
          </AppButton>
        </form>

        <p className="text-center text-xs text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            to={ROUTE_PATHS.REGISTER}
            onClick={() => onOpenChange(false)}
            className="font-semibold text-foreground hover:underline"
          >
            Sign up
          </Link>
        </p>

        <div className="flex items-center gap-3">
          <span className="h-px flex-1 bg-border" />
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Or continue with</span>
          <span className="h-px flex-1 bg-border" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <AppButton
            type="button"
            variant="outline"
            size="default"
            className="h-10 border-border/50 hover:bg-muted/50 text-xs"
            leadingIcon={<FcGoogle size={18} />}
          >
            Google
          </AppButton>
          <AppButton
            type="button"
            variant="outline"
            size="default"
            className="h-10 border-border/50 hover:bg-muted/50 text-xs"
            leadingIcon={<FaGithub size={18} />}
          >
            GitHub
          </AppButton>
        </div>
      </div>
    </AppDialog>
  );
}

export default QuickLoginDialog;
export { QuickLoginDialog };
export type { QuickLoginDialogProps };
