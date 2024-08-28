import React from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaEdit, FaTrash } from 'react-icons/fa';

const MemberTable = ({ members, onMemberClick, onEditMember, onDeleteMember }) => {
  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="w-full border-collapse bg-white">
        <thead>
          <tr className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-600">
            <th className="p-3 text-left">Profile</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left hidden sm:table-cell">Field</th>
            <th className="p-3 text-left hidden md:table-cell">Sub-field</th>
            <th className="p-3 text-left hidden lg:table-cell">Specialization</th>
            <th className="p-3 text-left hidden xl:table-cell">Experience</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <motion.tr
              key={member.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="border-b hover:bg-gray-50 transition duration-300 ease-in-out"
            >
              <td className="p-3">
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <FaUser className="w-10 h-10 p-2 bg-blue-200 rounded-full text-blue-500" />
                )}
              </td>
              <td className="p-3">
                <button
                  onClick={() => onMemberClick(member)}
                  className="text-blue-500 hover:text-blue-700 transition duration-300 ease-in-out"
                >
                  {member.name}
                </button>
              </td>
              <td className="p-3 hidden sm:table-cell">{member.field}</td>
              <td className="p-3 hidden md:table-cell">{member.subField}</td>
              <td className="p-3 hidden lg:table-cell">{member.specialization}</td>
              <td className="p-3 hidden xl:table-cell">{member.experienceLevel}</td>
              <td className="p-3">
                <button
                  onClick={() => onEditMember(member)}
                  className="text-blue-500 hover:text-blue-700 mr-2 transition duration-300 ease-in-out"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => onDeleteMember(member.id)}
                  className="text-red-500 hover:text-red-700 transition duration-300 ease-in-out"
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

export default MemberTable;
