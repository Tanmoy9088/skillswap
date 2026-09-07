import Image from "next/image";
import React from "react";
import community1 from "../../../../public/images/community1.png";
import community2 from "../../../../public/images/community2.png";
import StorySection from "@/components/community&stories/StorySection";

const CommunityPage = () => {
  return (
    <>
      <main className="w-full bg-[#FAF8FF] overflow-hidden ">
        <div className="max-w-7xl mx-auto py-20 md:px-8 grid grid-cols-1 md:grid-cols-12 gap-12 bg-[#F2F3FF] rounded-[32px]">
          <div className="md:col-span-6 flex flex-col">
            <p className="w-fit px-4 py-1.5 bg-[#d5e3fc] rounded-xl">
              Our community
            </p>
            <h1 className="text-5xl md:text-7xl  tracking-tight font-extrabold my-4">
              The Currency <br />
              <span>of</span> <br />
              <span>Human Connection</span>
            </h1>
            <p>
              Beyond tutorials and certificates, we build bridges. Discover how
              members across 120 countries are exchanging expertise to redefine
              personal growth.
            </p>
            <div className="flex gap-2 py-4">
              <a
                className="p-2 w-fit text-white bg-[#4D44E3] rounded-md"
                href=""
              >
                Share your story
              </a>
              <a
                className="p-2 w-fit text-[#113069] bg-[#D9E2FF] rounded-md"
                href=""
              >
                Join the Movement
              </a>
            </div>
          </div>
          <div className="md:col-span-6 flex flex-col items-center xl:flex-row px-2">
            <Image src={community1} alt="community-1" className="sm:w-full" />
            <Image src={community2} alt="community-2" className="sm:w-full" />
          </div>
        </div>

        {/*STAT DIV */}
        <div className="grid grid-cols-1 lg:grid-cols-3 max-w-7xl mx-auto gap-8 my-24">
          <div className="flex flex-col gap-2 border shadow-2xl rounded-2xl p-10">
            <h2 className="font-bold text-5xl ">1.2M+</h2>
            <p>HOURS TAUGHT</p>
          </div>
          <div className="flex flex-col items-center gap-2 border shadow-2xl rounded-2xl p-10">
            <h2 className="font-bold text-5xl ">1.2M+</h2>
            <p>HOURS TAUGHT</p>
          </div>
          <div className="flex flex-col items-center border shadow-2xl rounded-2xl gap-2 p-10">
            <h2 className="font-bold text-5xl ">1.2M+</h2>
            <p>HOURS TAUGHT</p>
          </div>
        </div>
        <StorySection />
      </main>
    </>
  );
};

export default CommunityPage;
