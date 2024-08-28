import React from 'react';
import iconstatuscard1 from '../content/dashboardIcons/iconstatuscard1.svg';
import iconstatuscard2 from '../content/dashboardIcons/iconstatuscard2.svg';
import iconstatuscard3 from '../content/dashboardIcons/iconstatuscard3.svg';
import iconstatuscard4 from '../content/dashboardIcons/iconstatuscard4.svg';

const StatusCard = ({ title, count, color, iconSrc }) => (
  <div className={`w-full max-w-[350px] h-[176px] p-6 rounded-lg ${color} relative flex flex-col justify-between overflow-hidden`}>
    <div>
      <h3 className="font-bold text-white text-lg w-[170px] md:text-xl leading-tight">{title}</h3>
      <p className="text-[40px] font-bold text-white">{count}</p>
    </div>
    <div className="absolute top-[-30px] right-[-30px] w-[136px] h-[136px] rounded-full bg-white bg-opacity-20 flex items-center justify-center">
      <img src={iconSrc} alt={`${title} icon`} className="w-[55px] h-[55px]" />
    </div>
  </div>
);

const StatusCards = () => {
  const cards = [
    { title: 'URGENT & IMPORTANT', count: '20', color: 'bg-red-500', iconSrc: iconstatuscard1 },
    { title: 'NOT URGENT & IMPORTANT', count: '15+', color: 'bg-orange-400', iconSrc: iconstatuscard2 },
    { title: 'URGENT NOT IMPORTANT', count: '200+', color: 'bg-yellow-400', iconSrc: iconstatuscard3 },
    { title: 'NOT URGENT NOT IMPORTANT', count: '10+', color: 'bg-green-400', iconSrc: iconstatuscard4 },
  ];

  return (
    <div className="w-full max-w-[720px] ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {cards.map((card, index) => (
          <StatusCard key={index} {...card} />
        ))}
      </div>
    </div>
  );
};

export default StatusCards;
