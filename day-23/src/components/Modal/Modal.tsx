import { useState, type Dispatch, type SetStateAction } from "react";
import {
  type PriorityType,
  type Issue,
  type StatusType,
} from "../../types/types";
import "./Modal.css";
import { IssueSchema } from "../../zodSchema/issueSchema";

export const Modal = ({
  issues,
  setIssues,
  setToggleModal,
}: {
  issues: Issue[];
  setIssues: Dispatch<SetStateAction<Issue[]>>;
  setToggleModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<StatusType>("open");
  const [priority, setPriority] = useState<PriorityType>("high");
  const [assignee, setAssignee] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

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

          <div className="modal-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => setToggleModal(false)}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="submit-btn"
              onClick={(e) => {
                e.preventDefault();
                const result = IssueSchema.safeParse({
                  title,
                  description,
                  status,
                  priority,
                  assignee,
                  dueDate,
                });

                if (!result.success) {
                  console.log(result.error.flatten().fieldErrors);
                  const fieldErrors = result.error.flatten().fieldErrors;
                  setErrors({
                    title: fieldErrors.title?.[0],
                    description: fieldErrors.description?.[0],
                    status: fieldErrors.status?.[0],
                    priority: fieldErrors.status?.[0],
                    assignee: fieldErrors.assignee?.[0],
                    dueDate: fieldErrors.dueDate?.[0],
                  });

                  return;
                }

                setErrors({});

                setIssues([
                  ...issues,
                  {
                    id: crypto.randomUUID(),
                    ...result.data,
                  },
                ]);

                setToggleModal(false);
              }}
            >
              Add Issue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
