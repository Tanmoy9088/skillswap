import { LucideIcon } from "lucide-react";

type SessionOverviewItem = {
  title: string;
  value: number;
  icon: LucideIcon;
  description: string;
};

type SessionOverviewProps = {
  items: SessionOverviewItem[];
};

const SessionOverview = ({ items }: SessionOverviewProps) => {
  return (
    <section className="mt-8">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-900">Session Overview</h2>

        <p className="mt-1 text-sm text-gray-500">
          Real session request and completion statistics
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="rounded-xl bg-gray-100 p-3 text-gray-700">
                  <Icon size={21} />
                </div>

                <span className="text-xs font-medium text-gray-400">
                  SkillSwap+
                </span>
              </div>

              <p className="mt-5 text-sm font-medium text-gray-500">
                {item.title}
              </p>

              <p className="mt-1 text-3xl font-bold text-gray-900">
                {item.value}
              </p>

              <p className="mt-2 text-xs text-gray-500">{item.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SessionOverview;
