import React from "react";
import Sidebar from "../../components/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <div className="ml-10"></div>
      <main>
        <div className="flex">
          <Sidebar />
          <div className="ml-64 p-5">{children}</div>
        </div>
      </main>
    </main>
  );
};

export default DashboardLayout;
