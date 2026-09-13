import Image from "next/image";
import Link from "next/link";

import { ExternalLink, UserRound } from "lucide-react";

interface SwapCardUserProps {
  userId: string;
  userName: string;
  userImage: string | null;
  userRole: string;
}

export default function SwapCardUser({
  userId,
  userName,
  userImage,
  userRole,
}: SwapCardUserProps) {
  return (
    <div className="mt-6 flex items-center justify-between rounded-2xl border border-gray-100 bg-gray-50/70 p-4">
      <div className="flex min-w-0 items-center gap-3">
        {userImage ? (
          <Image
            src={userImage}
            alt={userName}
            width={52}
            height={52}
            className="h-13 w-13 rounded-full border-2 border-white object-cover shadow-sm"
          />
        ) : (
          <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-full border-2 border-white bg-gray-200 shadow-sm">
            <UserRound className="h-6 w-6 text-gray-500" />
          </div>
        )}

        <div className="min-w-0">
          <p className="truncate font-semibold text-gray-900">{userName}</p>

          <p className="mt-0.5 text-sm text-gray-500">{userRole}</p>
        </div>
      </div>

      <Link
        href={`/mentors/${userId}`}
        className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-gray-600 transition hover:text-black sm:flex"
      >
        Profile
        <ExternalLink className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}