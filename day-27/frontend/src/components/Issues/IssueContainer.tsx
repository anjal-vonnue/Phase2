import { useState } from "react";
import EmptyCard from "../EmptyState/EmptyState";
import IssueCard from "./IssueCard";
import "./IssueContainer.css";
import type { Issue, LabelsType } from "../../types/types";
import { Modal } from "../Modal/Modal";
import { availableLabels } from "../../data/labels";
import useIssues from "../../hooks/useIssues";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const IssueContainer = () => {
  const [status, setStatus] = useState<string>("all");
  const [priority, setPriority] = useState<string>("all");
  const [assignee, setAssignee] = useState<string>("all");
  const [sort, setSort] = useState<string>("newest");
  const [search, setSearch] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");
  const [label, setLabel] = useState<LabelsType | "all">("all");

  const [toggleModal, setToggleModal] = useState<boolean>(false);

  const [editingIssue, setEditingIssue] = useState<Issue | null>(null);
  const [addingIssue, setAddingIssue] = useState<boolean>(false);

  const { issues, setIssues, isLoading, error, retry } = useIssues();
  useDocumentTitle("Issues | Project Management");

  const filteredIssues = issues?.filter((issue) => {
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

  const sortedIssues = [...filteredIssues].sort((a, b) => {
    if (sort === "oldest") {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
    if (sort === "newest") {
      return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
    }

    return 0;
  });

  if (isLoading) {
    return (
      <div className="issue-loading-container">
        <h3>Issues are Loading....</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div className="issue-error-container">
        <h3>Error</h3>
        <p>{error.message}</p>

        <button onClick={retry}>Retry?</button>
      </div>
    );
  }

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
            {issues?.map((issue) => (
              <option value={issue.assignee} key={issue.assignee}>
                {issue.assignee}
              </option>
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
              <option value={label} key={label}>
                {label}
              </option>
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
              setToggleModal((prev) => !prev);
              setAddingIssue((prev) => !prev);
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
              <IssueCard
                key={issue.id}
                issue={issue}
                setEditingIssue={setEditingIssue}
                setToggleModal={setToggleModal}
              />
            ))
          )}
        </div>

        {toggleModal && editingIssue && (
          <Modal
            issue={editingIssue}
            setIssues={setIssues}
            setToggleModal={setToggleModal}
            setEditingIssue={setEditingIssue}
          />
        )}

        {toggleModal && addingIssue && (
          <Modal
            setIssues={setIssues}
            setToggleModal={setToggleModal}
            setAddingIssue={setAddingIssue}
          />
        )}
      </div>
    </>
  );
};

export default IssueContainer;
