"use server";
import connectDB from "@/config/database";
import { getSessionUser } from "@/utils/getSessionUser";
import User from "@/models/User";

const bookmarkProperty = async (property) => {
  try {
    await connectDB();
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
      return {
        error: "Please sign in to bookmark property",
      };
    }
    const userId = sessionUser.userId;
    const user = await User.findById(userId);
    let isBookmarked = user.bookmarks.includes(property._id);
    let message;
    if (isBookmarked) {
      await User.findByIdAndUpdate(userId, {
        $pull: { bookmarks: property._id },
      });
      message = "Property removed.";
      isBookmarked = false;
    } else {
      await User.findByIdAndUpdate(userId, {
        $push: { bookmarks: property._id },
      });
      message = "Property added";
      isBookmarked = true;
    }
    return {
      message,
      isBookmarked,
    };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};
export default bookmarkProperty;
