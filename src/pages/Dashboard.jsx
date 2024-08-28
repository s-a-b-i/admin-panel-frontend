// src/pages/Dashboard.jsx
import React from 'react';
import StatusCards from '../component/StatusCards';
import ProgressChart from '../component/ProgressChart';
import Notifications from '../component/Notifications';
import BestPerformance from '../component/BestPerformance';
import UpcomingActivities from '../component/UpcomingActivities';

const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-12 max-w-7xl mx-auto">
        <div className="lg:col-span-2 space-y-6 lg:space-y-8">
          <StatusCards />
          <ProgressChart />
        </div>
        <div className="lg:col-span-1 space-y-6 lg:space-y-8">
          <Notifications />
          <BestPerformance />
          <UpcomingActivities />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
