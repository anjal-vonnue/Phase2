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
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
      </div>
    </div>
  );
};

export default ProcedureOne;
