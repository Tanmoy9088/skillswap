import { CircleCheck, Timer } from "lucide-react";
// import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const PricingPage = () => {
  return (
    <>
      <main className="pt-32 pb-20 px-6 flex flex-col gap-20 bg-[#FAF8FF]">
        {/*Hero Section */}
        <section className="flex flex-col justify-center items-center gap-6">
          <h2 className="font-extrabold text-6xl tracking-tight">
            Transparent{" "}
            <span className="font-extrabold tracking-normal text-[#4D44E3] ">
              Token Economy
            </span>
          </h2>
          <p className="max-w-2xl text-xl leading-8 text-[#445D99] ">
            SkillSwap+ operates on a fair-exchange barter system. Your time is
            your currency. No hidden fees, just pure human potential.
          </p>
        </section>
        {/*Bento grid */}
        <section className="max-w-7xl mx-auto grid grid-cols-12 gap-6">
          <div className="col-span-8 p-10 rounded-[8px] bg-[#F2F3FF] ">
            <div className="flex flex-col gap-4 ">
              <div className="w-12 py-3 rounded-[12px] bg-[#E2DFFF] flex justify-center">
                <Timer />
              </div>
              <h2 className="pt-2 font-bold text-3xl leading-9 text-[#113069] ">
                1 Token = 1 Hour
              </h2>
              <p className=" text-lg leading-7 text-[#445D99] ">
                Every skill is valued equally by time. Whether you&apos;re teaching
                quantum physics or artisanal baking, one hour of your expertise
                earns you one token to spend on any other skill in our
                marketplace.
              </p>
              <div className="pt-12 flex">{/* <Image /> */}</div>
            </div>
          </div>
          <div className="p-8 rounded-[8px] col-span-4 flex flex-col justify-between bg-linear-to-l from-[#4D44E3] to-[#4034D7]">
            <div className="flex flex-col gap-2">
              <h3 className="font-bold text-2xl leading-8 text-[#FAF6FF]">
                Onboarding Bonus
              </h3>
              <p className="pt-8 leading-6.5 text-[#FAF6FF] ">
                Complete your profile and host your first intro session to
                receive a welcome gift.
              </p>
              <h3 className="pt-4 font-extrabold text-5xl text-[#FAF6FF]">
                +2 Tokens
              </h3>
              <p className="text-sm leading-5 text-[#FAF6FF]">
                Start your journey with two free hours of learning.
              </p>
              <button className="mt-8 py-4 bg-[#FFFFFF] rounded-[12px] font-bold leading-6 ">
                Claim Here
              </button>
            </div>

            <div className=""></div>
          </div>
        </section>
        {/*Premium Subscription */}
        <section className="max-w-7xl mx-auto">
          <div className="flex flex-col pt-4 gap-12">
            <div className="flex flex-col justify-center items-center gap-4">
              <p className="w-fit py-1.5 px-4 rounded-[12px] bg-[#D5E3FC] font-bold text-xs tracking-tight text-[#455367]">
                OPTIONAL ADD-ONS
              </p>
              <h2 className="font-bold text-4xl leading-8 text-[#113069]">
                The Premium Curator Experience
              </h2>
              <p className="leading-6 text-[#445D99]">
                Boost your profile visibility and unlock advanced matching
                algorithms.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-8">
              <div className="flex flex-col p-8 bg-[#FFFFFF] rounded-[8px]">
                <div className="flex flex-col gap-2 pb-32">
                  <p className="font-bold text-sm leading-5 text-[#445d99]">
                    Essential
                  </p>
                  <h3 className="font-extrabold text-4xl leading-8 text-[#113069]">
                    $0<span className="text-lg leading-7 ">/mo</span>
                  </h3>
                  <div className="flex flex-col gap-4 pt-4">
                    <div className="flex gap-3">
                      <CircleCheck />
                      <p className="leading-6 text-[#445D99]">
                        Unlimited Skill Swaps
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <CircleCheck />
                      <p className="leading-6 text-[#445D99]">
                        Community Access
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <CircleCheck />
                      <p className="leading-6 text-[#445D99]">
                        Standard Matching
                      </p>
                    </div>
                  </div>
                </div>
                <button className="py-3 bg-[#E2E7FF] rounded-[8px] font-bold leading-6 text-[#3f33d6]">
                  Current Plan
                </button>
              </div>
              <div className="flex flex-col p-8 bg-[#FFFFFF] rounded-[8px]">
                <div className="flex flex-col gap-2 pb-32">
                  <p className="font-bold text-sm leading-5 text-[#4D44E3]">
                    Curator Pro
                  </p>
                  <h3 className="font-extrabold text-4xl leading-8 text-[#113069]">
                    $12<span className="text-lg leading-7 ">/mo</span>
                  </h3>
                  <div className="flex flex-col gap-4 pt-4">
                    <div className="flex gap-3">
                      <CircleCheck />
                      <p className="leading-6 text-[#445D99]">
                        Featured Profile Badge
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <CircleCheck />
                      <p className="leading-6 text-[#445D99]">
                        Priority Search Result
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <CircleCheck />
                      <p className="leading-6 text-[#445D99]">
                        AI-Powered Skill Matching
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <CircleCheck />
                      <p className="leading-6 text-[#445D99]">
                        Zero Transaction Fees
                      </p>
                    </div>
                  </div>
                </div>
                <button className="py-3 bg-[#E2E7FF] rounded-[8px] font-bold leading-6 bg-linear-to-l from-[#4D44E3] to-[#4034D7] text-[#FFFFFF]">
                  Upgrade to Pro
                </button>
              </div>
              <div className="flex flex-col p-8 bg-[#FFFFFF] rounded-[8px]">
                <div className="flex flex-col gap-2 pb-32">
                  <p className="font-bold text-sm leading-5 text-[#445d99]">
                    Institue
                  </p>
                  <h3 className="font-extrabold text-4xl leading-8 text-[#113069]">
                    $49<span className="text-lg leading-7 ">/mo</span>
                  </h3>
                  <div className="flex flex-col gap-4 pt-4">
                    <div className="flex gap-3">
                      <CircleCheck />
                      <p className="leading-6 text-[#445D99]">
                        Up to 10 Members Seats
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <CircleCheck />
                      <p className="leading-6 text-[#445D99]">
                        Shared Token Pool
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <CircleCheck />
                      <p className="leading-6 text-[#445D99]">
                        Organization Analytics
                      </p>
                    </div>
                  </div>
                </div>
                <button className="py-3 bg-[#E2E7FF] rounded-[8px] font-bold leading-6 text-[#3f33d6]">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </section>
        {/*Token history */}
        <section className="w-full max-w-7xl mx-auto px-8 pt-12 pb-8 flex flex-col gap-8 rounded-[8px] bg-[#F2F3FF]">
          <div className="w-full flex justify-between items-center">
            <div className="flex flex-col gap-2">
              <h2 className="font-bold text-3xl leading-9 text-[#113069]">
                Token Activity
              </h2>
              <p className="leading-6 text-[#445D99]">
                A transparent log of your recent skill exchanges.
              </p>
            </div>
            <div className="py-3 px-6 gap-3 border rounded-[12px] border-[#9881F2] bg-[#FFFFFF] ">
              <p>Current Balance: 4.5 Tokens</p>
            </div>
          </div>
          <div>
            <Table className="bg-[#FFFFFF] roounded-[8px] drop-shadow-2xl drop-shadow-black/5">
              <TableCaption>A list of your recent invoices.</TableCaption>
              <TableHeader className="bg-[#EAEDFF] border-b border-[#98b1f2]">
                <TableRow>
                  <TableHead className="font-bold text-xs leading-4 tracking-wide">
                    TRANSACTION ID
                  </TableHead>
                  <TableHead>ACTION/USER</TableHead>
                  <TableHead>SKILL/DURATION</TableHead>
                  <TableHead className="text-right">AMOUNT</TableHead>
                  <TableHead className="text-right">STATUS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium"></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell className="text-right"></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </section>
      </main>
    </>
  );
};

export default PricingPage;
