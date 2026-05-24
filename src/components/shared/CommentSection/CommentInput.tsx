import { useForm } from "react-hook-form";
import { Send } from "lucide-react";
import { AppButton } from "@/components/core/AppButton";
import { AppAvatar } from "@/components/core/AppAvatar";
import { AppInput } from "@/components/core/AppInput";
import { useCreateCommentApi } from "@/features/comment/hooks/useCreateCommentApi";

type CommentInputProps = {
  postId: string;
  parentId?: string | null;
  placeholder?: string;
  onSuccess?: () => void;
};

type CommentFormValues = {
  content: string;
};

function CommentInput({ postId, parentId = null, placeholder = "Write a comment...", onSuccess }: CommentInputProps) {
  const { mutate, isPending } = useCreateCommentApi();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<CommentFormValues>({
    defaultValues: { content: "" },
  });

  const onSubmit = (values: CommentFormValues) => {
    mutate(
      { postId, payload: { content: values.content, parentId } },
      {
        onSuccess: () => {
          reset();
          onSuccess?.();
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex items-start gap-3">
      <AppAvatar useAuthAvatar size="sm" />
      <div className="flex-1 flex items-center gap-2 min-w-0">
        <AppInput
          fullWidth
          size="sm"
          placeholder={placeholder}
          error={errors.content?.message}
          {...register("content", { required: "Comment cannot be empty." })}
        />
        <AppButton
          type="submit"
          size="icon-sm"
          variant="default"
          loading={isPending}
          aria-label="Submit comment"
        >
          <Send className="size-4" />
        </AppButton>
      </div>
    </form>
  );
}

export default CommentInput;
