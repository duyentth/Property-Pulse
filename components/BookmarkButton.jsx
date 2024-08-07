"use client";
import React from "react";
import { FaBookmark } from "react-icons/fa";
import { useState, useEffect } from "react";
import checkBookmarkStatus from "@/app/actions/checkBookmarkStatus";
import { useSession } from "next-auth/react";
import Spinner from "./Spinner";
import { toast } from "react-toastify";
import bookmarkProperty from "@/app/actions/bookmarkProperty";

const BookmarkButton = ({ property }) => {
  const propertyId = property._id;
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const handleBookmark = async () => {
    const res = await bookmarkProperty(property);
    if (res.error) {
      toast.error(res.error);
      return;
    }
    toast.success(res.message);
    setIsBookmarked(res.isBookmarked);
  };
  useEffect(() => {
    if (!userId) {
      setIsLoading(false);
      return;
    }
    checkBookmarkStatus(property).then((res) => {
      if (res.error) {
        toast.error(res.error);
      } else {
        setIsBookmarked(res);
      }
      setIsLoading(false);
    });
  }, [property._id, userId, checkBookmarkStatus]);
  if (isLoading) return <Spinner loading={isLoading} />;
  return isBookmarked ? (
    <button
      onClick={handleBookmark}
      className="bg-red-500 hover:red-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="mr-2" />
      Remove Bookmark
    </button>
  ) : (
    <button
      onClick={handleBookmark}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="mr-2" />
      Bookmark Property
    </button>
  );
};

export default BookmarkButton;
