import "./IssueCard.css";

const IssueCard = () => {
  return (
    <>
      <div className="issue-card">
        <div className="issue-content">
          <div>User Avatar</div>
          <div className="issue-details">
            <div className="issue-heading">
              <p>Homepage hero calender is partially cropped on desktop</p>
              <p>Badge</p>
            </div>
            <div className="issue-description">
              <p>#1rerawer</p>
              <p>by anjal</p>
              <p>2d ago</p>
              <p>on Project</p>
            </div>
          </div>
        </div>
        <div>Project Avatar</div>
      </div>
    </>
  );
};

export default IssueCard;
