"use server";
import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

const markMessageAsRead = async (messageId) => {
  const { userId } = await getSessionUser();
  if (!userId) throw new Error("Need to sign in before remarking messages");
  const message = await Message.findById(messageId);
  if (message.recipient.toString() !== userId) {
    throw new Error("Unauthorized");
  }
  message.read = !message.read;
  revalidatePath("/messages", "page");
  await message.save();
  return message.read;
};
export default markMessageAsRead;
