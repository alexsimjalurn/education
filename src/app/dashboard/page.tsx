import React from 'react';

/**
 * Dashboard Page
 */
export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-foreground">Dashboard</h1>
      <div className="layout-grid">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2 text-foreground">
            My Courses
          </h2>
          <p className="text-secondary-600">View your enrolled courses</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2 text-foreground">
            Progress
          </h2>
          <p className="text-secondary-600">Track your learning progress</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2 text-foreground">
            Achievements
          </h2>
          <p className="text-secondary-600">
            Your earned badges and certificates
          </p>
        </div>
      </div>
    </div>
  );
}

