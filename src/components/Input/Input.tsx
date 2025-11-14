import {
  FC,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  useState,
  KeyboardEvent,
} from "react";
import { cn } from "@/utils";
import { Tag } from "@/components/Tag/Tag";

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
    <div className={cn("flex items-start gap-4", className)}>
      <p className="text-headings-heading-4 whitespace-nowrap text-black">
        {children}
      </p>
      {required && (
        <p className="text-foreground-default text-20 w-13 leading-normal font-medium">
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
        "text-body-medium text-text-muted border-sm border-grayscale-g2 px-lg py-md flex h-46 w-full items-start gap-10 rounded-md",
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
        "text-body-medium text-text-muted border-sm border-grayscale-g2 px-lg flex min-h-120 w-full items-start gap-10 rounded-md py-11",
        "focus:border-foreground-default resize-y focus:outline-none",
        className,
      )}
      {...props}
    />
  );
};

interface TagsInputProps {
  className?: string;
  tags: string[];
  onTagsChange: (tags: string[]) => void;
}

export const TagsInput: FC<TagsInputProps> = ({
  className,
  tags,
  onTagsChange,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " " && inputValue.trim()) {
      e.preventDefault();
      const newTag = inputValue.trim();
      if (newTag && !tags.includes(newTag)) {
        onTagsChange([...tags, newTag]);
      }
      setInputValue("");
    } else if (e.key === "Backspace" && inputValue === "" && tags.length > 0) {
      // 빈 입력 필드에서 백스페이스 누르면 마지막 태그 삭제
      onTagsChange(tags.slice(0, -1));
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    onTagsChange(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div
      className={cn(
        "gap-xs border-sm border-grayscale-g2 flex w-full flex-wrap items-center rounded-md px-16 py-12",
        className,
      )}
    >
      {tags.map((tag, index) => (
        <button
          key={`${tag}-${index}`}
          type="button"
          onClick={() => handleTagRemove(tag)}
          className="flex items-center"
        >
          <Tag type="default">{tag}</Tag>
        </button>
      ))}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={tags.length === 0 ? "태그를 입력하세요" : ""}
        className={cn(
          "text-body-small-regular text-text-black bg-transparent outline-none",
          "placeholder:text-body-small-regular placeholder:text-text-muted",
          "min-w-100 flex-1",
        )}
      />
    </div>
  );
};
