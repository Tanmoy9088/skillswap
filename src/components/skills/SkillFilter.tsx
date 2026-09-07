"use client";

import { Check, Star } from "lucide-react";

import {
  useSkillDiscovery,
  type SkillLevel,
} from "@/store/skillDiscovery";

const categories = [
  "Technology",
  "Design & Arts",
  "Business",
  "Lifestyle",
];

const levels: SkillLevel[] = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "Expert",
];

export default function SkillFilters() {
  const category = useSkillDiscovery(
    (state) => state.category
  );

  const skillLevel = useSkillDiscovery(
    (state) => state.skillLevel
  );

  const minRating = useSkillDiscovery(
    (state) => state.rating
  );

  const setCategory = useSkillDiscovery(
    (state) => state.setCategory
  );

  const setSkillLevel = useSkillDiscovery(
    (state) => state.setSkillLevel
  );

  const setMinRating = useSkillDiscovery(
    (state) => state.setRating
  );

  return (
    <aside className="w-full shrink-0 rounded-2xl bg-white p-5 shadow-sm lg:w-64">
      <div>
        <h3 className="text-xs font-bold tracking-wide text-indigo-700">
          CATEGORY
        </h3>

        <div className="mt-4 space-y-3">
          <FilterButton
            active={category === "All"}
            label="All"
            onClick={() => setCategory("All")}
          />

          {categories.map((item) => (
            <FilterButton
              key={item}
              active={category === item}
              label={item}
              onClick={() => setCategory(item)}
            />
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xs font-bold tracking-wide text-indigo-700">
          SKILL LEVEL
        </h3>

        <div className="mt-4 space-y-3">
          {levels.map((level) => (
            <RadioButton
              key={level}
              active={skillLevel === level}
              label={level}
              onClick={() => setSkillLevel(level)}
            />
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xs font-bold tracking-wide text-indigo-700">
          TEACHER RATING
        </h3>

        <div className="mt-4 space-y-3">
          <RatingButton
            active={minRating === 4.5}
            label="4.5 & up"
            onClick={() => setMinRating(4.5)}
          />

          <RatingButton
            active={minRating === 4}
            label="4.0 & up"
            onClick={() => setMinRating(4)}
          />

          <RatingButton
            active={minRating === 0}
            label="Any rating"
            onClick={() => setMinRating(0)}
          />
        </div>
      </div>
    </aside>
  );
}

function FilterButton({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 text-left text-sm text-[#17366F]"
    >
      <span
        className={`flex h-4 w-4 items-center justify-center rounded border ${
          active
            ? "border-indigo-600 bg-indigo-600"
            : "border-indigo-300 bg-white"
        }`}
      >
        {active && (
          <Check
            size={12}
            className="text-white"
          />
        )}
      </span>

      {label}
    </button>
  );
}

function RadioButton({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-3 text-sm text-[#17366F]"
    >
      <span
        className={`h-4 w-4 rounded-full border ${
          active
            ? "border-indigo-600 bg-indigo-600 ring-4 ring-indigo-100"
            : "border-indigo-300"
        }`}
      />

      {label}
    </button>
  );
}

function RatingButton({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 text-sm ${
        active
          ? "font-semibold text-[#17366F]"
          : "text-[#53617A]"
      }`}
    >
      <Star
        size={14}
        className="fill-yellow-400 text-yellow-400"
      />

      {label}
    </button>
  );
}