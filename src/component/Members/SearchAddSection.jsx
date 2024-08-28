import React from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaUserPlus } from 'react-icons/fa';

const SearchAddSection = ({ searchTerm, setSearchTerm, onAddMember }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex flex-col sm:flex-row items-center gap-4 w-full mb-6"
    >
      <div className="relative flex-grow w-full sm:w-auto mb-4 sm:mb-0">
        <input 
          type="text" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search members..."
          className="w-full p-3 pl-10 border rounded-lg shadow-sm bg-gray-50 border-blue-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
      </div>
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onAddMember}
        className="bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out whitespace-nowrap flex items-center justify-center gap-2 w-full sm:w-auto"
      >
        <FaUserPlus />
        <span>Add Member</span>
      </motion.button>
    </motion.div>
  );
};

export default SearchAddSection;
