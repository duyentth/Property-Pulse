import PropertyEditForm from "@/components/PropertyEditForm1";
import Property from "@/models/Property";
import { convertToSerializeableObject } from "@/utils/convertToObject";

const PropertyEditPage = async ({ params }) => {
  const propertyId = params.id;
  const propertyDoc = await Property.findById(propertyId).lean();
  const property = convertToSerializeableObject(propertyDoc);

  return (
    <section className="bg-blue-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <PropertyEditForm property={property} />
        </div>
      </div>
    </section>
  );
};

export default PropertyEditPage;
