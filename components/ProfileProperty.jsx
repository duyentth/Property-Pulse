"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import deleteProperty from "@/app/actions/deleteProperty";
import { toast } from "react-toastify";

const ProfileProperty = ({ properties: initialProperties }) => {
  const [properties, setProperties] = useState(initialProperties);

  const handleDeleteProperty = async (propertyId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this property?"
    );
    if (!confirmed) return;
    const deletePropertyById = deleteProperty.bind(null, propertyId);
    await deletePropertyById();
    toast.success("Property deleted.");
    const updatedProperties = properties.filter(
      (prop) => prop._id !== propertyId
    );
    setProperties(updatedProperties);
  };
  return properties.map((property, index) => (
    <div className="mb-10" key={index}>
      <Link href={`/properties/${property._id}`}>
        <Image
          className="h-32 w-full rounded-md object-cover"
          src={property.images[0]}
          alt={`Property ${index}`}
          width={0}
          height={0}
          priority={true}
          sizes="100vw"
        />
      </Link>
      <div className="mt-2">
        <p className="text-lg font-semibold">{property.name}</p>
        <p className="text-gray-600">
          {property.location.street}
          {", "}
          {property.location.city}
          {", "}
          {property.location.state} {property.location.zipcode}
        </p>
      </div>
      <div className="mt-2">
        <Link
          href={`/properties/${property._id}/edit`}
          className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
        >
          Edit
        </Link>
        <button
          onClick={() => handleDeleteProperty(property._id)}
          className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
          type="button"
        >
          Delete
        </button>
      </div>
    </div>
  ));
};

export default ProfileProperty;
