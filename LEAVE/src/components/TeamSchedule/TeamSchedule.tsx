import "./TeamSchedule.css";

const TeamSChedule = () => {
  return (
    <div className="team-schedule-impact">
      <div className="team-schedule-impact-heading">
        <div>
          <span>O</span>
          <p>Team Schedule Impact</p>
        </div>
        <div>83% impact</div>
      </div>
      <p>
        Checking overlap for Core Product UX (6 members) during Nov 12 - 19:
      </p>
      <div className="team-schedule-impact-info">
        <div>i</div>
        <div>
          <p>1 teammate away during this window</p>
          <p>
            Overlap is well within the 70% minimum threshold. No blackout
            restrictions active.
          </p>
        </div>
      </div>

      <div className="team-schedule-impact-person">
        <div>
          <div>image</div>
          <div>
            <p>Elene Rostova</p>
            <p>Annual Leave Nov 12 - 18</p>
          </div>
        </div>
        <div>
          <div>3d overlap</div>
        </div>
      </div>
      <div className="team-schedule-impact-person">
        <div>
          <div>image</div>
          <div>
            <p>Julian Rossi</p>
            <p>Working Remote Nov 12 - 19</p>
          </div>
        </div>
        <div>
          <div>Available</div>
        </div>
      </div>
    </div>
  );
};

export default TeamSChedule;
