import { BookOpen, Plus, Sparkles } from "lucide-react";

export default function EmptySkills({
  type,
  onAdd,
}: {
  type: "offered" | "wanted";
  onAdd: () => void;
}) {
  const isOffered = type === "offered";

  return (
    <div
      className={`rounded-2xl border-2 border-dashed p-10 text-center ${
        isOffered
          ? "border-indigo-100 bg-indigo-50/40"
          : "border-green-100 bg-green-50/40"
      }`}
    >
      <div
        className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl ${
          isOffered ? "bg-indigo-100" : "bg-green-100"
        }`}
      >
        {isOffered ? (
          <Sparkles className="h-6 w-6 text-indigo-600" />
        ) : (
          <BookOpen className="h-6 w-6 text-green-600" />
        )}
      </div>

      <h3 className="mt-4 font-semibold text-gray-900">
        {isOffered ? "Share your expertise" : "Start your learning journey"}
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
        {isOffered
          ? "Add a skill you're confident teaching to help other members."
          : "Add a skill you'd like to learn from someone in the community."}
      </p>

      <button
        type="button"
        onClick={onAdd}
        className={`mt-5 inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white ${
          isOffered
            ? "bg-indigo-600 hover:bg-indigo-700"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        <Plus size={17} />
        Add Skill
      </button>
    </div>
  );
}