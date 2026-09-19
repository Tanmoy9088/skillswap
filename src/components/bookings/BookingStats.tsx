interface BookingStatProps {
  label: string;
  value: number;
  icon: React.ReactNode;
}

const BookingStat = ({ label, value, icon }: BookingStatProps) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500">{label}</p>

        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
          {icon}
        </div>
      </div>

      <p className="mt-3 text-2xl font-bold text-[#17366F]">{value}</p>
    </div>
  );
};

export default BookingStat;