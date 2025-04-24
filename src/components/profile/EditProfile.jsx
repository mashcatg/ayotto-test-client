import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import { TbEdit } from "react-icons/tb";
import { RiUpload2Fill } from "react-icons/ri";
import toast from "react-hot-toast";
import uploadImage from "../../utils/uploadImage";

const EditProfile = () => {
  const { user } = useAuth();
  const axios = useAxios();
  const queryClient = useQueryClient();
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [institute, setInstitute] = useState("");

  // Profile data query
  const { data: profileData, isLoading } = useQuery({
    queryKey: ['profile', user?._id],
    enabled: !!user?._id,
    queryFn: async () => {
      const { data } = await axios.get(`/user/profile/${user?._id}`);
      return data.data;
    }
  });
  console.log(profileData , "profileData");

  // Profile update mutation
  const { mutate: updateProfile } = useMutation({
    mutationFn: async (updateData) => {
      const response = await axios.put(`/user/profile/edit`, updateData);
      return response.data;
    },
    onSuccess: () => {
      toast.success('Profile updated successfully');
      queryClient.invalidateQueries(['profile', user?._id]);
      setImageFile(null);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || 'Failed to update profile');
    }
  });

  useEffect(() => {
    if (profileData) {
      setImagePreview(profileData.avatar);
      setInstitute(profileData.instituteName || "");
    }
  }, [profileData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      toast.error("Please upload a JPG or PNG image");
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size should not exceed 2MB");
      return;
    }

    setImageFile(file);

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      let avatarUrl = profileData?.avatar;

      // Upload new image if selected
      if (imageFile) {
        setIsImageUploading(true);
        try {
          avatarUrl = await uploadImage(imageFile);
        } catch (error) {
          console.error("Error uploading image:", error);
          toast.error("Failed to upload image");
          return;
        } finally {
          setIsImageUploading(false);
        }
      }

      // Update profile with new data
      updateProfile({
        avatar: avatarUrl,
        instituteName: institute
      });

    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-[#EDF0FF] p-8 rounded-md">
      <div>
        <div className="flex items-center gap-x-[2px]">
          <TbEdit size={30} />
          <h2 className="text-3xl font-medium">Edit Profile</h2>
        </div>
        <div className="flex flex-col justify-center items-center">
          {/* Image preview with loading state */}
          <div className="relative">
            <img
              className="w-[150px] h-[150px] rounded-full border-3 border-[#836FFF] object-cover"
              src={imagePreview || profileData?.avatar}
              alt="profile"
            />
            {isImageUploading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-white"></div>
              </div>
            )}
          </div>
          <div>
            <label
              htmlFor="imageUpload"
              className="flex w-full items-center justify-center mt-3 gap-x-2 bg-[#A0B1FE] py-[5px] px-[10px] rounded-md text-black cursor-pointer"
            >
              <RiUpload2Fill size={16} />
              <span className="text-[16px]">Change Photo</span>
            </label>
            <input
              type="file"
              name="image"
              id="imageUpload"
              className="hidden"
              onChange={handleImageChange}
              accept="image/*"
            />
          </div>
        </div>
        {/* Rest of your form code ... */}
        <form onSubmit={handleSubmit} className="space-y-3 mt-6">
          <div className="space-y-[6px]">
            <p className="text-xl font-semibold text-black">Name</p>
            <input
              type="text"
              defaultValue={profileData?.name}
              className="w-full rounded-sm bg-[#D7E2FA] outline-none cursor-not-allowed py-3 px-6 text-[16px]"
              disabled
            />
          </div>
          <div className="space-y-[6px]">
            <p className="text-xl font-semibold text-black">Phone</p>
            <input
              type="text"
              defaultValue={`${0}${profileData?.phone || ''}`}
              className="w-full rounded-sm bg-[#D7E2FA] outline-none cursor-not-allowed py-3 px-6 text-[16px]"
              disabled
            />
          </div>
          <div className="space-y-[6px]">
            <p className="text-xl font-semibold text-black">Institute</p>
            <input
              type="text"
              value={institute}
              onChange={(e) => setInstitute(e.target.value)}
              className="w-full rounded-sm bg-white outline-none py-3 px-6 text-[16px]"
              placeholder="Institute Name"
            />
          </div>
          <div className="space-y-[6px]">
            <p className="text-xl font-semibold text-black">Batch</p>
            <input
              type="text"
              defaultValue={profileData?.batch}
              className="w-full rounded-sm bg-[#D7E2FA] outline-none cursor-not-allowed py-3 px-6 text-[16px]"
              disabled
            />
          </div>
          <div className="space-y-[6px]">
            <p className="text-xl font-semibold text-black">Group</p>
            <input
              type="text"
              defaultValue={profileData?.group}
              className="w-full rounded-sm bg-[#D7E2FA] outline-none cursor-not-allowed py-3 px-6 text-[16px]"
              disabled
            />
          </div>
          <button 
            type="submit"
            className="bg-[#B7C4FF] text-[#00005A] transition duration-300 hover:bg-[#a4b4fa] py-2 md:py-3 px-4 md:px-6 rounded-sm w-full"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
