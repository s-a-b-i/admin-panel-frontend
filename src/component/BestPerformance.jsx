import React from 'react';
import { MoreVertical } from 'lucide-react';

const PerformanceBar = ({ color, outerColor, percentage, users, barWidth, innerBarWidth }) => (
  <div
    className="relative flex items-center h-[23px] rounded-full overflow-hidden ml-2"
    style={{ width: barWidth }}
  >
    <div
      className={`absolute top-0 left-0 h-full ${outerColor}`}
      style={{ width: '100%', height: '23px', borderRadius: '20px' }}
    />
    <div
      className={`absolute top-0 left-0 h-full ${color}`}
      style={{ width: innerBarWidth, height: '23px', borderRadius: '20px' }}
    >
      <div className="absolute top-1/2 left-2 transform -translate-y-1/2 flex -space-x-1">
        {users.map((user, index) => (
          <div
            key={index}
            className="w-[19px] h-[19px] rounded-full overflow-hidden flex items-center justify-center"
          >
            <img
              src={user.imageUrl} // Dynamic image URL
              alt={`User ${index + 1}`}
              className="w-full h-full object-cover"
              style={{ border: 'none' }} // Ensure no border
            />
          </div>
        ))}
      </div>
    </div>
    <div
      className="absolute top-1/2 right-1 transform -translate-y-1/2 bg-black rounded-full flex items-center justify-center"
      style={{ width: '24.48px', height: '14.28px' }}
    >
      <span className="text-white text-[10px] font-bold">{percentage}%</span>
    </div>
  </div>
);

const PerformanceItem = ({ title, users, color, outerColor, percentage, isFirst, marginRight, barWidth, innerBarWidth }) => (
  <div className={`flex items-center mb-4 ${isFirst ? 'mt-[25px]' : 'mt-[26px]'} last:mb-0`}>
    <span 
      className={`text-gray-800 font-medium text-[16px] ${isFirst ? 'whitespace-nowrap' : 'whitespace-normal'} overflow-hidden text-ellipsis`} 
      style={{ marginRight: '10px' }} // Decreased margin
    >
      {title}
    </span>
    <PerformanceBar
      color={color}
      outerColor={outerColor}
      percentage={percentage}
      users={users}
      barWidth={barWidth}
      innerBarWidth={innerBarWidth}
    />
  </div>
);

const BestPerformance = () => {
  const performances = [
    { title: 'PROGRAMMING', users: [
      { imageUrl: 'https://picsum.photos/seed/1/19/19' },
      { imageUrl: 'https://picsum.photos/seed/2/19/19' },
      { imageUrl: 'https://picsum.photos/seed/3/19/19' }
    ], color: 'bg-[#0075FF]', outerColor: 'bg-[#0075FF38]', percentage: 90, isFirst: true, marginRight: '50px', barWidth: '153px', innerBarWidth: '99px' },
    { title: 'UI & UX', users: [
      { imageUrl: 'https://picsum.photos/seed/4/19/19' },
      { imageUrl: 'https://picsum.photos/seed/5/19/19' },
      { imageUrl: 'https://picsum.photos/seed/6/19/19' }
    ], color: 'bg-[#FF6B00]', outerColor: 'bg-[#FF6B0038]', percentage: 75, marginRight: '50px', barWidth: '153px', innerBarWidth: '99px' },
    { title: 'DIGITAL MARKT', users: [
      { imageUrl: 'https://picsum.photos/seed/7/19/19' },
      { imageUrl: 'https://picsum.photos/seed/8/19/19' },
      { imageUrl: 'https://picsum.photos/seed/9/19/19' }
    ], color: 'bg-[#36FFC3]', outerColor: 'bg-[#36FFC338]', percentage: 50, marginRight: '69px', barWidth: '153px', innerBarWidth: '99px' },
    { title: 'CONTENT WRITING', users: [
      { imageUrl: 'https://picsum.photos/seed/10/19/19' },
      { imageUrl: 'https://picsum.photos/seed/11/19/19' },
      { imageUrl: 'https://picsum.photos/seed/12/19/19' }
    ], color: 'bg-[#FF0000]', outerColor: 'bg-[#FF000038]', percentage: 60, marginRight: '30px', barWidth: '123px', innerBarWidth: '85px' },
    { title: 'WORDPRESS DEVELOPER', users: [
      { imageUrl: 'https://picsum.photos/seed/13/19/19' },
      { imageUrl: 'https://picsum.photos/seed/14/19/19' },
      { imageUrl: 'https://picsum.photos/seed/15/19/19' }
    ], color: 'bg-[#9747FF]', outerColor: 'bg-[#5A3FFE38]', percentage: 45, marginRight: '50px', barWidth: '123px', innerBarWidth: '85px' },
  ];

  return (
    <div className="bg-white p-4 rounded-2xl shadow-lg mx-auto sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl" style={{ width: '100%', height: 'auto', maxWidth: '392px', boxShadow: '0px 0px 10px 2px #0075FF1C' }}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-gray-800 font-medium text-[18px]">Best Performance</h2>
        <MoreVertical className="text-gray-500" size={20} />
      </div>
      {performances.map((perf, index) => (
        <PerformanceItem key={index} {...perf} isFirst={index === 0} />
      ))}
    </div>
  );
};

export default BestPerformance;
