import { useState } from "react";

import IssueCard from "./IssueCard";
import "./SingleIssue.css";
import { Modal } from "../Modal/Modal";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import type { Issue } from "../../types/types";
import { useParams } from "react-router";
import useIssue from "../../hooks/useIssue";

const SingleIssue = () => {
  const { id } = useParams<{ id: string }>();

  const { issue, isLoading, error, retry } = useIssue(Number(id));

  const [toggleModal, setToggleModal] = useState(false);
  const [editingIssue, setEditingIssue] = useState<Issue | null>(null);

  useDocumentTitle("Issue | Project Management");

  if (isLoading) {
    return (
      <div className="single-issue-loading">
        <h3>Issue is Loading...</h3>
      </div>
    );
  }
  if (error) {
    return (
      <div className="single-issue-error">
        <h3>Error</h3>
        <p>{error.message}</p>

        <button onClick={retry}>Retry?</button>
      </div>
    );
  }

  if (!issue) {
    return (
      <div className="issue-error-container">
        <h3>Issue Not Found</h3>
        <p>No issue exists with ID: {id}</p>
      </div>
    );
  }

  return (
    <div className="single-issue-page">
      <div className="single-issue-content">
        <IssueCard
          issue={issue}
          setEditingIssue={setEditingIssue}
          setToggleModal={setToggleModal}
        />
      </div>

      {toggleModal && editingIssue && (
        <Modal
          issue={editingIssue}
          setToggleModal={setToggleModal}
          setEditingIssue={setEditingIssue}
          retry={retry}
        />
      )}
    </div>
  );
};

export default SingleIssue;
