import { Umbrella } from "lucide-react";
import "./PastApplication.css";

export const PastApplication = () => {
  return (
    <div className="team-schedule-impact">
      <div className="team-schedule-impact-heading">
        <div className="teams-schedulce-impact-heading-left">
          <p>Past Applications</p>
        </div>
        <div className="past-app-view-all">View All</div>
      </div>

      <div className="past-app-list-card">
        <div className="past-app-list-right">
          <div className="past-app-image">
            <Umbrella color="green" />
          </div>
          <div className="past-app-title">
            <p>Annual Vacation</p>
            <p>Oct 02, 2025 - Oct 04, 2025 • 3 Days</p>
          </div>
        </div>
        <div className="past-app-status-container">
          <div className="past-app-status">
            <div className="past-app-dot">•</div>
            <p className="past-app-dot">Approved</p>
          </div>
        </div>
      </div>

      <div className="past-app-list-card">
        <div className="past-app-list-right">
          <div className="past-app-image">
            <Umbrella color="green" />
          </div>
          <div className="past-app-title">
            <p>Annual Vacation</p>
            <p>Oct 02, 2025 - Oct 04, 2025 • 3 Days</p>
          </div>
        </div>
        <div className="past-app-status-container">
          <div className="past-app-status">
            <div className="past-app-dot">•</div>
            <p className="past-app-dot">Approved</p>
          </div>
        </div>
      </div>

      <div className="past-app-list-card">
        <div className="past-app-list-right">
          <div className="past-app-image">
            <Umbrella color="green" />
          </div>
          <div className="past-app-title">
            <p>Annual Vacation</p>
            <p>Oct 02, 2025 - Oct 04, 2025 • 3 Days</p>
          </div>
        </div>
        <div className="past-app-status-container">
          <div className="past-app-status">
            <div className="past-app-dot">•</div>
            <p className="past-app-dot">Approved</p>
          </div>
        </div>
      </div>
    </div>
  );
};
