import { Save, SendHorizontal } from "lucide-react";
import "./ProcedureButtons.css";

const ProcedureButtons = () => {
  return (
    <div className="leave-submit-buttons">
      <div className="leave-draft-buttons">
        <button className="cancel-button">Cancel</button>
        <button className="save-button">
          <Save />
          Save as Draft
        </button>
      </div>
      <button className="submit-button">
        <SendHorizontal />
        Submit Request (6 days)
      </button>
    </div>
  );
};

export default ProcedureButtons;
