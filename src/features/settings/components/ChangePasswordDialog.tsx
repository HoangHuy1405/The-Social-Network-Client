import { useState } from "react";
import AppDialog from "@/components/core/AppDialog/AppDialog";
import { AppButton } from "@/components/core/AppButton";
import AppInput from "@/components/core/AppInput/AppInput";
import { useChangePasswordApi } from "../hooks/useChangePasswordApi";
import { Eye, EyeOff } from "lucide-react";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function ChangePasswordDialog({ open, onOpenChange }: Props) {
  const { form, mutation, onSubmit } = useChangePasswordApi();
  const {
    register,
    formState: { errors },
  } = form;
  const { isPending, isSuccess } = mutation;
  const [showPassword, setShowPassword] = useState(false);

  if (isSuccess && open) {
    onOpenChange(false);
    mutation.reset();
  }

  return (
    <AppDialog
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v);
        // Reset form when dialog closes
        if (!v) {
          form.reset();
          setShowPassword(false);
        }
      }}
      title="Change Password"
      width={400}
    >
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold border-b pb-2">Change Password</h2>
        <div className="flex flex-col gap-4 mt-2">
          <AppInput
            type={showPassword ? "text" : "password"}
            label="Current Password"
            {...register("currentPassword", { required: "Current password is required" })}
            error={errors.currentPassword?.message}
            fullWidth
            variant="filled"
          />
          <AppInput
            type={showPassword ? "text" : "password"}
            label="New Password"
            {...register("newPassword", { required: "New password is required" })}
            error={errors.newPassword?.message}
            fullWidth
            variant="filled"
          />
          <AppInput
            type={showPassword ? "text" : "password"}
            label="Confirm Password"
            {...register("confirmPassword", { required: "Please confirm your new password" })}
            error={errors.confirmPassword?.message}
            fullWidth
            variant="filled"
          />
          <div className="self-end">
            <AppButton variant="ghost" size="sm" type="button" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff className="size-4 mr-2" /> : <Eye className="size-4 mr-2" />}
              {showPassword ? "Hide" : "Show"}
            </AppButton>
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
          <AppButton variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </AppButton>
          <AppButton onClick={onSubmit} loading={isPending}>
            Save Password
          </AppButton>
        </div>
      </div>
    </AppDialog>
  );
}
