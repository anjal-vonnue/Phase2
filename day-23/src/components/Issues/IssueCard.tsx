import type { Issue } from "../../types/types";
import { Avatar } from "../Avatar/Avatar";
import { Badge } from "../Badge/Badge";
import "./IssueCard.css";

function isOverdue(date: string) {
  return new Date(date) < new Date();
}

const IssueCard = ({ issue }: { issue: Issue }) => {
  return (
    <>
      <div className="issue-card">
        <div className="issue-content">
          <Avatar />
          <div className="issue-details">
            <div className="issue-heading">
              <p>{issue.title}</p>
            </div>
            <div className="issue-description">
              <p>{issue.description}</p>
              <div className="issue-assignee">
                <p>assigned to: {issue.assignee}</p>
                <Badge variant={issue.status}>{issue.status}</Badge>
                <Badge variant={issue.priority}>{issue.priority}</Badge>
              </div>
            </div>
          </div>
        </div>
        <div className="issue-badges">
          {isOverdue(issue.dueDate) &&
            issue.status !== "resolve" &&
            issue.status !== "closed" && (
              <Badge variant="overdue">Overdue</Badge>
            )}
        </div>
      </div>
    </>
  );
};

export default IssueCard;
