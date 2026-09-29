import "./Overview.css";

const Overview = ({
  heading,
  days,
  totalDays,
  lastContent,
}: {
  heading: string;
  days: number | string;
  totalDays?: number;
  lastContent: string;
}) => {
  return (
    <div className="overview-card">
      <div className="overview-content">
        <p>{heading}</p>
        <div>
          <span className="overview-number">{days}</span>

          {totalDays && <span>/ {totalDays} days</span>}
        </div>
        <p>{lastContent}</p>
      </div>
      <div>Logo</div>
    </div>
  );
};

export default Overview;
