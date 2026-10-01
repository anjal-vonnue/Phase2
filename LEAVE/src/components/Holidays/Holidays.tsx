import { CalendarPlus } from "lucide-react";
import "./Holidays.css";
import { HolidayCard } from "./HolidayCard";

const HolidayDetails = [
  {
    title: "Thanksgiving Day",
    date: "Thu, Nov 27, 2025",
    desc: "Corporate US headquaters closed. Paid day off.",
    status: "Paid Time Off",
    office: "US Office",
    inDays: "In 60 days",
  },
  {
    title: "Day After Thanksgiving",
    date: "Fri, Nov 28, 2025",
    desc: "Extended holiday weekend for all US full-time staff.",
    status: "Paid Time Off",
    office: "US Office",
    inDays: "In 61 days",
  },
  {
    title: "Chirstmas Eve & day",
    date: "Thu, Dec 25, 2025",
    desc: "Global corporate shutdown. All facilities closed.",
    status: "Paid Time Off",
    office: "All Office",
    inDays: "In 88 days",
  },
  {
    title: "New Year's Day",
    date: "Thu, Jan 1, 2026",
    desc: "Statutory global company wide holiday.",
    status: "Paid Time Off",
    office: "All Office",
    inDays: "In 95 days",
  },
  {
    title: "Martin Luther King Jr. Day",
    date: "Mon, Jan 19, 2026",
    desc: "Fedaral holiday observed across all US offices.",
    status: "Paid Time Off",
    office: "US Office",
    inDays: "In 113 days",
  },
  {
    title: "President's Day",
    date: "Mon, Feb 19, 2026",
    desc: "Corporate holiday observance.",
    status: "Paid Time Off",
    office: "US Office",
    inDays: "In 141 days",
  },
  {
    title: "Memorial Day",
    date: "Mon, May 25, 2026",
    desc: "Summerk kickoff federal holiday.",
    status: "Paid Time Off",
    office: "US Office",
    inDays: "In 239 days",
  },
];

const Holidays = () => {
  return (
    <div className="main-component-layout">
      <div className="dashboard-layout">
        <div className="dashboard-layout-main">
          <div className="holiday-header">
            <div className="holiday-header-title">
              <h1>Official Company Holidays</h1>
              <p>
                Global corporate closures, paid federals observances, and
                regional facility shutdowns
              </p>
            </div>
            <div>
              <button className="holiday-header-button">
                <CalendarPlus size={20} />
                Sync / Download .ics
              </button>
            </div>
          </div>
          <div className="holiday-filter">
            <div>Region: </div>
            <div>All Locations (Global)</div>
            <div>Us Regional Offices</div>
            <div>EMEA Regional Offices</div>
            <div>APAC Regional Offices</div>
          </div>
          <div className="holiday-cards-container">
            {HolidayDetails.map((item) => (
              <HolidayCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Holidays;
