import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaFilter, FaPlus, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { FiMoreVertical, FiEdit2 } from 'react-icons/fi';
import { FaTrashAlt } from 'react-icons/fa';
import CustomDropdown from '../component/CustomDropdown';
import { fields } from '../constants/fields';
import { handleMenuAction } from '../utils/menuActions';
import FilePopup from './FilePopup';
import { FiFile, FiUpload, FiCheckCircle, FiTrash2 } from 'react-icons/fi';


const colors = [
  "bg-purple-200", "bg-blue-200", "bg-red-200", "bg-green-200", "bg-yellow-200",
  "bg-pink-200", "bg-indigo-200", "bg-teal-200", "bg-orange-200", "bg-cyan-200"
];
const buttonColors = [
  "bg-purple-500", "bg-blue-500", "bg-red-500", "bg-green-500", "bg-yellow-500",
  "bg-pink-500", "bg-indigo-500", "bg-teal-500", "bg-orange-500", "bg-cyan-500"
];
const memberColors = [
  "bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-purple-500",
  "bg-pink-500", "bg-indigo-500", "bg-teal-500", "bg-orange-500", "bg-cyan-500"
];

const getRandomColor = () => {
  const index = Math.floor(Math.random() * colors.length);
  return { bg: colors[index], button: buttonColors[index], member: memberColors[index] };
};

