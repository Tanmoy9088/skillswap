"use client";

import SkillSearch from "@/components/skills/SkillSearch";
import SkillFilters from "@/components/skills/SkillFilter";
import SkillGrid from "@/components/skills/SkillGrid";
import LoadMoreButton from "@/components/skills/LoadMoreButton";

const SkillsPage = () => {
  return (
    <main className="min-h-screen bg-[#F7F8FD]">
      {/* Hero + Search */}
      <SkillSearch />

      {/* Discovery Content */}
      <div className="mx-auto flex max-w-7xl gap-6 px-6 py-8">
        {/* Filters */}
        <aside className="hidden lg:block">
          <SkillFilters />
        </aside>

        {/* Skills */}
        <section className="min-w-0 flex-1">
          <SkillGrid />

          <div className="mt-8">
            <LoadMoreButton />
          </div>
        </section>
      </div>
    </main>
  );
};

export default SkillsPage;