import { FC, InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/utils";

// Input Label Component
interface InputLabelProps {
  children: string;
  required?: boolean;
  className?: string;
}

export const InputLabel: FC<InputLabelProps> = ({
  children,
  required = false,
  className,
}) => {
  return (
    <div className={cn("flex items-start gap-[4px]", className)}>
      <p className="text-headings-heading-4 text-muted whitespace-nowrap">
        {children}
      </p>
      {required && (
        <p className="text-foreground-default w-[13px] text-[20px] leading-normal font-medium">
          *
        </p>
      )}
    </div>
  );
};

// Text Input Component
interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const TextInput: FC<TextInputProps> = ({ className, ...props }) => {
  return (
    <input
      className={cn(
        "text-body-medium text-muted border-sm border-grayscale-g2 px-lg py-md flex h-[46px] w-full items-start gap-[10px] rounded-md",
        "focus:border-foreground-default focus:outline-none",
        className,
      )}
      {...props}
    />
  );
};

// Text Area Component
interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

export const TextArea: FC<TextAreaProps> = ({ className, ...props }) => {
  return (
    <textarea
      className={cn(
        "text-body-medium text-muted border-sm border-grayscale-g2 px-lg flex min-h-[120px] w-full items-start gap-[10px] rounded-md py-[11px]",
        "focus:border-foreground-default resize-y focus:outline-none",
        className,
      )}
      {...props}
    />
  );
};

