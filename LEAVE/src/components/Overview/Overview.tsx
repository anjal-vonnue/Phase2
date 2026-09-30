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
        return <Umbrella color="blue" />;
      }

      case "bandage": {
        return <Cross color="blue" />;
      }

      case "sun": {
        return <Sun color="green" />;
      }

      case "group": {
        return <UserGroup color="black" />;
      }
    }
  }

  return (
    <div className="overview-card">
      <div className="overview-content">
        <p className="overview-heading">{heading}</p>
        <div>
          {typeof days === "number" ? (
            <span
              className={
                days == 18 ? "overview-number" : "overview-number black-color"
              }
            >
              {days}
            </span>
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
      <div
        className={
          type === "umbrella" || type === "bandage"
            ? "overview-round blue-color"
            : "overview-round"
        }
      >
        <div className="overview-round-inner">{IconType(type)}</div>
      </div>
    </div>
  );
};

export default Overview;
