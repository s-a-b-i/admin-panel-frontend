import React from 'react';
import { motion } from 'framer-motion';
import { FaFilter } from 'react-icons/fa';
import CustomDropdown from '../CustomDropdown';

const FilterSection = ({ filters, setFilters, fields, subFields, specializations }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full mb-6 bg-gray-50 p-4 rounded-lg shadow-md"
    >
      <div className="flex items-center mb-2 sm:mb-0">
        <FaFilter className="text-blue-500 mr-2" />
        <span className="text-blue-500 font-semibold">Filters:</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
        <CustomDropdown
          options={fields}
          value={filters.field}
          onChange={(value) => setFilters({ ...filters, field: value, subField: '', specialization: '' })}
          placeholder="Select Field"
          className="border border-blue-200 focus:border-blue-500"
        />
        <CustomDropdown
          options={filters.field ? subFields[filters.field] : []}
          value={filters.subField}
          onChange={(value) => setFilters({ ...filters, subField: value, specialization: '' })}
          placeholder="Select Sub-field"
          disabled={!filters.field}
          className="border border-blue-200 focus:border-blue-500"
        />
        <CustomDropdown
          options={filters.field && filters.subField ? specializations : []}
          value={filters.specialization}
          onChange={(value) => setFilters({ ...filters, specialization: value })}
          placeholder="Select Specialization"
          disabled={!filters.subField}
          className="border border-blue-200 focus:border-blue-500"
        />
      </div>
    </motion.div>
  );
};

export default FilterSection;
