import { Trend } from "../../common.types";
import TrendCard from "./TrendCard";

const TrendList = ({ trends }: { trends: Trend[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {trends.map(trend => (
        <TrendCard key={trend.id} trend={trend} />
      ))}
    </div>
  );
};

export default TrendList;
