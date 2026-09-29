import CategoryCard from "../CategoryCard/CategoryCard";
import Overview from "../Overview/Overview";
import TeamSChedule from "../TeamSchedule/TeamSchedule";
import TopBar from "../TopBar/TopBar";
import "./MainComponent.css";

const MainComponent = () => {
  return (
    <div className="main-component-layout">
      <TopBar />
      <div className="dashboard-layout">
        <div className="dashboard-layout-main">
          <div className="dashboard-header">
            <div>
              <div className="dashboard-breadcrumb">
                <p>LEAVE MANAGEMENT</p>
                <p>&gt;</p>
                <p>NEW APPLICATION</p>
                <p></p>
              </div>
              <div>
                <h1>Request Time Off</h1>
                <p>
                  Submit and schedule planned leaves, wellness days, and
                  personal absences.
                </p>
              </div>
            </div>
            <div className="dashboard-header-buttons">
              <div className="dashboard-header-buttons-button">
                <p>My History</p>
              </div>
              <div className="dashboard-header-buttons-button">
                <p>Leave Policy Handbook</p>
              </div>
            </div>
          </div>
          <div className="dashboard-overview">
            <Overview
              heading="ANNUAL VACATION (PTO)"
              days={18}
              totalDays={24}
              lastContent="Accuring 1.67d/mo"
            />
            <Overview
              heading="SICK & MEDICAL"
              days={7}
              totalDays={10}
              lastContent="Fully covered"
            />
            <Overview
              heading="FLOATING HOLIDAYS"
              days={2}
              totalDays={3}
              lastContent="Expires Dec 21"
            />
            <Overview
              heading="SPECIAL / UNPAID"
              days="On-Demand"
              lastContent="HR approval"
            />
          </div>

          <div className="dashboard-split-screen">
            <div className="leave-procedure">
              <div className="leave-procedure-one">
                <div>
                  <div className="leave-procedure-one-heading">
                    <span>1</span>
                    <p>Select Absence Category</p>
                  </div>
                  <p>Policy Tier: Standard Full-Time</p>
                </div>
                <div className="leave-procedure-one-category">
                  <CategoryCard />
                  <CategoryCard />
                  <CategoryCard />
                  <CategoryCard />
                </div>
              </div>
            </div>
            <div className="team-schedule">
              <TeamSChedule />
              <div className="balance-ledger-protection"></div>
              <div className="pass-application"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainComponent;
