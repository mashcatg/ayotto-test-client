import axios from "axios";

const uploadImage = async (file) => {
  try {
    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ems_event_images");

    // Upload to Cloudinary
    const response = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_API}/image/upload`, formData);

    // Return the URL of the uploaded image
    return response.data.secure_url;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Failed to upload image");
  }
};

export default uploadImage;
