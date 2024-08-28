import React from 'react';

// Function to truncate text to the first three words
const truncateText = (text) => {
  const words = text.split(' ');
  return words.length > 3 ? `${words.slice(0, 3).join(' ')}...` : text;
};

const NotificationItem = ({ text, time, imageUrl }) => (
  <div className="flex items-center p-2 rounded-lg bg-white shadow-md mb-2 cursor-pointer" style={{ boxShadow: '0px 0px 10px 2px #0075FF1C' }}>
    <img src={imageUrl} alt="Profile" className="w-10 h-10 rounded-full mr-3" />
    <div className="flex-1">
      <p className="font-semibold truncate">{truncateText(text)}</p>
      <p className="text-gray-500 text-sm truncate">{time}</p>
    </div>
    <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
  </div>
);

export default NotificationItem;
