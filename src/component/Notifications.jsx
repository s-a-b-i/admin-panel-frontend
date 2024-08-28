import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NotificationItem from '../utils/NotificationItem'; // Import NotificationItem
import '.././customScrollbar.css'; // Include custom scrollbar if necessary

// Function to generate random notification text
const getRandomText = () => {
  const messages = [
    "John Doe commented on your post.",
    "Jane Smith liked your picture.",
    "Alice Johnson sent you a friend request.",
    "Bob Brown mentioned you in a comment.",
    "Eva Green started following you."
  ];
  return messages[Math.floor(Math.random() * messages.length)];
};

// Function to generate random image URL
const getRandomImage = () => {
  const images = [
    "https://randomuser.me/api/portraits/men/1.jpg",
    "https://randomuser.me/api/portraits/women/1.jpg",
    "https://randomuser.me/api/portraits/men/2.jpg",
    "https://randomuser.me/api/portraits/women/2.jpg",
    "https://randomuser.me/api/portraits/men/3.jpg"
  ];
  return images[Math.floor(Math.random() * images.length)];
};

// Function to generate a random time
const getRandomTime = () => {
  const times = [
    "10:00 AM",
    "11:30 AM",
    "02:00 PM",
    "03:45 PM",
    "05:15 PM"
  ];
  const today = new Date();
  const randomTime = times[Math.floor(Math.random() * times.length)];
  return `${today.toDateString()} | ${randomTime}`;
};

const NotificationList = () => {
  const [currentNotifications, setCurrentNotifications] = useState([
    { id: 1, text: getRandomText(), time: getRandomTime(), imageUrl: getRandomImage() },
    { id: 2, text: getRandomText(), time: getRandomTime(), imageUrl: getRandomImage() },
    { id: 3, text: getRandomText(), time: getRandomTime(), imageUrl: getRandomImage() },
    { id: 4, text: getRandomText(), time: getRandomTime(), imageUrl: getRandomImage() },
    { id: 5, text: getRandomText(), time: getRandomTime(), imageUrl: getRandomImage() },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNotifications((prev) => {
        const newNotification = {
          id: Date.now(),
          text: getRandomText(),
          time: getRandomTime(),
          imageUrl: getRandomImage(),
        };
        return [...prev.slice(1), newNotification];
      });
    }, 5000); // New message every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handleAddNotification = () => {
    const newNotification = {
      id: Date.now(),
      text: getRandomText(),
      time: getRandomTime(),
      imageUrl: getRandomImage(),
    };
    setCurrentNotifications(prevNotifications => [
      newNotification,
      ...prevNotifications.slice(0, 4) // Keep only the latest 5 notifications
    ]);
  };

  const todayNotifications = currentNotifications.slice(0, 3);
  const tomorrowNotifications = currentNotifications.slice(3);

  return (
    <div className="bg-white p-3 rounded-lg shadow w-full max-w-[392px] h-[470px] flex flex-col mx-auto" style={{ boxShadow: '0px 0px 10px 2px #0075FF1C' }}>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-medium">Notification</h2>
          <p className="text-[15px] font-light text-gray-500">Today</p>
        </div>
        <div className="flex space-x-[8px]">
          <button
            onClick={handleAddNotification}
            style={{ backgroundColor: '#0075FF' }}
            className="text-white px-2 py-1 w-[64px] h-[29px] rounded-xl text-[9px] font-medium"
          >
            Add Alert
          </button>
          <button
            style={{
              borderColor: '#0075FF',
              color: '#0075FF',
              borderStyle: 'solid',
            }}
            className="border px-2 py-1 rounded-xl w-[64px] h-[29px] text-[9px]"
          >
            View All
          </button>
        </div>
      </div>
      <div className="flex-grow flex flex-col overflow-hidden">
        {/* Displaying only 3 notifications for Today */}
        <div className="mb-4 flex-grow overflow-hidden">
          <AnimatePresence>
            {todayNotifications.map((notif) => (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <NotificationItem text={notif.text} time={notif.time} imageUrl={notif.imageUrl} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        {/* Displaying only 2 notifications for Tomorrow */}
        <div>
          <p className="text-[15px] font-light text-gray-500 mb-2">Tomorrow</p>
          <AnimatePresence>
            {tomorrowNotifications.map((notif) => (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <NotificationItem text={notif.text} time={notif.time} imageUrl={notif.imageUrl} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default NotificationList;
