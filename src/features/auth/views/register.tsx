import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { AppInput } from "@/components/common/AppInput";
import { AppButton } from "@/components/common/AppButton";
import { useRegister } from "@/features/auth/hooks/useRegister";
import { ROUTE_PATHS } from "@/constants/routes";

export const RegisterPage = () => {
  const { firstName, lastName, username, email, password, isLoading, isFormValid, handleSubmit } = useRegister();

  return (
    <div className="w-full max-w-md space-y-8 animate-in fade-in duration-300">
      {/* Heading */}
      <div className="space-y-2">
        <h2 className="text-foreground">Create an account</h2>
        <p className="text-muted-foreground text-sm">Join us and start your audio journey</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <AppInput
            label="First Name"
            placeholder="John"
            value={firstName.value}
            onChange={(e) => firstName.setValue(e.target.value)}
            variant="filled"
            size="lg"
            fullWidth
            validate={firstName.validate}
            validateOnTyping
          />
          <AppInput
            label="Last Name"
            placeholder="Doe"
            value={lastName.value}
            onChange={(e) => lastName.setValue(e.target.value)}
            variant="filled"
            size="lg"
            fullWidth
            validate={lastName.validate}
            validateOnTyping
          />
        </div>

        <AppInput
          label="Username"
          placeholder="johndoe"
          value={username.value}
          onChange={(e) => username.setValue(e.target.value)}
          variant="filled"
          size="lg"
          fullWidth
          validate={username.validate}
          validateOnTyping
        />

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

        <AppInput
          label="Password"
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

        <AppButton type="submit" loading={isLoading} disabled={!isFormValid} className="h-11 w-full rounded-lg text-base">
          Sign up
        </AppButton>
      </form>

      {/* Login link */}
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link to={ROUTE_PATHS.LOGIN} className="font-semibold text-foreground hover:underline">
          Sign in
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
