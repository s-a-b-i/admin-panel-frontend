import React from 'react';
import { MoreVertical } from 'lucide-react';
import '.././customScrollbar.css';
// D:\Csoft\src\customScrollbar.css

const ActivityItem = ({ day, date, time, title }) => (
  <div className="flex items-start mb-4">
    <div
      className="bg-[#F6F6F6] rounded p-2 mr-3 flex flex-col items-center justify-center"
      style={{ width: '49px', height: '56px', borderRadius: '10px' }}
    >
      <span
        className="block text-center"
        style={{ fontWeight: 500, fontSize: '18px' }}
      >
        {day}
      </span>
      <span
        className="block text-center"
        style={{ fontWeight: 400, fontSize: '13px' }}
      >
        {date}
      </span>
    </div>
    <div className='ml-3 flex-grow'>
      <p className="text-sm text-gray-500">{time}</p>
      <p
        className="font-normal text-[14px] leading-[21px] text-black"
        style={{ maxWidth: '278px', letterSpacing: '0.01em' }}
      >
        {title}
      </p>
    </div>
  </div>
);

const UpcomingActivities = () => {
  const activities = [
    { day: '22', date: 'Tue', time: '12:00 - 03:30pm', title: 'Meeting for developer with developing team' },
    { day: '15', date: 'Wed', time: '2:00 - 02:30pm', title: 'Meeting for new Projects Building discussion' },
    { day: '17', date: 'Mon', time: '4:00 - 01:40pm', title: 'Weekly completed project and overview with tem' },
    // Add more activities here to test scrolling
  ];

  return (
    <div className="bg-white rounded-lg shadow w-full max-w-[392px] h-[332px] pt-[10px] px-[12px] pb-[25px] relative mx-auto flex flex-col" style={{ boxShadow: '0px 0px 10px 2px #0075FF1C' }}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Upcoming Activities</h2>
        <MoreVertical className="text-gray-500" size={20} />
      </div>
      <div className="overflow-y-auto flex-grow custom-scrollbar">
        {activities.map((activity, index) => (
          <div key={index} className="relative">
            {index > 0 && (
              <div
                className="border-t-[1px] border-solid border-[#00000017] mt-[18px] mb-[14px]"
                style={{ width: '100%' }}
              />
            )}
            <ActivityItem {...activity} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingActivities;