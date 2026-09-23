import { useState } from "react";
import { issues as FirstIssue } from "../../data/issues";
import EmptyCard from "../EmptyState/EmptyState";
import IssueCard from "./IssueCard";
import "./IssueContainer.css";
import type { Issue, LabelsType } from "../../types/types";
import { Modal } from "../Modal/Modal";
import { availableLabels } from "../../data/labels";

const IssueContainer = () => {
  const [issues, setIssues] = useState<Issue[]>(FirstIssue);
  const [status, setStatus] = useState<string>("all");
  const [priority, setPriority] = useState<string>("all");
  const [assignee, setAssignee] = useState<string>("all");
  const [sort, setSort] = useState<string>("newest");
  const [search, setSearch] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");
  const [label, setLabel] = useState<LabelsType | "all">("all");

  const [toggleModal, setToggleModal] = useState<boolean>(false);

  const filteredIssues = issues.filter((issue) => {
    const matchTitle = issue.title.toLowerCase().includes(search.toLowerCase());
    const matchDescription = issue.description
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchStatus = status === "all" || issue.status === status;
    const matchPriority = priority === "all" || issue.priority === priority;
    const matchAssignee = assignee === "all" || issue.assignee === assignee;
    const matchLabel = label === "all" || issue.labels.includes(label);

    return (
      (matchTitle || matchDescription) &&
      matchStatus &&
      matchPriority &&
      matchAssignee &&
      matchLabel
    );
  });

  const sortedIssues = filteredIssues.sort((a, b) => {
    if (sort === "oldest") {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
    if (sort === "newest") {
      return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
    }

    return 0;
  });

  return (
    <>
      <div className="issue-container">
        <div className="filter-div">
          {/* Issue Search */}
          <p className="issue-search">
            <input
              value={searchInput}
              id="search-input"
              onChange={(e) => {
                setSearchInput(e.target.value);
              }}
            />
            <button
              onClick={() => {
                setSearch(searchInput);
              }}
            >
              Search
            </button>
          </p>

          {/* Status Filter */}
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
            }}
          >
            <option value="all">Status (all)</option>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="resolve">Resolve</option>
            <option value="closed">Closed</option>
          </select>

          {/* Priority Filter */}
          <select
            value={priority}
            onChange={(e) => {
              setPriority(e.target.value);
            }}
          >
            <option value="all">Priority (all)</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          {/* Assignee Filter */}
          <select
            value={assignee}
            onChange={(e) => {
              setAssignee(e.target.value);
            }}
          >
            <option value="all">Assignee (all)</option>
            {issues.map((issue) => (
              <option value={issue.assignee}>{issue.assignee}</option>
            ))}
          </select>

          {/* Label Filter */}
          <select
            value={label}
            onChange={(e) => {
              setLabel(e.target.value as LabelsType);
            }}
          >
            <option value="all">Labels (all)</option>
            {availableLabels.map((label) => (
              <option value={label}>{label}</option>
            ))}
          </select>

          {/* Sort Filter */}
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>

          {/* Clear Button */}
          <button
            id="clear-btn"
            onClick={() => {
              setStatus("all");
              setPriority("all");
              setAssignee("all");
              setSort("newest");
              setSearch("");
              setSearchInput("");
              setLabel("all");
            }}
          >
            Clear Filter
          </button>

          <button
            id="add-btn"
            onClick={() => {
              setToggleModal(!toggleModal);
            }}
          >
            Add Issue
          </button>
        </div>

        <div className="issue-div">
          {sortedIssues.length === 0 ? (
            <EmptyCard
              title="There is no Issues"
              message="Currently there are no issues reported"
            />
          ) : (
            sortedIssues.map((issue) => (
              <IssueCard key={issue.id} issue={issue} />
            ))
          )}
        </div>

        {toggleModal && (
          <Modal
            issues={issues}
            setIssues={setIssues}
            setToggleModal={setToggleModal}
          />
        )}
      </div>
    </>
  );
};

export default IssueContainer;
