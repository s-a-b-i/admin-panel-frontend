import React from 'react';
import { motion } from 'framer-motion';
import { FaTimes, FaUser, FaEnvelope, FaPhone, FaBuilding, FaGraduationCap } from 'react-icons/fa';

const SupervisorDetails = ({ supervisor, onClose }) => {
  if (!supervisor) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 mt-24 bg-black bg-opacity-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gray-50 rounded-lg p-6 max-w-2xl w-full max-h-[70vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-500">Supervisor Details</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="text-blue-500 hover:text-blue-700"
          >
            <FaTimes className="text-xl" />
          </motion.button>
        </div>
        <div className="flex flex-col sm:flex-row items-center mb-6">
          <div className="mb-4 sm:mb-0 sm:mr-6">
            {supervisor.image ? (
              <img src={supervisor.image} alt={supervisor.name} className="w-24 h-24 rounded-full object-cover" />
            ) : (
              <FaUser className="w-24 h-24 p-4 bg-blue-200 rounded-full text-blue-500" />
            )}
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-blue-500">{supervisor.name}</h3>
            <p className="flex items-center mb-1"><FaBuilding className="mr-2 text-blue-500" /> {supervisor.field}</p>
            <p className="flex items-center mb-1"><FaGraduationCap className="mr-2 text-blue-500" /> {supervisor.subField}</p>
            <p className="flex items-center"><FaGraduationCap className="mr-2 text-blue-500" /> {supervisor.specialization}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center">
            <FaEnvelope className="mr-2 text-blue-500" />
            <input 
              type="text" 
              value={supervisor.email || 'N/A'} 
              readOnly 
              className="w-full bg-blue-100 p-2 rounded"
            />
          </div>
          <div className="flex items-center">
            <FaPhone className="mr-2 text-blue-500" />
            <input 
              type="text" 
              value={supervisor.phone || 'N/A'} 
              readOnly 
              className="w-full bg-blue-100 p-2 rounded"
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SupervisorDetails;
