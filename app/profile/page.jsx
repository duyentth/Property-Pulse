"use client";
import Image from "next/image";
import { useSession } from "next-auth/react";
import profileDefault from "@/assets/images/profile.png";
import { useState, useEffect } from "react";
import Spinner from "@/components/Spinner";
import { fetchPropertiesByUserId } from "@/utils/requests";
import ProfileProperty from "@/components/ProfileProperty";

const ProfilePage = () => {
  const { data: session } = useSession();
  const profileImage = session?.user?.image;
  const [properties, setProperties] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getProperties = async (userId) => {
      const ret = await fetchPropertiesByUserId(userId);
      if (ret) {
        setProperties(ret);
      }
      setIsLoading(false);
    };
    if (session?.user?.id) {
      getProperties(session.user.id);
    }
  }, [session]);

  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mx-20 mt-10">
              <div className="mb-4">
                <Image
                  className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0"
                  src={profileImage || profileDefault}
                  height={400}
                  width={400}
                  alt="User"
                />
              </div>
              <h2 className="text-2xl mb-4">
                <span className="font-bold block">Name: </span>{" "}
                {session?.user?.name}
              </h2>
              <h2 className="text-2xl">
                <span className="font-bold block">Email: </span>{" "}
                {session?.user?.email}
              </h2>
            </div>

            <div className="md:w-3/4 md:pl-4">
              <h2 className="text-xl font-semibold mb-4">Your Listings</h2>
              {!isLoading && properties.length === 0 && (
                <p>You have no property listings</p>
              )}
              {isLoading ? (
                <Spinner loading={isLoading} />
              ) : (
                <ProfileProperty properties={properties} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
