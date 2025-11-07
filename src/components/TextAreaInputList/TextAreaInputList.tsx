import { FC, useState } from "react";
import { cn } from "@/utils";
import { IconChevron, IconPlus, IconMinus } from "@/assets/icons";
import { TextArea } from "@/components/Input/Input";

interface TextAreaInputListProps {
  title: string;
  textAreas?: string[];
  onTextAreasChange?: (textAreas: string[]) => void;
  className?: string;
}

export const TextAreaInputList: FC<TextAreaInputListProps> = ({
  title,
  textAreas = ["", ""],
  onTextAreasChange,
  className,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleAddTextArea = () => {
    const newTextAreas = [...textAreas, ""];
    onTextAreasChange?.(newTextAreas);
  };

  const handleRemoveTextArea = () => {
    if (textAreas.length > 1) {
      const newTextAreas = textAreas.slice(0, -1);
      onTextAreasChange?.(newTextAreas);
    }
  };

  const handleTextAreaChange = (index: number, value: string) => {
    const newTextAreas = [...textAreas];
    newTextAreas[index] = value;
    onTextAreasChange?.(newTextAreas);
  };

  return (
    <div
      className={cn(
        "gap-sm flex w-[810px] flex-col items-start opacity-60",
        className,
      )}
    >
      {/* Header */}
      <div className="flex w-full items-start justify-between">
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="gap-xs flex items-start"
        >
          <p className="text-headings-heading-4 whitespace-nowrap text-black">
            {title}
          </p>
        </button>
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex size-24 items-center justify-center"
        >
          <IconChevron
            className={cn(
              "size-24 overflow-hidden transition-transform duration-200",
              isExpanded ? "rotate-90" : "-rotate-90",
            )}
          />
        </button>
      </div>

      {/* Expandable Content */}
      {isExpanded && (
        <div className="gap-sm flex w-full items-start">
          {/* Plus/Minus Controls */}
          <div className="flex items-start gap-[10px]">
            <button
              type="button"
              onClick={handleAddTextArea}
              className="flex size-24 items-center justify-center"
            >
              <IconPlus className="size-24" />
            </button>
            <button
              type="button"
              onClick={handleRemoveTextArea}
              disabled={textAreas.length <= 1}
              className="flex size-24 items-center justify-center disabled:opacity-30"
            >
              <IconMinus className="size-24" />
            </button>
          </div>

          {/* TextArea List */}
          <div className="gap-sm flex flex-1 flex-col items-start">
            {textAreas.map((text, index) => (
              <TextArea
                key={index}
                value={text}
                onChange={(e) => handleTextAreaChange(index, e.target.value)}
                placeholder="김나경"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
