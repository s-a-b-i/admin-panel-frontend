import React from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaEdit, FaTrash } from 'react-icons/fa';

const SupervisorTable = ({ supervisors, onSupervisorClick, onEditSupervisor, onDeleteSupervisor }) => {
  return (
    <div className="overflow-x-auto shadow-md rounded-lg bg-white">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-600">
            <th className="p-3 text-left">Profile</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left hidden sm:table-cell">Field</th>
            <th className="p-3 text-left hidden md:table-cell">Sub-field</th>
            <th className="p-3 text-left hidden lg:table-cell">Specialization</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {supervisors.map(supervisor => (
            <motion.tr
              key={supervisor.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="border-b hover:bg-gray-50 transition duration-300 ease-in-out"
            >
              <td className="p-3">
                {supervisor.image ? (
                  <img src={supervisor.image} alt={supervisor.name} className="w-10 h-10 rounded-full object-cover" />
                ) : (
                  <FaUser className="w-10 h-10 p-2 bg-blue-200 rounded-full text-blue-500" />
                )}
              </td>
              <td className="p-3">
                <button 
                  onClick={() => onSupervisorClick(supervisor)}
                  className="text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out"
                >
                  {supervisor.name}
                </button>
              </td>
              <td className="p-3 hidden sm:table-cell">{supervisor.field}</td>
              <td className="p-3 hidden md:table-cell">{supervisor.subField}</td>
              <td className="p-3 hidden lg:table-cell">{supervisor.specialization}</td>
              <td className="p-3">
                <button 
                  onClick={() => onEditSupervisor(supervisor)}
                  className="text-blue-600 hover:text-blue-800 mr-2 transition duration-300 ease-in-out"
                >
                  <FaEdit />
                </button>
                <button 
                  onClick={() => onDeleteSupervisor(supervisor.id)}
                  className="text-red-600 hover:text-red-800 transition duration-300 ease-in-out"
                >
                  <FaTrash />
                </button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SupervisorTable;
