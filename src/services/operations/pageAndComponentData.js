import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { catalogData } from "../api";

const { CATALOGPAGEDATA_API } = catalogData;

export const getCatalogPageData = async (categoryId) => {
  const toastId = toast.loading("Loading");
  var result = [];
  try {
    const response = await apiConnector(
      "POST",
      CATALOGPAGEDATA_API,
      categoryId
    );

    if (!response?.data?.success)
      throw new Error("Could not Fetch Category page data");

    result = response?.data?.data;
  } catch (error) {
    console.log("CATALOG PAGE DATA API ERROR....", error);
    toast.error(error.message);
  }

  toast.dismiss(toastId);
  // console.log(result);
  return result;
};
