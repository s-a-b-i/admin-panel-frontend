import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { FaUserCircle, FaEnvelope, FaPhone, FaLinkedin, FaTwitter, FaFacebook, FaInstagram, FaCamera, FaUser, FaLock, FaUserShield } from 'react-icons/fa';
import { updateUserProfile } from '../store/slices/userSlice';
import { uploadImageToCloudinary } from '../utils/cloudinaryHelper';

const Profile = () => {
  const dispatch = useDispatch();
  const { email, name, phone, profilePicture, coverPhoto, linkedinProfile, twitterProfile, facebookProfile, instagramProfile, role } = useSelector((state) => state.user);
  
  const [isEditing, setIsEditing] = useState(false);
  const [newEmail, setNewEmail] = useState(email);
  const [newName, setNewName] = useState(name);
  const [newPhone, setNewPhone] = useState(phone);
  const [newLinkedinProfile, setNewLinkedinProfile] = useState(linkedinProfile);
  const [newTwitterProfile, setNewTwitterProfile] = useState(twitterProfile);
  const [newFacebookProfile, setNewFacebookProfile] = useState(facebookProfile);
  const [newInstagramProfile, setNewInstagramProfile] = useState(instagramProfile);
  const [newRole, setNewRole] = useState(role);
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [newCoverImage, setNewCoverImage] = useState(null);

  const handleProfileUpdate = async () => {
    const profileImageUrl = await uploadImageToCloudinary(newProfileImage || profilePicture);
    const coverImageUrl = await uploadImageToCloudinary(newCoverImage || coverPhoto);
    dispatch(updateUserProfile({
      email: newEmail,
      name: newName,
      phone: newPhone,
      linkedinProfile: newLinkedinProfile,
      twitterProfile: newTwitterProfile,
      facebookProfile: newFacebookProfile,
      instagramProfile: newInstagramProfile,
      profilePicture: profileImageUrl,
      coverPhoto: coverImageUrl,
      role: newRole
    }));
    setIsEditing(false);
  };

  const handleProfileImageUpload = (e) => {
    setNewProfileImage(e.target.files[0]);
  };

  const handleCoverImageUpload = (e) => {
    setNewCoverImage(e.target.files[0]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen p-2"
    >
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-72" style={{ boxShadow: '0px 4px 10px 2px rgba(0, 117, 255, 0.11)' }}>
          <img
            src={newCoverImage ? URL.createObjectURL(newCoverImage) : coverPhoto || 'https://via.placeholder.com/1200x400'}
            alt="Cover"
            className="w-full h-full object-cover"
          />
          <label htmlFor="coverImage" className="absolute top-4 right-4 bg-white rounded-full p-3 cursor-pointer shadow-md">
            <FaCamera className="text-gray-700 text-xl" />
          </label>
          <input
            type="file"
            id="coverImage"
            onChange={handleCoverImageUpload}
            className="hidden"
          />
        </div>
        <div className="relative -mt-24 px-8">
          <div className="relative inline-block">
            <img
              src={newProfileImage ? URL.createObjectURL(newProfileImage) : profilePicture || 'https://via.placeholder.com/200x200'}
              alt="Profile"
              className="w-48 h-48 rounded-full border-4 border-white object-cover shadow-lg"
            />
            <label htmlFor="profileImage" className="absolute bottom-2 right-2 bg-blue-500 rounded-full p-2 cursor-pointer shadow-md">
              <FaCamera className="text-white text-lg" />
            </label>
            <input
              type="file"
              id="profileImage"
              onChange={handleProfileImageUpload}
              className="hidden"
            />
          </div>
        </div>
        <div className="p-8">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold mb-6 text-gray-800"
          >
            {isEditing ? (
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full text-4xl font-bold border-b-2 border-gray-300 focus:border-blue-500 outline-none"
              />
            ) : (
              name
            )}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <div>
              {isEditing ? (
                <>
                  <InputField icon={FaUser} value={newName} onChange={setNewName} placeholder="Name" />
                  <InputField icon={FaEnvelope} value={newEmail} onChange={setNewEmail} placeholder="Email" />
                  <InputField icon={FaPhone} value={newPhone} onChange={setNewPhone} placeholder="Phone" />
                  <InputField icon={FaUserShield} value={newRole} onChange={setNewRole} placeholder="Role" />
                </>
              ) : (
                <>
                  <ProfileField icon={FaUser} label="Name" value={name} />
                  <ProfileField icon={FaEnvelope} label="Email" value={email} />
                  <ProfileField icon={FaPhone} label="Phone" value={phone} />
                  <ProfileField icon={FaUserShield} label="Role" value={role} />
                </>
              )}
            </div>
            <div>
              {isEditing ? (
                <>
                  <InputField icon={FaLinkedin} value={newLinkedinProfile} onChange={setNewLinkedinProfile} placeholder="LinkedIn Profile" />
                  <InputField icon={FaTwitter} value={newTwitterProfile} onChange={setNewTwitterProfile} placeholder="Twitter Profile" />
                  <InputField icon={FaFacebook} value={newFacebookProfile} onChange={setNewFacebookProfile} placeholder="Facebook Profile" />
                  <InputField icon={FaInstagram} value={newInstagramProfile} onChange={setNewInstagramProfile} placeholder="Instagram Profile" />
                </>
              ) : (
                <>
                  <ProfileField icon={FaLinkedin} label="LinkedIn" value={linkedinProfile} />
                  <ProfileField icon={FaTwitter} label="Twitter" value={twitterProfile} />
                  <ProfileField icon={FaFacebook} label="Facebook" value={facebookProfile} />
                  <ProfileField icon={FaInstagram} label="Instagram" value={instagramProfile} />
                </>
              )}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8"
          >
            {isEditing ? (
              <button
                onClick={handleProfileUpdate}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium py-3 px-4 rounded-md hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-200 transition duration-300"
              >
                Save Changes
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white font-medium py-3 px-4 rounded-md hover:from-green-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-green-200 transition duration-300"
              >
                Edit Profile
              </button>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const InputField = ({ icon: Icon, value, onChange, placeholder }) => (
  <div className="mb-6 relative">
    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
      <Icon className="text-gray-400 text-xl" />
    </div>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-md focus:border-blue-500 outline-none"
    />
  </div>
);


const ProfileField = ({ icon: Icon, label, value }) => (
  <div className="mb-6 flex items-center">
    <Icon className="text-gray-400 text-xl mr-4" />
    <div className="text-gray-700 text-lg">
      <div className="font-semibold">{label}</div>
      <div>{value}</div>
    </div>
  </div>
);

export default Profile;
