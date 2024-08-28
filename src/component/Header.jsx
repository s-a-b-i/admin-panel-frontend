import React from 'react';
import { useSelector } from 'react-redux';
import { FiBell, FiMessageSquare, FiSearch, FiMenu } from 'react-icons/fi';

const Header = ({ toggleSidebar }) => {
  const { email, profileImage } = useSelector((state) => state.user);

  return (
    <header className="fixed top-0 right-0 left-0 xl:left-64 bg-white shadow-sm z-20">
      <div className="h-[91px] mx-auto px-4 sm:px-6 xl:px-8">
        <div className="flex justify-between items-center h-full">
          <div className="flex items-center">
            <button
              className="xl:hidden mr-4 text-gray-500 hover:text-gray-700"
              onClick={toggleSidebar}
            >
              <FiMenu size={24} />
            </button>
            <div className="flex flex-col justify-start">
              <h1 className="text-xl font-semibold">Welcome </h1>
              <p className="text-xs font-light text-gray-500">Your Admin Panel</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center bg-[#0075FF1A] rounded-[18px] w-[341px] h-[41px]">
              <FiSearch className="text-[#0075FF] ml-3" size={15} />
              <input
                type="text"
                placeholder="What do you want to find"
                className="bg-transparent w-full px-3 py-2 font-light text-[15px] focus:outline-none text-gray-700"
              />
            </div>

            <div className="w-[42px] h-[42px] flex items-center justify-center bg-[#0075FF14] rounded-full">
              <FiBell className="h-6 w-6 text-gray-400" />
            </div>
            <div className="w-[42px] h-[42px] flex items-center justify-center bg-[#0075FF14] rounded-full">
              <FiMessageSquare className="h-6 w-6 text-gray-400" />
            </div>
            <img
              className="h-[49px] w-[49px] rounded-full"
              src={profileImage || 'https://via.placeholder.com/150'}
              alt="User Avatar"
            />
            <div className="hidden sm:block text-left">
              <p className="text-[16px] font-medium text-black leading-[24px]">
                {email}
              </p>
              <p className="text-[12px] text-gray-500 leading-[18px]">Admin</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;