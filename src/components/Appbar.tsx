"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type User = {
  id: string;
  name: string;
  avatarUrl?: string;
};

export default function Appbar() {
  const { data: session } = useSession();
  const userId = session?.user.id;
  const router = useRouter();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="bg-white text-black z-50 top-0 fixed border-b border-gray-100 w-full justify-between h-16 flex items-center">
      <button
        onClick={() => router.push("/")}
        className="lg:text-3xl text-orange-500 text-2xl ml-4 font-bold lg:ml-8"
      >
        VideoWatch
      </button>

      <div className="w-1/2 relative hidden sm:block">
        <form className="max-w-md mx-auto">
          <div className="relative">
            <input
              type="search"
              id="default-search"
              className="block w-full p-2 bg-orange-100 ps-10 text-sm text-black outline-none rounded-full"
              placeholder="Search your favourite streamers..."
            />
          </div>
        </form>
      </div>

      <div className="mr-4  lg:mr-8 justify-between flex">
        <div>
          <div className="relative flex items-center lg:ml-4 ml-4">
            {session?.user ? (
              <>
                <div
                  onClick={handleDropdownToggle}
                  className="flex h-8 w-8 overflow-hidden items-center"
                >
                  <div className="flex items-center justify-center cursor-pointer h-7 w-7 rounded-full border bg-green-600 text-white">
                    {session.user.name?.charAt(0).toUpperCase()}
                  </div>
                </div>
              </>
            ) : (
              <div
                onClick={() => router.push("/auth/signin")}
                className="cursor-pointer sm:block block"
              >
                Signin
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
