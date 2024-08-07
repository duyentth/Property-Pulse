"use server";
import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";

const checkBookmarkStatus = async (property) => {
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    return { error: "Please sign in to bookmark property." };
  }
  const user = await User.findById(sessionUser.userId);
  const isBookmarked = user.bookmarks.includes(property._id);
  return isBookmarked;
};
export default checkBookmarkStatus;