const Card = ({ cardId, deleteCard, isFirstCard }) => {
  const [title, setTitle] = useState('Project Title');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [supervisors, setSupervisors] = useState([]);
  const [members, setMembers] = useState([]);
  const [supervisorInput, setSupervisorInput] = useState('');
  const [memberInput, setMemberInput] = useState('');
  const [description, setDescription] = useState('');
  const [cardColor, setCardColor] = useState(getRandomColor());
  const [activeMenu, setActiveMenu] = useState(null);
  const [files, setFiles] = useState([]);
  const [showFilePopup, setShowFilePopup] = useState(false);

  const titleInputRef = useRef(null);
  const menuRef = useRef(null); // 



  useEffect(() => {
    if (isEditingTitle) {
      titleInputRef.current.focus();
    }
  }, [isEditingTitle]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  const handleTitleEdit = () => {
    setIsEditingTitle(true);
  };

  const handleTitleSave = () => {
    setIsEditingTitle(false);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleTitleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleTitleSave();
    }
  };

  const handleSupervisorAdd = () => {
    if (supervisorInput) {
      setSupervisors([...supervisors, { name: supervisorInput, color: getRandomColor().member }]);
      setSupervisorInput('');
    }
  };

  const handleMemberAdd = () => {
    if (memberInput) {
      setMembers([...members, { name: memberInput, color: getRandomColor().member }]);
      setMemberInput('');
    }
  };

  const handleSupervisorEdit = (index) => {
    const newName = prompt('Edit Supervisor Name', supervisors[index].name);
    if (newName) {
      const updatedSupervisors = [...supervisors];
      updatedSupervisors[index].name = newName;
      setSupervisors(updatedSupervisors);
    }
  };

  const handleMemberEdit = (index) => {
    const newName = prompt('Edit Member Name', members[index].name);
    if (newName) {
      const updatedMembers = [...members];
      updatedMembers[index].name = newName;
      setMembers(updatedMembers);
    }
  };

  const handleSupervisorDelete = (index) => {
    const updatedSupervisors = supervisors.filter((_, i) => i !== index);
    setSupervisors(updatedSupervisors);
  };

  const handleMemberDelete = (index) => {
    const updatedMembers = members.filter((_, i) => i !== index);
    setMembers(updatedMembers);
  };

  const handleMenuClick = () => {
    setActiveMenu(cardId);
  };

  const handleDeleteFile = (index) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <motion.div
      className={`w-80 h-[400px] p-3 rounded-lg flex flex-col ${cardColor.bg} relative`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Title and Edit */}
      <div className="flex justify-between items-center mb-2">
        {isEditingTitle ? (
          <input
            type="text"
            ref={titleInputRef}
            className="text-base font-bold bg-transparent border-none outline-none w-3/4"
            value={title}
            onChange={handleTitleChange}
            onKeyDown={handleTitleKeyDown}
            onBlur={handleTitleSave}
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
          />
        ) : (
          <div className="flex items-center w-3/4">
            <span className="text-base font-bold">{title}</span>
            <button onClick={handleTitleEdit} className={`ml-2 text-white rounded-full p-1 ${cardColor.button}`}>
              <FiEdit2 size={12} />
            </button>
          </div>
        )}
        <button onClick={handleMenuClick} className={`text-white rounded-full p-1 ${cardColor.button}`}>
          <FiMoreVertical size={12} />
        </button>
      </div>

      {activeMenu === cardId && (
  <div ref={menuRef} className="absolute right-0 top-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
      <button
        onClick={() =>
          handleMenuAction(
            cardId,
            'handleFiles',
            setActiveMenu,
            deleteCard,
            setFiles,
            setShowFilePopup
          )
        }
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
      >
        <FiFile className="inline mr-2" /> Handle Files
      </button>
      <button
        onClick={() =>
          handleMenuAction(
            cardId,
            'upload',
            setActiveMenu,
            deleteCard,
            setFiles,
            setShowFilePopup
          )
        }
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
      >
        <FiUpload className="inline mr-2" /> Upload Files
      </button>
      <button
        onClick={() =>
          handleMenuAction(
            cardId,
            'approval',
            setActiveMenu,
            deleteCard,
            setFiles,
            setShowFilePopup
          )
        }
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
      >
        <FiCheckCircle className="inline mr-2" /> Admin Approval
      </button>
      {!isFirstCard && (
        <button
          onClick={() =>
            handleMenuAction(
              cardId,
              'delete',
              setActiveMenu,
              deleteCard,
              setFiles,
              setShowFilePopup
            )
          }
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
        >
          <FiTrash2 className="inline mr-2" /> Delete Card
        </button>
      )}
    </div>
  </div>
)}


      {/* Add Supervisor Section */}
      <div className="flex flex-col mb-2 flex-grow-0">
        <div className="relative mb-1">
          <input
            type="text"
            placeholder="Add Supervisor"
            className={`w-full p-1 text-sm border rounded-full pr-8 ${cardColor.bg}`}
            value={supervisorInput}
            onChange={(e) => setSupervisorInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSupervisorAdd()}
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
          />
          <button
            onClick={handleSupervisorAdd}
            className={`absolute right-1 top-1/2 transform -translate-y-1/2 text-white rounded-full p-1 ${cardColor.button}`}
          >
            <FaPlus size={12} />
          </button>
        </div>
        <div className="flex flex-col max-h-[60px] overflow-y-auto rounded-lg custom-scrollbar">
          {supervisors.map((supervisor, index) => (
            <div key={index} className="flex justify-between items-center text-xs mb-1">
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-1 ${supervisor.color}`}></div>
                <span className="opacity-70">{supervisor.name}</span>
              </div>
              <div className="flex space-x-1">
                <button onClick={() => handleSupervisorEdit(index)} className={`text-white rounded-full p-1 ${cardColor.button}`}>
                  <FiEdit2 size={10} />
                </button>
                <button onClick={() => handleSupervisorDelete(index)} className={`text-white rounded-full p-1 ${cardColor.button}`}>
                  <FaTrashAlt size={10} />
                </button>
              </div>
            </div>
          ))}
          {supervisors.length === 0 && <div className="text-center text-gray-500 text-xs py-1">No Supervisors</div>}
        </div>
      </div>

      <hr className="border-black my-2" />

      {/* Add Member Section */}
      <div className="flex flex-col mb-2 flex-grow-0">
        <div className="relative mb-1">
          <input
            type="text"
            placeholder="Add Member"
            className={`w-full p-1 text-sm border rounded-full pr-8 ${cardColor.bg}`}
            value={memberInput}
            onChange={(e) => setMemberInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleMemberAdd()}
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
          />
          <button
            onClick={handleMemberAdd}
            className={`absolute right-1 top-1/2 transform -translate-y-1/2 text-white rounded-full p-1 ${cardColor.button}`}
          >
            <FaPlus size={12} />
          </button>
        </div>
        <div className="flex flex-col max-h-[60px] overflow-y-auto rounded-lg custom-scrollbar">
          {members.map((member, index) => (
            <div key={index} className="flex justify-between items-center text-xs mb-1">
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-1 ${member.color}`}></div>
                <span className="opacity-70">{member.name}</span>
              </div>
              <div className="flex space-x-1">
                <button onClick={() => handleMemberEdit(index)} className={`text-white rounded-full p-1 ${cardColor.button}`}>
                  <FiEdit2 size={10} />
                </button>
                <button onClick={() => handleMemberDelete(index)} className={`text-white rounded-full p-1 ${cardColor.button}`}>
                  <FaTrashAlt size={10} />
                </button>
              </div>
            </div>
          ))}
          {members.length === 0 && <div className="text-center text-gray-500 text-xs py-1">No Members</div>}
        </div>
      </div>

      <hr className="border-black my-2" />

      {/* Project Description */}
      <textarea
        placeholder="Project Description"
        className={`w-full h-24 p-2 text-sm border rounded-lg flex-grow mb-2 ${cardColor.bg}`}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
      />
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`w-full text-white py-2 text-sm rounded-full ${cardColor.button}`}
      >
        Save
      </motion.button>
      
      {showFilePopup && (
        <FilePopup
          files={files}
          onClose={() => setShowFilePopup(false)}
          onDeleteFile={handleDeleteFile}
        />
      )}
    </motion.div>
  );
};

export default Card;