import { Info } from "lucide-react";
import "./TeamSchedule.css";

const TeamSChedule = () => {
  return (
    <div className="team-schedule-impact">
      <div className="team-schedule-impact-heading">
        <div className="teams-schedulce-impact-heading-left">
          <div className="team-schedule-dot"></div>
          <p>Team Schedule Impact</p>
        </div>
        <div className="teams-schedulce-impact-heading-right">83% coverage</div>
      </div>
      <div className="team-schedule-impact-para">
        Checking overlap for{" "}
        <span className="team-schedule-impact-bold">
          Core Product UX (6 members)
        </span>{" "}
        during Nov 12 - 19:
      </div>
      <div className="team-schedule-impact-info">
        <div>
          <Info size={24} color="blue" />
        </div>
        <div>
          <p className="team-schedule-impact-info-para">
            1 teammate away during this window
          </p>
          <p className="team-schedule-impact-info-desc">
            Overlap is well within the 70% minimum threshold. No blackout
            restrictions active.
          </p>
        </div>
      </div>

      <div className="team-schedule-impact-person">
        <div>
          <img src="./profile.png" width={34} />
          <div>
            <p className="team-schedule-impact-person-name">Elene Rostova</p>
            <p className="team-schedule-impact-person-details">
              Annual Leave Nov 12 - 18
            </p>
          </div>
        </div>
        <div id="team-impact-flex">
          <div id="team-schedule-overlap">3d overlap</div>
        </div>
      </div>
      <div className="team-schedule-impact-person">
        <div>
          <img src="./profile.png" width={34} />
          <div>
            <p className="team-schedule-impact-person-name">Julian Rossi</p>
            <p className="team-schedule-impact-person-details">
              Working Remote Nov 12 - 19
            </p>
          </div>
        </div>
        <div id="team-impact-flex">
          <div id="team-schedule-overlap" className="green">
            Available
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamSChedule;
