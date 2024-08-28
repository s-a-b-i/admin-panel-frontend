import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';
import MeetingCard from '../component/MeetingCard'; // Assuming this is the correct path

const Meetings = () => {
  const [meetingCards, setMeetingCards] = useState([{ id: 'permanent' }]);

  const handleAddMeetingCard = () => {
    setMeetingCards(prevCards => [...prevCards, { id: Date.now() }]);
  };

  const deleteMeetingCard = (cardId) => {
    if (cardId !== 'permanent') {
      setMeetingCards(prevCards => prevCards.filter(card => card.id !== cardId));
    }
  };

  return (
    <motion.div 
      className="meetings-container p-2 bg-gray-100 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="field-section mb-4 bg-white rounded-lg shadow-md overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="header flex justify-between items-center p-4 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-600">
          <h2 className="text-xl font-bold">MEETINGS</h2>
          <button 
            className="text-blue-500 bg-white p-2 rounded-full shadow hover:bg-blue-500 hover:text-white transition"
            onClick={handleAddMeetingCard}
          >
            <FiPlus />
          </button>
        </div>
        <motion.div 
          className="cards-container p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          {meetingCards.map((card) => (
            <MeetingCard 
              key={card.id}
              cardId={card.id}
              deleteCard={() => deleteMeetingCard(card.id)}
              isPermanent={card.id === 'permanent'}
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Meetings;