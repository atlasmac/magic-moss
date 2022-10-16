import React from 'react';
import DashboardTable from '../components/DashboardTable';
import CloudinaryProfile from '../components/CloudinaryProfile';

function Dashboard() {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row">
        <CloudinaryProfile />
        <DashboardTable />
      </div>
    </div>
  );
}

export default Dashboard;
