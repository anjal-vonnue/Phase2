import { Check } from "lucide-react";
import "./ProcedureThree.css";

const ProcedureThree = () => {
  return (
    <div className="leave-procedure-three">
      <div>
        <div className="leave-procedure-three-heading">
          <span>3</span>
          <p>Delegated Coverage & Handover</p>
        </div>
      </div>
      <div className="delegated-coverage-container">
        <div className="delegated-coverage-details">
          <p>Designated Handover Teammate</p>
          <select>
            <option>David Kim (Staff Design Lead) - Handover ready</option>
          </select>
          <p>
            <Check size={18} />
            slack channel automated reassignment ready
          </p>
        </div>
        <div>
          <img src="./profile.png" width={40} height={40} />
          <div className="delegated-coverage-container-profile">
            <p>David Kim</p>
            <p>Lead Designer • Active</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcedureThree;
