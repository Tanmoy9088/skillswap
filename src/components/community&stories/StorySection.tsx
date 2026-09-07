import { BadgeCheck, Brush, Heart } from "lucide-react";
import Link from "next/link";
import React from "react";

const StorySection = () => {
  return (
    <>
      <div className="overflow-hidden">
        {/*top */}
        <section className="max-w-7xl mx-auto px-8">
          <h3>Real Swap, Real People</h3>
          <div className="flex justify-between overflow-hidden">
            <p>Where curosity meets, generosity</p>
            <Link href="/stories">View all stories</Link>
          </div>

          {/*Card */}
          <div className="mt-12 mb-24 grid grid-cols-12 grid-rows-2 gap-6 overflow-hidden">
            {/*top card */}
            <div className="h-95.75 col-span-8 border bg-[#F2F3FF] rounded-xl"></div>
            <div className="h-95.75 col-span-4 flex flex-col border border-[#4D44E3] bg-[#4D44E3] p-10 text-white rounded-3xl">
              <Brush />
              <h4 className="font-bold text-2xl leading-8 py-4">
                Pottery for SEO
              </h4>
              <p>
                &quot;Found a local mentor who needed help with her ceramics
                business digital presence. We swapped studio time for search
                ranking strategies.&quot;
              </p>
              <div className="flex pt-8">
                {/* <img src="" alt="" /> */}
                <h5>Name</h5>
              </div>
            </div>
            {/*bottom card */}
            <div className="h-95.75 col-span-4 bg-blue-50 rounded-xl"></div>
            <div className="h-95.75 col-span-8 border-l-[#4D44E3] bg-[#D9E2FF] rounded-3xl"></div>
          </div>
        </section>
        {/*Meet mentors */}
        <section className="px-8 flex flex-col gap-16 pt-32 pb-24 bg-[#F2F3FF] ">
          <div className="flex flex-col gap-4">
            <h3 className="font-extrabold text-4xl leading-10 text-[#113069] text-center ">
              Featured Mentors
            </h3>
            <p className="text-sm leading-6 text-center">
              Meet the top-rated curators of knowledge in our global network.
            </p>
          </div>
          {/*Mentor Card */}
          <div className=""></div>
        </section>
        {/*Community guideline */}
        <section className="max-w-7xl mx-auto pt-28 pb-20 px-20 rounded-[48px] bg-[#113069]">
          <div className="max-w-264 mx-auto grid grid-cols-2 gap-16">
            <div className="pb-8 flex flex-col gap-8">
              <h3 className=" text-[#FAF6FF] font-extrabold text-4xl leading-10 ">
                Community Guidelines
              </h3>
              <p className="text-[#FAF6FFB2] ">
                Our culture is built on mutual respect and the belief that
                everyone has something valuable to teach.
              </p>
              <div className="flex flex-col gap-6 pt-4 ">
                <div className="flex gap-4">
                  <BadgeCheck className="text-[#E2DFFF]" />
                  <div>
                    <h4 className="leading-6 text-[#FAF6FF] ">Trust First</h4>
                    <p className="text-[#FAF6FF99] text-sm ">
                      Always verify your profile and be transparent about your
                      expertise levels.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Heart className="text-[#E2DFFF]" />
                  <div>
                    <h4 className="leading-6 text-[#FAF6FF] ">
                      Generous Spirit
                    </h4>
                    <p className="text-[#FAF6FF99] text-sm ">
                      Give 100% in your teaching sessions. The quality of your
                      gift matters.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-rows-2 gap-6">
              <div className="flex flex-col gap-4 p-8 text-[#FFFFFF0D] border border-[#FFFFFF1A] rounded-[16px] backdrop-blur-md bg-[#223775]">
                <p className="font-bold leading-6 text-[#E2DFFF] ">Rule #1</p>
                <h4 className="font-bold text-xl leading-7 text-[#FAF6FF] ">
                  No Financial Transactions
                </h4>
                <p className="text-sm leading-5 text-[#FAF6FFB2] ">
                  SkillSwap+ is a pure barter economy. Offering or requesting
                  money for skills is strictly prohibited to maintain the
                  integrity of our mission.
                </p>
              </div>
              <div className="flex flex-col gap-4 p-8 text-[#FFFFFF0D] border border-[#99c2eb1a] rounded-[16px] backdrop-blur-md bg-[#223775]">
                {" "}
                <p className="font-bold leading-6 text-[#E2DFFF] ">Rule #2</p>
                <h4 className="font-bold text-xl leading-7 text-[#FAF6FF] ">
                  Reliable Commitments
                </h4>
                <p className="text-sm leading-5 text-[#FAF6FFB2] ">
                  A &quot;Swap&quot; is a social contract. Canceling with less
                  than 24-hour notice affects your community trust score.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="max-w-7xl mx-auto pt-28 pb-20 px-8 flex flex-col justify-center items-center gap-8">
          <h2 className="text-5xl font-extrabold text-[#113069] ">
            Ready to write your chapter?
          </h2>
          <p className="max-w-2xl pb-4 text-xl leading-7 text-[#445D99] ">
            Join a global community where your hobby could be someone
            else&quot;s career breakthrough.
          </p>
          <button className="w-77 py-5 px-12 rounded-[12px] bg-[#4D44E3] font-bold text-xl text-[#FFFFFF]">
            Start your next chapter
          </button>
        </section>
      </div>
    </>
  );
};

export default StorySection;
