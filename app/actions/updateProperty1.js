"use server";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import cloudinary from "@/config/cloudinary";

const updateProperty = async (propertyId, formData) => {
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    return new Response("Not authorized", { status: 401 });
  }
  const userId = sessionUser.userId;
  try {
    await connectDB();
    const currentProperty = await Property.findById(propertyId);
    //verify ownership
    if (currentProperty.owner.toString() !== userId) {
      return new Response("Unauthorized", { status: 401 });
    }
    //get new data from Form
    const amenities = formData.getAll("amenities");
    const images = formData.getAll("images").filter((img) => img.name !== "");

    //delete all existing images from cloudinary if user uploads new images list
    if (images[0].size !== 0) {
      // extract public id's from image url in DB
      const publicIds = currentProperty.images.map((imageUrl) => {
        const parts = imageUrl.split("/");
        return parts.at(-1).split(".").at(0);
      });

      // Delete images from Cloudinary
      if (publicIds.length > 0) {
        for (let publicId of publicIds) {
          await cloudinary.uploader.destroy("propertypulse/" + publicId);
        }
      }
    }
    const propertyData = {
      type: formData.get("type"),
      name: formData.get("name"),
      description: formData.get("description"),
      location: {
        street: formData.get("location.street"),
        city: formData.get("location.city"),
        state: formData.get("location.state"),
        zipcode: formData.get("location.zipcode"),
      },

      beds: +formData.get("beds"),
      baths: formData.get("baths"),
      square_feet: formData.get("square_feet"),
      amenities,
      rates: {
        weekly: formData.get("rates.weekly"),
        monthly: formData.get("rates.monthly"),
        nightly: formData.get("rates.nightly"),
      },
      seller_info: {
        name: formData.get("seller_info.name"),
        email: formData.get("seller_info.email"),
        phone: formData.get("seller_info.phone"),
      },
    };

    //Upload image(s) to Cloudinary
    const imageUploadPromises = [];

    for (const image of images) {
      const imageBuffer = await image.arrayBuffer();
      const imageArray = Array.from(new Uint8Array(imageBuffer));
      const imageData = Buffer.from(imageArray);

      // Convert the image data to base64
      const imageBase64 = imageData.toString("base64");

      // Make request to upload to Cloudinary
      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,
        {
          folder: "propertypulse",
        }
      );

      imageUploadPromises.push(result.secure_url);

      // Wait for all images to upload
      const uploadedImages = await Promise.all(imageUploadPromises);
      // Add uploaded images to the propertyData object
      propertyData.images = uploadedImages;
    }
    const updatedProperty = await Property.findByIdAndUpdate(
      propertyId,
      propertyData
    );
  } catch (error) {
    console.log(error);
  }
  revalidatePath("/", "layout");
  redirect(`/properties/${propertyId}`);
};
export default updateProperty;
