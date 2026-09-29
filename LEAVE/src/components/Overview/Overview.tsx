import React from "react";
import "./Overview.css";
import { Cross, Sun, Umbrella, UserGroup } from "lucide-react";

const Overview = ({
  children,
  heading,
  days,
  totalDays,
  lastContent,
  type,
}: {
  children: React.ReactNode;
  heading: string;
  days: number | string;
  totalDays?: number;
  lastContent: string;
  type: string;
}) => {
  function IconType(type: string) {
    switch (type) {
      case "umbrella": {
        return <Umbrella />;
      }

      case "bandage": {
        return <Cross />;
      }

      case "sun": {
        return <Sun />;
      }

      case "group": {
        return <UserGroup />;
      }
    }
  }

  return (
    <div className="overview-card">
      <div className="overview-content">
        <p className="overview-heading">{heading}</p>
        <div>
          {typeof days === "number" ? (
            <span className="overview-number">{days}</span>
          ) : (
            <span className="overview-text">{days}</span>
          )}

          {totalDays && (
            <span className="overview-number-total">/ {totalDays} days</span>
          )}
        </div>
        <p
          className={
            lastContent === "Accuring 1.67d/mo"
              ? "overview-last green"
              : lastContent === "Expires Dec 21"
                ? "overview-last red"
                : "overview-last "
          }
        >
          {children}
          {lastContent}
        </p>
      </div>
      <div className="overview-round">{IconType(type)}</div>
    </div>
  );
};

export default Overview;
