import { PartyPopper } from "lucide-react";

type HolidayType = {
  title: string;
  date: string;
  desc: string;
  status: string;
  office: string;
  inDays: string;
};

type PropType = {
  item: HolidayType;
};

export const HolidayCard = ({ item }: PropType) => {
  return (
    <div className="holiday-card">
      <div>
        <div className="holiday-card-title">
          <div className="holiday-card-logo">
            <PartyPopper color="blue" />
          </div>
          <div>
            <p className="holiday-card-days">{item.inDays}</p>
          </div>
        </div>
        <div className="holiday-card-content">
          <h3>{item.title}</h3>
          <p>{item.date}</p>
          <p>{item.desc}</p>
        </div>
      </div>
      <div className="holiday-card-footer">
        <div className="holiday-card-left">
          <div className="holiday-card-left-dot"></div>
          <p>{item.status}</p>
        </div>
        <p className="holiday-card-right">{item.office}</p>
      </div>
    </div>
  );
};
