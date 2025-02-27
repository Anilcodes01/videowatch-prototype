"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import NewUserModal from "@/components/NewUserModal";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isNewUser, setIsNewUser] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState<{
    kickUsername?: string;
    streamKey?: string;
  } | null>(null);

  console.log(isNewUser)
  console.log(session)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      const fetchUserData = async () => {
        try {
          const response = await fetch("/api/user");
          const data = await response.json();

          setUserData(data);
          setIsNewUser(data.isNewUser);

          if (data.isNewUser) {
            setShowModal(true);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, [status]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className=" bg-white w-full h-screen  ">
      <h1 className="text-2xl text-black font-bold  mb-6">Dashboard</h1>

      {userData?.kickUsername && (
        <div className="mb-8 bg-white min-h-screen w-full flex flex-col items-center ">
          <div className="aspect-video mt-4 w-full rounded lg:max-w-4xl bg-white  overflow-hidden">
            <iframe
              src={`https://player.kick.com/${userData.kickUsername}`}
              className="w-full h-full"
              allowFullScreen
            ></iframe>
          </div>

          <p className="mb-4 mt-4 px-4 lg:max-w-4xl  w-full text-orange-500">
            <span className="font-bold text-4xl">{userData.kickUsername}</span>
          </p>
        </div>
      )}

      <NewUserModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setIsNewUser(false);
        }}
      />
    </div>
  );
}
