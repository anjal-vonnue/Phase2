import "./Badge.css";

export const Badge = ({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant?: string;
}) => {
  return (
    <span className={variant ? `badge badge-${variant}` : `badge`}>
      {children}
    </span>
  );
};
