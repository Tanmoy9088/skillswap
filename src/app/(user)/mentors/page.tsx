"use client";

import { Search, SlidersHorizontal, Star, Users } from "lucide-react";

import { useSkillDiscovery } from "@/hooks/skills/useSkillDiscovery";

import {
  useSkillDiscovery as useSkillDiscoveryStore,
  type SkillLevel,
} from "@/store/skillDiscovery";

import { MentorGridSkeleton } from "@/components/mentors/MentorGridSkeleton";
import MentorCard from "@/components/mentors/MentorCard";

import type { SkillMentor } from "@/types/types/skills";

const DiscoverMentorsPage = () => {
  const {
    search,
    category,
    skillLevel,
    rating,
    sortBy,
    setSearch,
    setCategory,
    setSkillLevel,
    setRating,
    setSortBy,
    resetFilters,
  } = useSkillDiscoveryStore();

  const {
    data,
    isPending,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSkillDiscovery();

  const discoveryItems = data?.pages.flatMap((page) => page.items ?? []) ?? [];

  const mentors: SkillMentor[] = discoveryItems.map((item) => ({
    id: item.id,
    auth_user_id: item.auth_user_id,
    skill_id: item.skill_id,
    skill_name: item.skill_name,
    proficiency_level: item.proficiency_level,
    description: item.description,
    token_rate: item.token_rate,
    name: item.mentor_name,
    bio: null,
    profile_img: item.mentor_profile_img,
    rating: Number(item.average_rating ?? 0),
    total_ratings: Number(item.total_ratings ?? 0),
    image_url: item.image_url,
  }));

  const categories = [
    "All",
    ...Array.from(
      new Set(discoveryItems.map((mentor) => mentor.category).filter(Boolean)),
    ),
  ];

  return (
    <main className="min-h-screen bg-[#F7F7FF] px-4 pb-12 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
              <Users className="h-6 w-6" />
            </div>

            <div>
              <h1 className="text-3xl font-bold tracking-tight text-[#17366F]">
                Discover Mentors
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Find people who can help you learn the skills you want.
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <section className="mb-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 text-gray-900">
            <SlidersHorizontal className="h-5 w-5 text-indigo-600" />

            <h2 className="font-semibold">Find your mentor</h2>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {/* Search */}
            <div className="relative lg:col-span-2">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search skills or mentors..."
                className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
              />
            </div>

            {/* Category */}
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="h-11 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item || "All Categories"}
                </option>
              ))}
            </select>

            {/* Skill Level */}
            <select
              value={skillLevel}
              onChange={(event) =>
                setSkillLevel(event.target.value as SkillLevel)
              }
              className="h-11 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
            >
              <option value="All">All Levels</option>

              <option value="Beginner">Beginner</option>

              <option value="Intermediate">Intermediate</option>

              <option value="Advanced">Advanced</option>

              <option value="Expert">Expert</option>
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="h-11 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
            >
              <option value="Most Relevant">Most Relevant</option>

              <option value="Highest Rated">Highest Rated</option>

              <option value="Lowest Token Rate">Lowest Token Rate</option>
            </select>
          </div>

          {/* Rating */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="mr-1 text-sm font-medium text-gray-600">
              Rating:
            </span>

            {[0, 4, 4.5, 5].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setRating(value)}
                className={`inline-flex items-center gap-1 rounded-lg border px-3 py-2 text-sm font-medium transition ${
                  rating === value
                    ? "border-indigo-600 bg-indigo-50 text-indigo-600"
                    : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                {value === 0 ? (
                  "Any"
                ) : (
                  <>
                    <Star className="h-4 w-4 fill-current" />
                    {value}+
                  </>
                )}
              </button>
            ))}

            {(search ||
              category !== "All" ||
              skillLevel !== "All" ||
              rating > 0 ||
              sortBy !== "Most Relevant") && (
              <button
                type="button"
                onClick={resetFilters}
                className="ml-auto text-sm font-semibold text-indigo-600 hover:text-indigo-700"
              >
                Clear filters
              </button>
            )}
          </div>
        </section>

        {/* Results */}
        {isPending ? (
          <MentorGridSkeleton />
        ) : isError ? (
          <div className="rounded-2xl border border-red-100 bg-white p-10 text-center shadow-sm">
            <h2 className="font-bold text-red-600">Failed to load mentors</h2>

            <p className="mt-2 text-sm text-gray-500">
              {error instanceof Error
                ? error.message
                : "Something went wrong while loading mentors."}
            </p>
          </div>
        ) : mentors.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center shadow-sm">
            <Users className="mx-auto h-10 w-10 text-gray-300" />

            <h2 className="mt-4 text-lg font-bold text-gray-900">
              No mentors found
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Try changing your search or filters.
            </p>
          </div>
        ) : (
          <>
            {/* Result count */}
            <div className="mb-5 flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Showing{" "}
                <span className="font-semibold text-gray-900">
                  {mentors.length}
                </span>{" "}
                mentors
              </p>
            </div>

            {/* Mentor cards */}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {mentors.map((mentor) => (
                <MentorCard key={mentor.id} mentor={mentor} />
              ))}
            </div>

            {/* Load More */}
            {hasNextPage && (
              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                  className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isFetchingNextPage ? "Loading..." : "Load More"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default DiscoverMentorsPage;
