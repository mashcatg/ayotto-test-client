import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Upload } from 'lucide-react';
import { toast } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { PiSpinnerBallFill } from "react-icons/pi";

const apiKey = import.meta.env.VITE_ImgBB_api_key;
const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${apiKey}`;

const PostModal = ({ isOpen, onClose, onSubmit, initialData = null }) => {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [fileName, setFileName] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showImage, setShowImage] = useState(true); 
  const [category, setCategory] = useState("question");
  const [isUploading, setIsUploading] = useState(false);
  const modalRef = useRef(null);

  // Initialize form with existing data if editing
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setContent(initialData.content || "");
      setCategory(initialData.category || "question");
      if (initialData.image) {
        setImagePreview(initialData.image);
        setFileName("Current Image");
      }
    } else {
      // Reset form when creating new post
      setTitle("");
      setContent("");
      setCategory("question");
      setImagePreview(null);
      setFileName(null);
    }
  }, [initialData, isOpen]);

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  const handleFileChange = async (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setFileName(file.name);

      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setFileName(null);
      setImagePreview(null);
    }
  };

  const handleRemoveImage = () => {
    setFileName(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!content.trim()) {
      toast.error("Post content cannot be empty");
      return;
    }

    if (!user || !user._id) {
      toast.error("You must be logged in to create a post");
      return;
    }

    try {
      setIsUploading(true);
      
      let postData = {
        title,
        content,
        category,
        author: user._id
      };

      // Only upload new image if it's changed or new
      if (imagePreview && (!initialData || imagePreview !== initialData.image)) {
        // Convert base64 to blob
        const response = await fetch(imagePreview);
        const blob = await response.blob();

        // Create FormData for ImgBB upload
        const formData = new FormData();
        formData.append('image', blob, fileName);

        // Upload to ImgBB
        const imgbbResponse = await axios.post(imageUploadUrl, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        // Extract image URL from ImgBB response
        postData.image = imgbbResponse.data.data.url;
      } else if (initialData?.image && !imagePreview) {
        // Remove image if it was deleted
        postData.image = null;
      } else if (initialData?.image && imagePreview === initialData.image) {
        // Keep existing image if not changed
        postData.image = initialData.image;
      }

      // If editing, include the post ID
      if (initialData?._id) {
        postData._id = initialData._id;
      }

      // Submit post
      await onSubmit(postData);

      // Reset form
      setTitle("");
      setContent("");
      setCategory("question");
      setFileName(null);
      setImagePreview(null);
      setShowImage(true);
      onClose();

      toast.success(initialData ? "Post updated successfully!" : "Post created successfully!");
    } catch (error) {
      console.error("Post operation error:", error);
      toast.error(initialData ? "Failed to update post" : "Failed to create post");
    } finally {
      setIsUploading(false);
    }
  };

  if (!isOpen && !isAnimating) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 p-4 ${isOpen ? "bg-black/30" : "bg-black/0"} transition-all duration-300`}
      onClick={(e) => handleOutsideClick(e)}
    >
      <div
        ref={modalRef}
        className={`bg-white rounded-lg p-6 w-full max-w-md transform ${isOpen ? "scale-100" : "scale-0 opacity-0"} transition-all duration-500 ease-in-out`}
      >
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-lg font-semibold text-center w-full">
            {initialData ? 'Edit Post' : 'Create Post'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl leading-none focus:outline-none"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post title"
            className="w-full p-4 border border-gray-300 rounded-lg mb-4 outline-none"
          />

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full p-4 border border-gray-300 rounded-lg mb-4 outline-none resize-none"
            rows="4"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 w-full border border-gray-200 rounded-md outline-0 mb-4"
          >
            <option value="question">Question</option>
            <option value="announcement">Announcement</option>
            <option value="discussion">Discussion</option>
            <option value="resource">Resource</option>
          </select>

          <div className="border border-gray-200 rounded-md flex items-center justify-center relative h-32 w-full">
            {!imagePreview ? (
              <>
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  onChange={handleFileChange}
                />
                <div className="flex flex-col items-center justify-center text-gray-500">
                  <Upload className="h-8 w-8 mb-2 text-gray-400" />
                  <p className="text-sm">Click to upload an image</p>
                </div>
              </>
            ) : (
              <div className="relative w-full h-full">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-contain"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                >
                  <span className="text-gray-700 text-xs font-bold">&times;</span>
                </button>
                <div
                  className="absolute bottom-0 inset-x-0 bg-black/50 text-white text-xs p-1 text-center truncate"
                >
                  {fileName}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUploading}
              className="px-4 py-2 w-40 text-center flex items-center justify-center bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              {isUploading ? (
                <PiSpinnerBallFill className="text-2xl animate-spin"/>
              ) : initialData ? 'Update Post' : 'Create Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostModal;