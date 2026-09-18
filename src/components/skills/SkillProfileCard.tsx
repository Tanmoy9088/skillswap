import { Trash2 } from "lucide-react";
import SessionOptionsManager from "../mentors/SessionOptionsManager";
import Image from "next/image";

export default function SkillProfileCard({
  skill,
  type,
  isRemoving,
  onRemove,
}: {
  skill: {
    id: string;
    skill_type: "offered" | "wanted";
    proficiency_level?: string | null;
    description?: string | null;

    skills: {
      id: string;
      name: string;
      category: string | null;
      description: string | null;
      image_url: string | null;
      is_active: boolean;
    } | null;
  };

  type: "offered" | "wanted";
  isRemoving: boolean;
  onRemove: () => void;
}) {
  const isOffered = type === "offered";

  /*
   * Master skill comes from the skills table.
   */
  const masterSkill = skill.skills;

  /*
   * Safety check.
   */
  if (!masterSkill) {
    return null;
  }

  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* ========================================================= */}
      {/* Image */}
      {/* ========================================================= */}

      <div className="relative h-44 overflow-hidden bg-indigo-50">
        {masterSkill.image_url ? (
          <Image
            src={masterSkill.image_url}
            alt={masterSkill.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className={`flex h-full items-center justify-center ${
              isOffered ? "bg-indigo-50" : "bg-green-50"
            }`}
          >
            <span
              className={`text-6xl font-bold ${
                isOffered ? "text-indigo-200" : "text-green-200"
              }`}
            >
              {masterSkill.name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}

        {/* Type badge */}
        <span
          className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold shadow-sm ${
            isOffered ? "bg-white text-indigo-600" : "bg-white text-green-600"
          }`}
        >
          {isOffered ? "I Offer" : "I Want"}
        </span>

        {/* Remove */}
        <button
          type="button"
          disabled={isRemoving}
          onClick={onRemove}
          aria-label={`Remove ${masterSkill.name}`}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-500 opacity-0 shadow-sm backdrop-blur transition group-hover:opacity-100 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* ========================================================= */}
      {/* Content */}
      {/* ========================================================= */}

      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900">{masterSkill.name}</h3>

        {/* Category */}
        {masterSkill.category && (
          <p className="mt-1 text-xs font-medium uppercase tracking-wide text-gray-400">
            {masterSkill.category}
          </p>
        )}

        {/* Proficiency */}
        {skill.proficiency_level && (
          <div className="mt-3">
            <span
              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                isOffered
                  ? "bg-indigo-50 text-indigo-600"
                  : "bg-green-50 text-green-600"
              }`}
            >
              {skill.proficiency_level}
            </span>
          </div>
        )}

        {/* Personal description */}
        {skill.description && (
          <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-500">
            {skill.description}
          </p>
        )}

        {/* ======================================================= */}
        {/* Mentor Session Options */}
        {/* ======================================================= */}

        {isOffered && (
          <div className="mt-5 border-t border-gray-100 pt-5">
            <SessionOptionsManager userSkillId={skill.id} />
          </div>
        )}
      </div>
    </article>
  );
}