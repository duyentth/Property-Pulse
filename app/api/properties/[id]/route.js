import Property from "@/models/Property";
import connectDB from "@/config/database";
import { getSessionUser } from "@/utils/getSessionUser";
import cloudinary from "@/config/cloudinary";
import { toast } from "react-toastify";

//GET /api/properties/:id
export const GET = async (request, { params }) => {
  try {
    await connectDB();

    const property = await Property.findById(params.id);
    if (!property) {
      return new Response("Property not found", { status: 404 });
    }
    return new Response(JSON.stringify(property), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};

//DELETE /api/properties/:id
export const DELETE = async (request, { params }) => {
  try {
    const propertyId = params.id;
    const sessionUser = await getSessionUser();
    const userId = sessionUser?.user?.id;
    if (!sessionUser || !userId) {
      return new Response("Unauthorized", { status: 401 });
    }
    await connectDB();
    const property = await Property.findById(propertyId);
    if (!property) {
      return new Response("Property not found", { status: 404 });
    }
    //verify ownership
    if (property.owner.toString() !== userId) {
      return new Response("Unauthorized", { status: 401 });
    }
    //extract public id from image url in DB
    const publicIds = property.images.map((imageUrl) => {
      const parts = imageUrl.split("/");
      return parts.at(-1).split(".").at(0);
    });

    //delete images from Cloudinary
    if (publicIds.length > 0) {
      for (let publicId of publicIds) {
        await cloudinary.uploader.destroy("propertypulse/" + publicId);
      }
    }
    //delete property from DB
    await Property.deleteOne({ _id: propertyId });
    return new Response("Property Deleted", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};

//PUT /api/properties/:id
// export const PUT = async (request, { params }) => {
//   console.log(here);
//   const session = await getSessionUser();
//   if (!session || !session.user.id) {
//     return new Response("Not authorized", { status: 401 });
//   }
//   const userId = session.user.id;
//   const propertyId = params.id;

//   try {
//     await connectDB();
//     const currentProperty = await Property.findById(propertyId);
//     //verify ownership
//     if (currentProperty.owner.toString() !== userId) {
//       return new Response("Unauthorized", { status: 401 });
//     }
//     //get new data from Form
//     const formData = await request.formData();
//     const amenities = formData.getAll("amenities");
//     const images = formData.getAll("images").filter((img) => img.name !== "");
//     const propertyData = {
//       type: formData.get("type"),
//       name: formData.get("name"),
//       description: formData.get("description"),
//       location: {
//         street: formData.get("location.street"),
//         city: formData.get("location.city"),
//         state: formData.get("location.state"),
//         zipcode: formData.get("location.zipcode"),
//       },

//       beds: +formData.get("beds"),
//       baths: formData.get("baths"),
//       square_feet: formData.get("square_feet"),
//       amenities,
//       rates: {
//         weekly: formData.get("rates.weekly"),
//         monthly: formData.get("rates.monthly"),
//         nightly: formData.get("rates.nightly"),
//       },
//       seller_info: {
//         name: formData.get("seller_info.name"),
//         email: formData.get("seller_info.email"),
//         phone: formData.get("seller_info.phone"),
//       },
//     };

//     // Upload image(s) to Cloudinary
//     const imageUploadPromises = [];

//     for (const image of images) {
//       const imageBuffer = await image.arrayBuffer();
//       const imageArray = Array.from(new Uint8Array(imageBuffer));
//       const imageData = Buffer.from(imageArray);

//       // Convert the image data to base64
//       const imageBase64 = imageData.toString("base64");

//       // Make request to upload to Cloudinary
//       const result = await cloudinary.uploader.upload(
//         `data:image/png;base64,${imageBase64}`,
//         {
//           folder: "propertypulse",
//         }
//       );

//       imageUploadPromises.push(result.secure_url);

//       // Wait for all images to upload
//       const uploadedImages = await Promise.all(imageUploadPromises);
//       // Add uploaded images to the propertyData object
//       propertyData.images = uploadedImages;
//     }
//     await Property.findByIdAndUpdate(propertyId, propertyData);

//     toast.success("Property updated.");
//     return Response.redirect(`/properties/${propertyId}`);
//   } catch (error) {
//     console.log(error);
//     return new Response("Failed to add property", { status: 500 });
//   }
// };
