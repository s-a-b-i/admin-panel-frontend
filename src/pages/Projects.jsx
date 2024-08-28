import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaFilter, FaPlus, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Card from '../component/Card';
import CustomDropdown from '../component/CustomDropdown';
import { fields } from '../constants/fields';

const Projects = () => {
  const [filters, setFilters] = useState({
    status: 'All',
    priority: 'All',
  });
  const [allMembers, setAllMembers] = useState([]);
  const [cards, setCards] = useState(fields.reduce((acc, field) => ({ ...acc, [field]: [{ id: Date.now(), field }] }), {}));
  const scrollContainerRefs = useRef({});

  const statuses = ['All', 'Ongoing', 'Completed', 'Canceled', 'Delivered', 'Pending', 'Revision'];
  const priorities = ['All', 'URGENT & IMPORTANT', 'NOT URGENT & IMPORTANT', 'URGENT NOT IMPORTANT', 'NOT URGENT NOT IMPORTANT'];

  useEffect(() => {
    // Fetch all members when the component mounts
    const fetchMembers = async () => {
      // TODO: Replace this with an actual API call
      const mockMembers = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' },
        { id: 3, name: 'Alice Johnson' },
        // Add more mock members as needed
      ];
      setAllMembers(mockMembers);
    };
    fetchMembers();
  }, []);

  const addNewCard = (field) => {
    setCards(prevCards => ({
      ...prevCards,
      [field]: [...prevCards[field], { id: Date.now(), field }]
    }));
  };

  const scroll = (field, direction) => {
    const container = scrollContainerRefs.current[field];
    if (container) {
      const scrollAmount = container.clientWidth;
      container.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1 
      }
    }
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  const deleteCard = (field, cardId) => {
    setCards(prevCards => ({
      ...prevCards,
      [field]: prevCards[field].filter(card => card.id !== cardId)
    }));
  };

  return (
    <motion.div 
      className="projects-container p-2 bg-gray-100 min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          <CustomDropdown
            options={statuses}
            value={filters.status}
            onChange={(value) => setFilters({ ...filters, status: value })}
            placeholder="Select Status"
            className="border border-blue-200 focus:border-blue-500"
          />
          <CustomDropdown
            options={priorities}
            value={filters.priority}
            onChange={(value) => setFilters({ ...filters, priority: value })}
            placeholder="Select Priority"
            className="border border-blue-200 focus:border-blue-500"
          />
        </div>
      </motion.div>

      {fields.map(field => (
        <motion.div 
          key={field} 
          className="field-section mb-8 bg-white rounded-lg shadow-md overflow-hidden"
          variants={itemVariants}
        >
          <div className="header flex justify-between items-center p-4 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-600">
            <h2 className="text-xl font-bold">{field}</h2>
            <button 
              className="text-blue-500 bg-white p-2 rounded-full shadow hover:bg-blue-500 hover:text-white transition"
              onClick={() => addNewCard(field)}
            >
              <FaPlus />
            </button>
          </div>
          <div className="relative">
            {cards[field].length > 3 && (
              <>
                <button 
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow z-10"
                  onClick={() => scroll(field, -1)}
                >
                  <FaChevronLeft />
                </button>
                <button 
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow z-10"
                  onClick={() => scroll(field, 1)}
                >
                  <FaChevronRight />
                </button>
              </>
            )}
            <motion.div 
              className="cards-container p-4 flex overflow-x-auto"
              ref={el => scrollContainerRefs.current[field] = el}
              variants={containerVariants}
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {cards[field].map((card, index) => (
                <div key={card.id} className="flex-shrink-0 w-80 mr-4">
                  <Card 
                    cardId={card.id}
                    field={field} 
                    allMembers={allMembers}
                    deleteCard={() => deleteCard(field, card.id)}
                    isFirstCard={index === 0}
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Projects;