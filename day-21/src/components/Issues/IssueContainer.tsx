import { issues } from "../../data/issues";
import IssueCard from "./IssueCard";
import "./IssueContainer.css";

const IssueContainer = () => {
  return (
    <>
      <div className="issue-div">
        {issues.map((issue) => (
          <IssueCard key={issue.id} issue={issue} />
        ))}
      </div>
    </>
  );
};

export default IssueContainer;
