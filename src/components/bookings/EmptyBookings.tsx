export interface EmptyBookingsProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}
const EmptyBookings = ({ icon, title, description }: EmptyBookingsProps) => {
  return (
    <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-10 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 text-indigo-500">
        {icon}
      </div>

      <h3 className="mt-4 font-semibold text-gray-800">{title}</h3>

      <p className="mt-1 text-sm text-gray-500">{description}</p>
    </div>
  );
};
export default EmptyBookings;
