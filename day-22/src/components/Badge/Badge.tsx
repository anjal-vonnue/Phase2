import type { PriorityType, StatusType } from "../../types/types";
import "./Badge.css";

export const Badge = ({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant?: StatusType | PriorityType | "tags" | "overdue";
}) => {
  return (
    <span className={variant ? `badge badge-${variant}` : `badge`}>
      {children}
    </span>
  );
};
