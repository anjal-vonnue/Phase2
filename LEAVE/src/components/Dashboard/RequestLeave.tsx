import { Cross, House, Umbrella } from "lucide-react";

type LeaveItem = {
  title: string;
  desc: string;
  days: string;
  status: string;
  type: string;
};

type RequestProps = {
  item: LeaveItem;
};

const RequestLeave = ({ item }: RequestProps) => {
  function findLogo(type: string) {
    switch (type) {
      case "umbrella": {
        return <Umbrella color="blue" />;
      }

      case "health": {
        return <Cross color="blue" />;
      }

      case "home": {
        return <House color="blue" />;
      }
    }
  }

  return (
    <div className="request-leave-content-card">
      <div className="request-leave-content-content">
        <div className="request-leave-content-left">
          <div className="request-leave-logo">{findLogo(item.type)}</div>
          <div>
            <p className="request-leave-content-title">{item.title}</p>
            <p className="request-leave-content-desc">{item.desc}</p>
          </div>
        </div>
        <div className="request-leave-content-right">
          <p>{item.days}</p>
          <div>
            <div className="request-content-dot"></div>
            <p>{item.status}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestLeave;
