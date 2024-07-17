import PropertyCard from "@/components/PropertyCard";
import axios from "axios";
//import { fetchProperties } from "@/utils/requests";

const fetchProperties = async () => {
  try {
    const ret = await axios.get(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/properties`
    );
    if (ret.status !== 200) {
      throw new Error("Failed to fetch");
    }
    return ret.data;
  } catch (error) {
    console.log(error);
  }
};
const PropertiesPage = async () => {
  const properties = await fetchProperties();
  //properties.sort((a, b) => new Date(b.createAt) - new Date(a.createAt));
  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length === 0 ? (
          <p>No property found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertiesPage;
