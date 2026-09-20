export interface WalletStatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  type: "earned" | "spent";
}

const WalletStatCard = ({ label, value, icon, type }: WalletStatCardProps) => {
  const isEarned = type === "earned";

  return (
    <div className="rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-indigo-600">
            {label}
          </p>

          <p className="mt-3 text-3xl font-bold tracking-tight text-[#193B75]">
            {value.toLocaleString()}
          </p>

          <p
            className={`mt-1 text-sm ${
              isEarned ? "text-green-600" : "text-gray-500"
            }`}
          >
            {isEarned
              ? "Tokens added to your wallet"
              : "Tokens used for sessions"}
          </p>
        </div>

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${
            isEarned
              ? "bg-green-100 text-green-600"
              : "bg-indigo-100 text-indigo-600"
          }`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

export default WalletStatCard;
