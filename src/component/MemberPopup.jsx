import React from 'react';

const MemberPopup = ({ members, onSelect, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 max-w-md w-full max-h-96 overflow-y-auto">
        <h3 className="text-lg font-bold mb-2">Select a Member</h3>
        <ul>
          {members.map((member) => (
            <li
              key={member.id}
              className="cursor-pointer hover:bg-gray-100 p-2 rounded"
              onClick={() => onSelect(member)}
            >
              {member.name}
            </li>
          ))}
        </ul>
        <button
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default MemberPopup;