export default function IconWithLabel({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex items-center gap-4 px-12">
      {icon}
      <span className="text-body-medium text-grayscale-black">{label}</span>
    </div>
  );
}
