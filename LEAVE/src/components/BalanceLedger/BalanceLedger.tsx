import { Calculator, Info } from "lucide-react";
import "./BalanceLedget.css";

const BalanceLedger = () => {
  return (
    <div className="team-schedule-impact">
      <div className="team-schedule-impact-heading">
        <div className="teams-schedulce-impact-heading-left">
          <Calculator size={20} color="blue" />
          <p>Balance Ledger Projection</p>
        </div>
      </div>
      <div className="team-schedule-impact-para balance-ledger-content">
        Current Available PTO
        <p className="balance-ledger-content-font black">18.0 Days</p>
      </div>
      <div className="team-schedule-impact-para balance-ledger-content">
        <p className="red">This Request Deduction</p>{" "}
        <p className="balance-ledger-content-font red">-6.0 Days</p>
      </div>

      <div className="team-schedule-impact-para balance-ledger-content border">
        <p className="balance-ledger-content-font-heading">
          Estimated Post-Approval
        </p>{" "}
        <p className="balance-ledger-content-font-estimate red">12 Days</p>
      </div>

      <div className="team-schedule-impact-info">
        <div>
          <Info size={24} color="blue" />
        </div>
        <div>
          <p className="balance-ledger-content-desc">
            Monthly accrual credit of <span className="bold">+1.67 days</span>{" "}
            will be posted on <span className="bold">Dec 1, 2025</span>. Total
            year-end carryover limit is 5.0 days.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BalanceLedger;
