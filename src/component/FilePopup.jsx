// src/components/FilePopup.js
import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';

const FilePopup = ({ files, onClose, onDeleteFile }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg w-96 max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Uploaded Files</h2>
        {files.length === 0 ? (
          <p>No files uploaded yet.</p>
        ) : (
          <ul>
            {files.map((file, index) => (
              <li key={index} className="flex justify-between items-center mb-2">
                <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  {file.name}
                </a>
                <button onClick={() => onDeleteFile(index)} className="text-red-500">
                  <FaTrashAlt />
                </button>
              </li>
            ))}
          </ul>
        )}
        <button onClick={onClose} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          Close
        </button>
      </div>
    </div>
  );
};

export default FilePopup;