"use client";

import { useSkillDiscovery } from "@/hooks/skills/useSkillDiscovery";
import { useSkillDiscovery as useSkillDiscoveryStore } from "@/store/skillDiscovery";

import SkillCard from "./SkillCard";

export default function SkillGrid() {
  const sortBy = useSkillDiscoveryStore((state) => state.sortBy);
  const setSortBy = useSkillDiscoveryStore((state) => state.setSortBy);

  const { data, isPending, isError, error, isFetching } = useSkillDiscovery();

  // ================================
  // LOADING
  // ================================

  if (isPending) {
    return (
      <div>
        <div className="mb-6 h-8 w-48 animate-pulse rounded bg-gray-200" />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="h-80 animate-pulse rounded-2xl bg-gray-200"
            />
          ))}
        </div>
      </div>
    );
  }

  // ================================
  // ERROR
  // ================================

  if (isError) {
    return (
      <div className="rounded-2xl border border-red-100 bg-white p-8 text-center">
        <h2 className="text-lg font-bold text-red-600">
          Unable to load skills
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          {error instanceof Error
            ? error.message
            : "Something went wrong while loading skills."}
        </p>
      </div>
    );
  }

  // ================================
  // DATA
  // ================================

  const pages = data?.pages ?? [];

  const skills = pages.flatMap((page) => page.items);

  const total = pages[0]?.total ?? 0;

  return (
    <div>
      {/* ================================
          HEADER
      ================================= */}

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#17366F]">Explore Skills</h2>

          <p className="mt-1 text-sm text-[#53617A]">
            Discover skills offered by our community.
          </p>
        </div>

        {/* SORT */}

        <div className="flex items-center gap-2">
          <label htmlFor="skill-sort" className="text-sm text-gray-500">
            Sort by
          </label>

          <select
            id="skill-sort"
            value={sortBy}
            onChange={(event) =>
              setSortBy(
                event.target.value as
                  | "Most Relevant"
                  | "Highest Rated"
                  | "Lowest Token Rate"
                  | "Highest Token Rate"
                  | "Newest",
              )
            }
            className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-[#17366F] outline-none focus:border-indigo-500"
          >
            <option value="Most Relevant">Most Relevant</option>

            <option value="Highest Rated">Highest Rated</option>

            <option value="Lowest Token Rate">Lowest Token Rate</option>

            <option value="Highest Token Rate">Highest Token Rate</option>

            <option value="Newest">Newest</option>
          </select>
        </div>
      </div>

      {/* ================================
          COUNT
      ================================= */}

      <div className="mb-5 text-sm text-[#53617A]">
        Showing{" "}
        <span className="font-semibold text-[#17366F]">{skills.length}</span> of{" "}
        <span className="font-semibold text-[#17366F]">{total}</span> skills
      </div>

      {/* ================================
          EMPTY STATE
      ================================= */}

      {skills.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-16 text-center">
          <h3 className="text-lg font-bold text-[#17366F]">No skills found</h3>

          <p className="mt-2 text-sm text-gray-500">
            Try changing your search or filters.
          </p>
        </div>
      ) : (
        /* ================================
           SKILL GRID
        ================================= */

        <div
          className={`grid gap-6 md:grid-cols-2 xl:grid-cols-3 ${
            isFetching ? "opacity-70" : ""
          }`}
        >
          {skills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      )}
    </div>
  );
}
