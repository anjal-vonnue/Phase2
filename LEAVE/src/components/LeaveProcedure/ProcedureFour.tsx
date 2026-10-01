import { CloudUpload, ShieldCheck } from "lucide-react";
import "./ProcedureFour.css";

const ProcedureFour = () => {
  return (
    <div className="leave-procedure-four">
      <div>
        <div className="leave-procedure-four-heading">
          <span>4</span>
          <p>Absence Details & Supporting Documents</p>
        </div>
        <p className="absence-text">Optional for Vacation</p>
      </div>

      <div className="absence-textarea">
        <textarea placeholder="Brief reason or notes for your manager (e.g. Family trip travel contact info, or handover doc links)..." />
        <div className="absence-textarea-desc">
          <p>
            Handover doc: <span>Notion Handover Template</span>
          </p>
          <p>0 / 500 characteres</p>
        </div>
      </div>
      <div className="absence-upload">
        <div className="absence-upload-circle">
          <CloudUpload color="gray" />
        </div>
        <p>
          <span className="absence-highlight">Click to upload file</span>or drag
          and drop
        </p>
        <p>Medical certiciates, or travel proofs (PDF, PNG up to 10MB)</p>
      </div>

      <div className="manager-review">
        <div>
          <ShieldCheck color="blue" />
        </div>
        <div>
          <div className="manager-review-titles">
            <p className="manager-review-heading">Manager Review Workflow</p>
            <div className="manager-review-heading-right">
              <div className="manager-review-dot"></div>
              Avg turnaround: 8 hours
            </div>
          </div>
          <p className="manager-review-heading-bottom">
            Your request will be routed directly to Marcus Vance (VP of
            Product). Upon approval, your calender, Slack status, and payroll
            PTO balance will synchronize automatically.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProcedureFour;
