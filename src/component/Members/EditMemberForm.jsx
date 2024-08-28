import React, { useState } from "react";
import { FaTimes, FaCamera } from "react-icons/fa";
import { motion } from "framer-motion";
import "../../customScrollbar.css"; // Ensure you import your custom scrollbar CSS
import { uploadImageToCloudinary } from "../../utils/cloudinaryHelper";

const EditMemberForm = ({ member, onSave, onClose }) => {
  const [editedMember, setEditedMember] = useState(member);
  const [previewImage, setPreviewImage] = useState(member.image);
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedMember((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = async () => {
        setPreviewImage(reader.result);
        try {
          const imageUrl = await uploadImageToCloudinary(file);
          setEditedMember((prev) => ({ ...prev, image: imageUrl }));
        } catch (error) {
          console.error("Error uploading image:", error);
          // Handle error (e.g., show error message to user)
        } finally {
          setIsUploading(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedMember);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gray-50 rounded-lg p-6 max-w-3xl w-full max-h-[60vh] overflow-y-auto custom-scrollbar"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-blue-500">Edit Member</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="text-blue-500 hover:text-blue-600"
          >
            <FaTimes />
          </motion.button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <img
                src={previewImage || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border border-blue-200"
              />
              <label
                htmlFor="profilePic"
                className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600"
              >
                <FaCamera />
                <input
                  type="file"
                  id="profilePic"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                  disabled={isUploading}
                />
              </label>
              {isUploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
                  Uploading...
                </div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block mb-2 text-blue-500">Name:</label>
              <input
                type="text"
                name="name"
                value={editedMember.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded "
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-blue-500">Field:</label>
              <input
                type="text"
                name="field"
                value={editedMember.field}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded "
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-blue-500">Sub-field:</label>
              <input
                type="text"
                name="subField"
                value={editedMember.subField}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded "
                required
                disabled={!editedMember.field}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-blue-500">
                Specialization:
              </label>
              <input
                type="text"
                name="specialization"
                value={editedMember.specialization}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded "
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-blue-500">
                Experience Level:
              </label>
              <input
                type="text"
                name="experienceLevel"
                value={editedMember.experienceLevel}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded "
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-blue-500">Email:</label>
              <input
                type="email"
                name="email"
                value={editedMember.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded "
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-blue-500">Phone:</label>
              <input
                type="tel"
                name="phone"
                value={editedMember.phone}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded "
                required
              />
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={onClose}
              className="bg-blue-100 text-blue-500 px-4 py-2 rounded hover:bg-blue-200 mr-2"
            >
              Cancel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Save Changes
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default EditMemberForm;
