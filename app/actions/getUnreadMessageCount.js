"use server";
import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

const getUnreadMessageCount = async () => {
  const { userId } = await getSessionUser();
  if (!userId) {
    throw new Error("Need to sign in");
  }
  await connectDB();
  const count = await Message.countDocuments({
    recipient: userId,
    read: false,
  });
  return count;
};

export default getUnreadMessageCount;
