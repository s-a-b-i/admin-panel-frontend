import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTimes, FaCamera } from 'react-icons/fa';
import '../../customScrollbar.css';
import { uploadImageToCloudinary } from '../../utils/cloudinaryHelper';

const AddMemberForm = ({ onSave, onClose, fields, subFields, specializations, experienceLevels }) => {
  const [newMember, setNewMember] = useState({
    name: '',
    field: '',
    subField: '',
    specialization: '',
    experienceLevel: '',
    email: '',
    phone: '',
    image: '',
  });
  const [previewImage, setPreviewImage] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMember((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
      try {
        const imageUrl = await uploadImageToCloudinary(file);
        setNewMember((prev) => ({ ...prev, image: imageUrl }));
      } catch (error) {
        console.error('Error uploading image:', error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...newMember, id: Date.now() });
    onClose();
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
          <h2 className="text-2xl font-bold text-blue-500">Add New Member</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="text- hover:text-gray-700"
          >
            <FaTimes />
          </motion.button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-center">
            <div className="relative">
              <img
                src={previewImage || newMember.image || 'https://via.placeholder.com/150'}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover"
              />
              <label
                htmlFor="profilePic"
                className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer"
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
              <label className="block mb-2 text-gray-800">Name:</label>
              <input
                type="text"
                name="name"
                value={newMember.name}
                onChange={handleChange}
                className="w-full p-2 border border-blue-200 rounded bg-gray-50"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-gray-800">Field:</label>
              <select
                name="field"
                value={newMember.field}
                onChange={handleChange}
                className="w-full p-2 border border-blue-200 rounded bg-gray-50"
                required
              >
                <option value="">Select Field</option>
                {fields.map((field) => (
                  <option key={field} value={field}>
                    {field}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-gray-800">Sub-field:</label>
              <select
                name="subField"
                value={newMember.subField}
                onChange={handleChange}
                className="w-full p-2 border border-blue-200 rounded bg-gray-50"
                required
                disabled={!newMember.field}
              >
                <option value="">Select Sub-field</option>
                {newMember.field &&
                  subFields[newMember.field].map((subField) => (
                    <option key={subField} value={subField}>
                      {subField}
                    </option>
                  ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-gray-800">Specialization:</label>
              <select
                name="specialization"
                value={newMember.specialization}
                onChange={handleChange}
                className="w-full p-2 border border-blue-200 rounded bg-gray-50"
                required
              >
                <option value="">Select Specialization</option>
                {specializations.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-gray-800">Experience Level:</label>
              <select
                name="experienceLevel"
                value={newMember.experienceLevel}
                onChange={handleChange}
                className="w-full p-2 border border-blue-200 rounded bg-gray-50"
                required
              >
                <option value="">Select Experience Level</option>
                {experienceLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-gray-800">Email:</label>
              <input
                type="email"
                name="email"
                value={newMember.email}
                onChange={handleChange}
                className="w-full p-2 border border-blue-200 rounded bg-gray-50"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-gray-800">Phone:</label>
              <input
                type="tel"
                name="phone"
                value={newMember.phone}
                onChange={handleChange}
                className="w-full p-2 border border-blue-200 rounded bg-gray-50"
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
              className="bg-gray-50 text-gray-700 px-4 py-2 rounded hover:bg-gray-100 mr-2"
            >
              Cancel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Member
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AddMemberForm;
