import { Avatar } from "../Avatar/Avatar";
import { Badge } from "../Badge/Badge";
import "./IssueCard.css";

const IssueCard = () => {
  return (
    <>
      <div className="issue-card">
        <div className="issue-content">
          <Avatar />
          <div className="issue-details">
            <div className="issue-heading">
              <p>Homepage hero calender is partially cropped on desktop</p>
              <Badge>Bug</Badge>
            </div>
            <div className="issue-description">
              <p>#1rerawer</p>
              <p>by anjal</p>
              <p>2d ago</p>
              <p>on Project</p>
            </div>
          </div>
        </div>
        {/* <Avatar /> */}
      </div>
    </>
  );
};

export default IssueCard;
