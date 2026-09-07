"use client";

import { Search } from "lucide-react";

import { useSkillDiscovery } from "@/store/skillDiscovery";

const trending = [
  "Generative AI",
  "UI Design",
  "Python",
  "Ceramics",
];

export default function SkillSearch() {
  const search = useSkillDiscovery(
    (state) => state.search
  );

  const setSearch = useSkillDiscovery(
    (state) => state.setSearch
  );

  return (
    <section className="bg-[#F7F7FF] px-6 py-16">
      <div className="mx-auto max-w-5xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-[#17366F] md:text-6xl">
          Master any skill through{" "}
          <span className="text-indigo-600">
            Value Exchange
          </span>
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-[#53617A]">
          Connect with curators worldwide. Swap your
          expertise for theirs, fueled by the digital
          token ecosystem.
        </p>

        <div className="mx-auto mt-9 flex max-w-2xl overflow-hidden rounded-2xl bg-white p-2 shadow-lg">
          <div className="flex flex-1 items-center">
            <Search
              size={20}
              className="ml-4 text-indigo-600"
            />

            <input
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="What do you want to learn today?"
              className="w-full px-4 py-4 text-sm outline-none"
            />
          </div>

          <button
            type="button"
            className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white"
          >
            Search Now
          </button>
        </div>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
          <span className="mr-2 text-sm text-[#53617A]">
            Trending:
          </span>

          {trending.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setSearch(item)}
              className="rounded-lg bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}