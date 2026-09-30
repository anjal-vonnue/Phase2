import { CircleCheck, Plane } from "lucide-react";
import "./CategoryCard.css";

const CategoryCard = () => {
  return (
    <div className="leave-procedure-category-card">
      <div>
        <div>
          <Plane />
        </div>
        <div>
          <CircleCheck />
        </div>
      </div>
      <div>
        <p className="leave-procedure-cateogry-heading">Annual Vacation</p>
        <p className="leave-procedure-cateogry-desc">18 days available</p>
      </div>
    </div>
  );
};

export default CategoryCard;
