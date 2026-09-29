import { ChevronRight, RotateCcwClock, ShieldCogCorner } from "lucide-react";
import "./DashboardHeader.css";

const DashboardHeader = () => {
  return (
    <div className="dashboard-header">
      <div>
        <div className="dashboard-breadcrumb">
          <p>LEAVE MANAGEMENT</p>
          <ChevronRight size={20} />
          <p>NEW APPLICATION</p>
          <p></p>
        </div>
        <div>
          <h1 id="dashboard-heading">Request Time Off</h1>
          <p id="dashboard-p">
            Submit and schedule planned leaves, wellness days, and personal
            absences.
          </p>
        </div>
      </div>
      <div className="dashboard-header-buttons">
        <div className="dashboard-header-buttons-button">
          <RotateCcwClock color="blue" size={22} />
          <p>My History</p>
        </div>
        <div className="dashboard-header-buttons-button">
          <ShieldCogCorner color="blue" size={22} />
          <p>Leave Policy Handbook</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
