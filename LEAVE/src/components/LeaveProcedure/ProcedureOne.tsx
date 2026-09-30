import { Bandage, Ellipsis, House, Plane } from "lucide-react";
import CategoryCard from "../CategoryCard/CategoryCard";
import "./ProcedureOne.css";

const ProcedureOne = () => {
  return (
    <div className="leave-procedure-one">
      <div>
        <div className="leave-procedure-one-heading">
          <span>1</span>
          <p>Select Absence Category</p>
        </div>
        <p>Policy Tier: Standard Full-Time</p>
      </div>
      <div className="leave-procedure-one-category">
        <CategoryCard title="Annual Vacation" remaining="18 days available">
          <Plane />
        </CategoryCard>
        <CategoryCard title="Sick & Health" remaining="7 days available">
          <Bandage />
        </CategoryCard>
        <CategoryCard title="Personal / Family" remaining="2 days available">
          <House />
        </CategoryCard>
        <CategoryCard title="Parental / Other" remaining="Approval required">
          <Ellipsis />
        </CategoryCard>
      </div>
    </div>
  );
};

export default ProcedureOne;
