import { CalendarDays } from "lucide-react";
import "./ProcedureTwo.css";

const ProcedureTwo = () => {
  return (
    <div className="leave-procedure-two">
      <div>
        <div className="leave-procedure-two-heading">
          <span>2</span>
          <p>Absence Dates & Working Duration</p>
        </div>
        <div className="leave-procedure-two-div">
          <div></div>
          <p className="leave-procedure-two-right-text">
            Auto-calculating work days
          </p>
        </div>
      </div>

      <div>
        <div className="leave-procedure-two-dates">
          <div>
            <p className="leave-procedure-two-date-title">Start Date</p>
            <input className="leave-procedure-two-date-input" type="date" />
            <p className="leave-procedure-two-date-title weight-sm">
              Wednesday (Core hours apply)
            </p>
          </div>
          <div>
            <p className="leave-procedure-two-date-title">End Date</p>
            <input className="leave-procedure-two-date-input" type="date" />
            <p className="leave-procedure-two-date-title weight-sm">
              Wednesday (Return: Nov 20, 2025)
            </p>
          </div>
        </div>

        <div className="leave-procedure-two-details">
          <div className="leave-procedure-two-details-top">
            <div className="leave-procedure-two-deatils-calender">
              <CalendarDays color="blue" />
            </div>
            <div>
              <p className="leave-procedure-two-details-top-heading">
                6 Working Days{" "}
                <span className="leave-procedure-two-highlight">
                  48 Billable Hrs
                </span>
              </p>
              <p className="leave-procedure-two-details-top-desc">
                Excludes corporate weekend (Saturday Nov 15 - Sunday Nov 16)
              </p>
            </div>
          </div>
          <div className="leave-procedure-two-details-bottom">
            <div className="leave-procedure-two-details-bottom-first">
              <p>Full Day</p>
              <p>AM Half</p>
              <p>PM Half</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcedureTwo;
