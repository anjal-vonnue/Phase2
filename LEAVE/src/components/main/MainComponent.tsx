import Overview from "../Overview/Overview";
import TeamSChedule from "../TeamSchedule/TeamSchedule";
import TopBar from "../TopBar/TopBar";
import "./MainComponent.css";
import DashboardHeader from "../../DashboardHeader/DashboardHeader";
import { BookCheck, CalendarX2, Shield, TrendingUp } from "lucide-react";
import BalanceLedger from "../BalanceLedger/BalanceLedger";
import { PastApplication } from "../PastApplications/PastApplication";
import ProcedureOne from "../LeaveProcedure/ProcedureOne";
import ProcedureTwo from "../LeaveProcedure/ProcedureTwo";
import ProcedureThree from "../LeaveProcedure/ProcedureThree";
import ProcedureFour from "../LeaveProcedure/ProcedureFour";

const MainComponent = () => {
  return (
    <div className="main-component-layout">
      <TopBar />
      <div className="dashboard-layout">
        <div className="dashboard-layout-main">
          <DashboardHeader />
          <div className="dashboard-overview">
            <Overview
              heading="ANNUAL VACATION (PTO)"
              days={18}
              totalDays={24}
              lastContent="Accuring 1.67d/mo"
              type="umbrella"
            >
              <TrendingUp size={18} />
            </Overview>
            <Overview
              heading="SICK & MEDICAL"
              days={7}
              totalDays={10}
              lastContent="Fully covered"
              type="bandage"
            >
              <Shield size={18} />
            </Overview>
            <Overview
              heading="FLOATING HOLIDAYS"
              days={2}
              totalDays={3}
              lastContent="Expires Dec 21"
              type="sun"
            >
              <CalendarX2 size={18} />
            </Overview>
            <Overview
              heading="SPECIAL / UNPAID"
              days="On-Demand"
              lastContent="HR approval"
              type="group"
            >
              <BookCheck size={18} />
            </Overview>
          </div>

          <div className="dashboard-split-screen">
            <div className="leave-procedure">
              {/* <div className="leave-procedure-one">
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
              </div> */}
              <ProcedureOne />
              <ProcedureTwo />
              <ProcedureThree />
              <ProcedureFour />
            </div>
            <div className="team-schedule">
              <TeamSChedule />
              <BalanceLedger />
              <PastApplication />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainComponent;
