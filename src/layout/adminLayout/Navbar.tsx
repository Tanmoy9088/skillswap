"use client";
import Image from "next/image";
import { Search } from "lucide-react";
import { useLogout } from "@/hooks/use-logout";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const { mutate: logoutMutate, data: LogoutData } = useLogout();
  const handleLogout = () => {
    logoutMutate(undefined, {
      onSuccess: () => {
        router.push("/login");
      },

      onError: (error) => {
        console.error("Logout error:", error.message);
      },
    });
  };
  return (
    <>
      <header className="fixed flex px-4 h-16 top-0 left-72 right-0 z-50 items-center bg-[#FAF8FF] backdrop-blur-xs">
        <div className="w-full flex justify-between items-center">
          {/*Search input / left side*/}
          <div className="relative">
            <div className="absolute top-1/2 -translate-y-1/2 pl-2">
              <Search size={14} />
            </div>

            <input
              className="bg-[#EAEDFF] border py-3 px-8 rounded-xl text-sm w-[320px]"
              type="text"
              placeholder="Search sessions, users, or skills..."
            />
          </div>
          {/*profile / right side */}
          <div className="flex">
            <div className="flex gap-2">
              <button onClick={handleLogout}>Logout</button>
              <div>
                <h2>Admin panel</h2>
                <h4>System Administrator</h4>
              </div>
              <div>
                {/* <Image
                  src="https://unsplash.com/photos/shallow-focus-photography-of-woman-outdoor-during-day-rDEOVtE7vOs"
                  alt="Profile photo"
                  width={40}
                  height={40}
                  className="rounded-full bg-amber-400 w-10 h-10"
                /> */}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
