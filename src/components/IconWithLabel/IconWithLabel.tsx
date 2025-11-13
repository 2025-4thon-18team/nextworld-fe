export default function IconWithLabel({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}) {
  const content = (
    <div className="gap-xs flex flex-col items-center justify-center px-12 py-0">
      {icon}
      <p className="text-body-medium text-black text-center text-nowrap tracking-tight whitespace-pre">
        {label}
      </p>
    </div>
  );

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className="shrink-0">
        {content}
      </button>
    );
  }

  return content;
}
