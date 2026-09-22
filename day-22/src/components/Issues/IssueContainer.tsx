import { issues } from "../../data/issues";
import EmptyCard from "../EmptyState/EmptyState";
import IssueCard from "./IssueCard";
import "./IssueContainer.css";

const IssueContainer = () => {
  return (
    <>
      <div className="issue-div">
        {issues.length === 0 ? (
          <EmptyCard
            title="There is no Issues"
            message="Currently there are no issues reported"
          />
        ) : (
          issues.map((issue) => <IssueCard key={issue.id} issue={issue} />)
        )}
        {}
      </div>
    </>
  );
};

export default IssueContainer;
