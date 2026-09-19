import { LucideIcon } from "lucide-react";

type DashboardStatCardProps = {
  title: string;
  value: number;
  description: string;
  icon: LucideIcon;
  iconClassName: string;
  iconBackground: string;
};

const DashboardStatCard = ({
  title,
  value,
  description,
  icon: Icon,
  iconClassName,
  iconBackground,
}: DashboardStatCardProps) => {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>

          <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
        </div>

        <div className={`rounded-xl p-3 ${iconBackground}`}>
          <Icon size={22} className={iconClassName} />
        </div>
      </div>

      <div className="mt-4 text-xs text-gray-500">{description}</div>
    </div>
  );
};

export default DashboardStatCard;
