import { CircleCheck } from "lucide-react";
import "./CategoryCard.css";
import type React from "react";
import { useState } from "react";

const CategoryCard = ({
  children,
  title,
  remaining,
}: {
  children: React.ReactNode;
  title: string;
  remaining: string;
}) => {
  const [active, setActive] = useState<boolean>(false);

  function handleClick() {
    setActive((prev) => !prev);
  }

  return (
    <div
      className={
        active
          ? "leave-procedure-category-card active-border"
          : "leave-procedure-category-card"
      }
      onClick={handleClick}
    >
      <div>
        <div className="logo-container">{children}</div>
        <div>{active && <CircleCheck />}</div>
      </div>
      <div>
        <p className="leave-procedure-cateogry-heading">{title}</p>
        <p className="leave-procedure-cateogry-desc">{remaining}</p>
      </div>
    </div>
  );
};

export default CategoryCard;
