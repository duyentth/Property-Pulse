import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";

export const getSessionUser = async () => {
  try {
    const session = await getServerSession(authOptions);
    return session;
  } catch (error) {
    console.log(error);
    return null;
  }
};
