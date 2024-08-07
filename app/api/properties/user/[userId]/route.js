import connectDB from "@/config/database";
import Property from "@/models/Property";

//GET /api/properties/user/:userId
export const GET = async (req, { params }) => {
  try {
    await connectDB();
    const userId = params.userId;
    const properties = await Property.find({ owner: userId });
    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch data", { status: 400 });
  }
};
