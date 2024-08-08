"use server";
import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

const deleteMessage = async (messageId) => {
  const { userId } = await getSessionUser();
  if (!userId) throw new Error("Need to sign in before deleteing messages");
  const message = await Message.findById(messageId);
  if (message.recipient.toString() !== userId) {
    throw new Error("Unauthorized");
  }
  await Message.findByIdAndDelete(messageId);
  revalidatePath("/messages", "page");
  return message.read;
};
export default deleteMessage;
