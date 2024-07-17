import Property from "@/models/Property";
import connectDB from "@/config/database";

// export const GET = async (request) => {
//   try {
//     await connectDB();
//     console.log("hello");
//     const myProperties = await Property.find({});
//     console.log("myproperties: ", JSON.stringify(myProperties));
//     return new Response(JSON.stringify(myProperties), { status: 200 });
//   } catch (error) {
//     console.log(error);
//     return new Respone("Something went wrong", { status: 500 });
//   }
// };

export const GET = async (request) => {
  try {
    await connectDB();

    const properties = await Property.find({});

    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
