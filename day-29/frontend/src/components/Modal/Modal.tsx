import React, { useState, type Dispatch, type SetStateAction } from "react";
import {
  type PriorityType,
  type Issue,
  type StatusType,
  type LabelsType,
} from "../../types/types";
import "./Modal.css";
import { IssueSchema } from "../../zodSchema/issueSchema";
import { availableLabels } from "../../data/labels";

export const Modal = ({
  setToggleModal,
  setAddingIssue,
  setEditingIssue,
  issue,
  retry,
}: {
  setToggleModal: Dispatch<SetStateAction<boolean>>;
  setAddingIssue?: Dispatch<SetStateAction<boolean>>;
  setEditingIssue?: Dispatch<SetStateAction<Issue | null>>;
  issue?: Issue;
  retry: () => void;
}) => {
  const [title, setTitle] = useState<string>(issue?.title || "");
  const [description, setDescription] = useState<string>(
    issue?.description || "",
  );
  const [status, setStatus] = useState<StatusType>(issue?.status || "open");
  const [priority, setPriority] = useState<PriorityType>(
    issue?.priority || "high",
  );
  const [assignee, setAssignee] = useState<string>(issue?.assignee || "");
  const [dueDate, setDueDate] = useState<string>(issue?.dueDate || "");
  const [labels, setLabels] = useState<LabelsType[]>(issue?.labels || []);
  const [project, setProject] = useState<string>(issue?.project || "");
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

  const [serverError, setServerError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function validateForm(): { data?: Partial<Issue>; success: boolean } {
    const result = IssueSchema.safeParse({
      title,
      description,
      status,
      priority,
      assignee,
      dueDate,
      labels,
      project,
    });

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      console.log(fieldErrors);

      setErrors({
        title: fieldErrors.title?.[0],
        description: fieldErrors.description?.[0],
        status: fieldErrors.status?.[0],
        priority: fieldErrors.priority?.[0],
        assignee: fieldErrors.assignee?.[0],
        dueDate: fieldErrors.dueDate?.[0],
        labels: fieldErrors.labels?.[0],
        project: fieldErrors.project?.[0],
      });

      return { success: false };
    }

    setErrors({});
    return { data: result.data, success: true };
  }

  console.log("mounted", isLoading);

  async function handleSubmit(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    e.preventDefault();
    setServerError(null);
    setIsLoading(true);
    console.log("loading: ", isLoading);

    let methodType: string;
    let url: string;
    if (issue) {
      methodType = "PATCH";
      url = `${import.meta.env.VITE_API_URL}/issues/edit/${issue.id}`;
    } else {
      methodType = "POST";
      url = `${import.meta.env.VITE_API_URL}/issues/create`;
    }

    try {
      const result = validateForm();

      if (!result.success) {
        throw new Error("validation error");
      }

      const response = await fetch(url, {
        method: methodType,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result.data),
      });

      if (!response.ok) {
        throw new Error("Error while Submiting post");
      }
      setToggleModal(false);
      if (setAddingIssue) setAddingIssue(false);
      if (setEditingIssue) setEditingIssue(null);
      retry();
    } catch (error) {
      console.log("error: ", error);

      if (error instanceof Error) {
        setServerError(error);
      } else {
        setServerError(new Error("Failed to edit issue"));
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Add Issue</h2>
        </div>

        <form>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              value={title}
              type="text"
              id="title"
              name="title"
              placeholder="Enter issue title"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />

            {errors.title && <span className="error">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              value={description}
              id="description"
              name="description"
              placeholder="Enter issue description"
              onChange={(e) => setDescription(e.target.value)}
            />
            {errors.description && (
              <span className="error">{errors.description}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value as StatusType)}
            >
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="resolve">Resolve</option>
              <option value="closed">Closed</option>
            </select>
            {errors.status && <span className="error">{errors.status}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              name="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value as PriorityType)}
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            {errors.priority && (
              <span className="error">{errors.priority}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="assignee">Assignee</label>
            <input
              value={assignee}
              type="text"
              id="assignee"
              name="assignee"
              placeholder="Enter assignee"
              onChange={(e) => setAssignee(e.target.value)}
            />
            {errors.assignee && (
              <span className="error">{errors.assignee}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="dueDate">Due Date</label>
            <input
              value={dueDate}
              type="date"
              id="dueDate"
              name="dueDate"
              onChange={(e) => setDueDate(e.target.value)}
            />
            {errors.dueDate && <span className="error">{errors.dueDate}</span>}
          </div>

          <div className="form-group">
            <label>Labels</label>

            <div className="labels-container">
              {availableLabels.map((label) => (
                <label key={label} className="label-option">
                  <input
                    type="checkbox"
                    checked={labels.includes(label)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setLabels((prev) => [...prev, label]);
                      } else {
                        setLabels((prev) =>
                          prev.filter((item) => item !== label),
                        );
                      }
                    }}
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>

            {errors.labels && <span className="error">{errors.labels}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="project">Project</label>
            <input
              value={project}
              type="text"
              id="project"
              name="project"
              placeholder="Enter Project"
              onChange={(e) => setProject(e.target.value)}
            />
            {errors.project && <span className="error">{errors.project}</span>}
          </div>

          {serverError && (
            <span className="error">Error happened retry again</span>
          )}
          <div className="modal-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => {
                setToggleModal(false);
                if (setAddingIssue) setAddingIssue(false);
                if (setEditingIssue) setEditingIssue(null);
              }}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="submit-btn"
              // onClick={(e) => {
              //   e.preventDefault();

              //   const result = validateForm();
              //   if (!result.success || !result.data) return;
              //   const data = result.data;

              //   if (issue) {
              //     setIssues((prev) =>
              //       prev.map((item) => {
              //         if (item.id === issue.id) {
              //           return { ...item, ...data };
              //         } else {
              //           return item;
              //         }
              //       }),
              //     );
              //   } else {
              //     setIssues((prev) => [
              //       ...prev,
              //       {
              //         id: crypto.randomUUID(),
              //         ...data,
              //       } as Issue,
              //     ]);
              //   }

              //   if (setAddingIssue) setAddingIssue(false);
              //   if (setEditingIssue) setEditingIssue(null);
              //   setToggleModal(false);
              // }}

              onClick={handleSubmit}
            >
              {isLoading ? "Loading..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
