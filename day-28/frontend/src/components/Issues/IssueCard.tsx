import type { Dispatch, SetStateAction } from "react";
import type { Issue } from "../../types/types";
import { Avatar } from "../Avatar/Avatar";
import { Badge } from "../Badge/Badge";
import "./IssueCard.css";
import { Link } from "react-router";

function isOverdue(date: string) {
  return new Date(date) < new Date();
}

const IssueCard = ({
  issue,
  setEditingIssue,
  setToggleModal,
}: {
  issue: Issue;
  setEditingIssue: Dispatch<SetStateAction<Issue | null>>;
  setToggleModal: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <>
      <div className="issue-card">
        <div className="issue-content">
          <Avatar />
          <Link
            to={`/issues/${issue.id}`}
            className="issue-details"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="issue-heading">
              <p>{issue.title}</p>
            </div>
            <div className="issue-description">
              <p>{issue.description}</p>
              <div className="issue-assignee">
                <p>On Project: {issue.project}</p>
                <p>Assigned to: {issue.assignee}</p>
                <Badge variant={issue.status}>{issue.status}</Badge>
                <Badge variant={issue.priority}>{issue.priority}</Badge>
                {issue.labels.map((label) => (
                  <Badge variant="label" key={label}>
                    {label}
                  </Badge>
                ))}
              </div>
            </div>
          </Link>
        </div>
        <div className="issue-badges">
          {isOverdue(issue.dueDate) &&
            issue.status !== "resolve" &&
            issue.status !== "closed" && (
              <Badge variant="overdue">Overdue</Badge>
            )}
          <button
            onClick={() => {
              setEditingIssue(issue);
              setToggleModal(true);
            }}
          >
            EDIT
          </button>
        </div>
      </div>
    </>
  );
};

export default IssueCard;
