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
      // headers: {
      //   "Cache-Control": "no-cache",
      //   Pragma: "no-cache",
      //   Expires: "0",
      // },
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
export { fetchProperties, fetchProperty };
