const cloudinary = require("cloudinary").v2;

const uploadImageToCloudinary = async (file, folder, height, quality) => {
  const options = { folder };
  options.resource_type = "auto";

  if (height) {
    options.height = height;
  }
  if (quality) {
    options.quality = quality;
  }

  try {
    // console.log("hellow response >> ", file.tempFilePath);
    const response = await cloudinary.uploader.upload(
      file.tempFilePath,
      options
    );
    // console.log("hellow response >> ", response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  uploadImageToCloudinary,
};
