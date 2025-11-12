export default function IconWithLabel({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="gap-xs flex flex-col items-center px-12">
      {icon}
      <span className="text-body-medium text-grayscale-black">{label}</span>
    </div>
  );
}
