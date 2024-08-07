import axios from "axios";

const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

//fetch all properties
const fetchProperties = async () => {
  try {
    //Handle the case where the domain is not available yet
    if (!apiDomain) {
      return [];
    }
    const ret = await axios.get(`${apiDomain}/properties`, {
      headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
    if (ret.status !== 200) {
      throw new Error("Failed to fetch");
    }
    return ret.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

//fetch a property
const fetchProperty = async (id) => {
  try {
    //Handle the case where the domain is not available yet
    if (!apiDomain) {
      return null;
    }
    const ret = await axios.get(`${apiDomain}/properties/${id}`);
    if (ret.status !== 200) {
      throw new Error("Failed to fetch");
    }
    return ret.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

//fetch properties that was posted by a specific user
const fetchPropertiesByUserId = async (userId) => {
  try {
    //Handle the case where the domain is not available yet
    if (!apiDomain) {
      return null;
    }
    const ret = await axios.get(`${apiDomain}/properties/user/${userId}`);
    if (ret.status !== 200) {
      throw new Error("Failed to fetch");
    }
    return ret.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const deletePropertyById = async (propertyId) => {
  try {
    //Handle the case where the domain is not available yet
    if (!apiDomain) {
      return null;
    }
    const ret = await axios.delete(`${apiDomain}/properties/${propertyId}`);
    if (ret.status !== 200) {
      throw new Error("Failed to delete property");
    }
    return ret.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export {
  fetchProperties,
  fetchProperty,
  fetchPropertiesByUserId,
  deletePropertyById,
};
