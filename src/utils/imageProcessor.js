import toast from "react-hot-toast";
import uploadImage from "./uploadImage";

// Convert base64 to file object for upload
const base64ToFile = (base64String, filename) => {
  const arr = base64String.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
};

// Process HTML content and replace base64 images with uploaded URLs
export const processHtmlContent = async (htmlContent) => {
  if (!htmlContent) return htmlContent;

  // Create a temporary DOM element to parse the HTML
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlContent;

  // Find all images with base64 sources
  const images = tempDiv.querySelectorAll('img[src^="data:image"]');

  // If no base64 images found, return original content
  if (images.length === 0) return htmlContent;

  // Process each image
  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    const base64Src = img.getAttribute("src");

    try {
      // Convert base64 to file
      const file = base64ToFile(base64Src, `image-${Date.now()}-${i}.jpg`);

      // Upload to cloud storage
      const imageUrl = await uploadImage(file);

      // Replace the base64 source with the new URL
      img.setAttribute("src", imageUrl);
    } catch (error) {
      console.error("Error processing base64 image:", error);
      toast.error("Failed to upload image");
      // If upload fails, we could either keep the base64 or remove the image
      // For now, we will remove the image
      img.remove();
    }
  }

  // Return the updated HTML content
  return tempDiv.innerHTML;
};
