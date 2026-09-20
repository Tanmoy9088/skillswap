import { SwapView } from "@/app/(user)/swaps/page";
import { GraduationCap, Users } from "lucide-react";

interface EmptySwapStateProps {
  type: SwapView;
}

const EmptySwapState = ({ type }: EmptySwapStateProps) => {
  const isLearning = type === "learning";

  return (
    <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-12 text-center shadow-sm">
      <div
        className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl ${
          isLearning
            ? "bg-blue-50 text-blue-600"
            : "bg-purple-50 text-purple-600"
        }`}
      >
        {isLearning ? (
          <GraduationCap className="h-7 w-7" />
        ) : (
          <Users className="h-7 w-7" />
        )}
      </div>

      <h3 className="mt-5 text-lg font-semibold text-gray-900">
        {isLearning ? "No learning swaps yet" : "No teaching swaps yet"}
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
        {isLearning
          ? "Find a skill you want to learn and request a swap to start your learning journey."
          : "When someone requests one of your offered skills and the swap is accepted, it will appear here."}
      </p>
    </div>
  );
};

export default EmptySwapState