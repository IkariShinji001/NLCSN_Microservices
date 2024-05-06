const cloudinary = require("../middlewares/cloudinary");

class cloudinaryService {
  getImageIdFromSecureUrl = (secure_url) => {
    const publicId = secure_url.substring(
      secure_url.lastIndexOf("/") + 1,
      secure_url.lastIndexOf(".")
    );
    return publicId;
  };

  deleteCloudinaryImage = async (publicId) => {
    await cloudinary.uploader.destroy(publicId);
  };

}


module.exports = new cloudinaryService();