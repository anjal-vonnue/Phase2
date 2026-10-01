import { CalendarDays, Cross, Plane } from "lucide-react";
import "./Dashboard.css";
import RequestLeave from "./RequestLeave";

const LeaveContent = [
  {
    title: "Annual Vacation",
    desc: "Oct 02, 2025 - Oct 04, 2025 • Handover: David Kim",
    days: "3 Working Days",
    status: "Approved",
    type: "umbrella",
  },
  {
    title: "Medical Checkup",
    desc: "Aug 18, 2025 - Aug 18, 2025 • Handover: Julian Rossi",
    days: "1 Working Day",
    status: "Approved",
    type: "health",
  },
  {
    title: "Personal Day",
    desc: "May 22, 2025 - May 24, 2025 • Handover: David Kim",
    days: "2 Working Days",
    status: "Completed",
    type: "home",
  },
  {
    title: "Winter Vacation",
    desc: "Dec 23, 2024 - Dec 30, 2024 • Handover: Maya Lin",
    days: "5 Working Days",
    status: "Completed",
    type: "umbrella",
  },
];

const Dashboard = () => {
  return (
    <div className="main-component-layout">
      <div className="dashboard-layout">
        <div className="dashboard-layout-main">
          <div className="dashboard-header2">
            <div className="dashboard-header2-container">
              <div>
                <div className="dashboard-header2-dot"></div>
                <p>Core Product UX Department</p>
              </div>
              <h3>Welcome back, Sarah Jenkins</h3>
              <p>
                You have{" "}
                <span className="para-highlight">18 Vacation Days</span> and{" "}
                <span className="para-highlight">2 Floating Holidays</span>{" "}
                remaining for 2025.
              </p>
            </div>
            <div className="dashboard2-buttons">
              <button>
                <Cross size={18} />
                Request Time Off
              </button>
              <button>
                <CalendarDays size={18} />
                Team Schedule
              </button>
            </div>
          </div>

          <div className="dashboard2-card-container">
            <div className="dashboard2-card">
              <div>
                <p>UPCOMING ABSENCE</p>
                <Plane />
              </div>
              <div className="dashboard2-content">
                <p>Annual Vacation</p>
                <p>Oct 02, 2025 - Oct 04, 2025</p>
                <div>
                  <div className="dashboard2-dot"></div>
                  <p>Approved (3 days)</p>
                </div>
              </div>
              <div className="dashboard-card-footer">
                <p>Handover: David Kim</p>
                <p>Plan new</p>
              </div>
            </div>

            <div className="dashboard2-card">
              <div>
                <p>UPCOMING ABSENCE</p>
                <Plane />
              </div>
              <div className="dashboard2-content">
                <p>Annual Vacation</p>
                <p>Oct 02, 2025 - Oct 04, 2025</p>
                <div>
                  <div className="dashboard2-dot"></div>
                  <p>Approved (3 days)</p>
                </div>
              </div>
              <div className="dashboard-card-footer">
                <p>Handover: David Kim</p>
                <p>Plan new</p>
              </div>
            </div>

            <div className="dashboard2-card">
              <div>
                <p>UPCOMING ABSENCE</p>
                <Plane />
              </div>
              <div className="dashboard2-content">
                <p>Annual Vacation</p>
                <p>Oct 02, 2025 - Oct 04, 2025</p>
                <div>
                  <div className="dashboard2-dot"></div>
                  <p>Approved (3 days)</p>
                </div>
              </div>
              <div className="dashboard-card-footer">
                <p>Handover: David Kim</p>
                <p>Plan new</p>
              </div>
            </div>
          </div>

          <div className="request-leave-container">
            <div className="request-leave-header">
              <div className="request-leave-header-title">
                <p>Recent Leave Records</p>
                <p>Track Requests submitted during this fiscal quarter</p>
              </div>
              <div>
                <p>View Full Ledger</p>
              </div>
            </div>
            <div className="request-leave-content">
              {LeaveContent.map((item) => (
                <RequestLeave key={item.title} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
