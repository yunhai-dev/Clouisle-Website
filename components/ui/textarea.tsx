import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const textareaVariants = cva(
  "flex w-full rounded-md border bg-zinc-900/60 text-zinc-100 placeholder:text-zinc-500 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400/60 disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-red-400/70 aria-[invalid=true]:focus-visible:ring-red-400/40",
  {
    variants: {
      size: {
        sm: "min-h-20 px-3 py-2 text-xs",
        md: "min-h-32 px-3 py-2 text-sm",
        lg: "min-h-40 px-4 py-3 text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          textareaVariants({ size }),
          "resize-y border-zinc-700/50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea, textareaVariants };
