import { motion } from "framer-motion";
import { Trend } from "../../common.types";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const TrendCard = ({ trend }: { trend: Trend }) => {
  const pieData = [
    { name: "Конверсия", value: trend.growthRate },
    { name: "Остальное", value: 100 - trend.growthRate },
  ];

  const COLORS = ["#4ade80", "#d1d5db"];
  const primaryColor = "#4ade80";

  const startupData = [
    { year: "2019", count: 8 },
    { year: "2020", count: 12 },
    { year: "2021", count: 18 },
    { year: "2022", count: 23 },
    { year: "2023", count: 30 },
  ];

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-md p-4 sm:p-6 hover:shadow-xl transition duration-300 w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <h3 className="text-lg sm:text-xl font-bold mb-2">{trend.title}</h3>
      <p className="text-sm text-gray-600 mb-2">{trend.description}</p>
      <p className="text-xs text-gray-500 italic mb-4">Категория: {trend.category}</p>

      {/* Адаптивный layout: вертикально на мобилках, горизонтально на >=lg */}
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">

        {/* Pie Chart */}
        <motion.div
          className="h-64 sm:h-56 w-full lg:w-1/3 bg-gray-100 p-4 sm:p-6 rounded-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={60}
                fill={primaryColor}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <p className="text-center text-xs text-gray-700 font-medium mt-0">Конверсия</p>
        </motion.div>

        {/* Bar Chart */}
        <motion.div
          className="h-64 sm:h-56 w-full lg:w-1/3 bg-gray-100 p-4 sm:p-6 rounded-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={startupData}>
              <XAxis dataKey="year" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Bar dataKey="count" fill={primaryColor} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-center text-xs text-gray-700 font-medium mt-0">
            Кол-во стартапов за 5 лет
          </p>
        </motion.div>

        {/* Инфоблок */}
        <motion.div
          className="h-auto w-full lg:w-1/3 bg-gray-100 p-4 sm:p-6 rounded-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <div className="flex flex-col justify-between h-full gap-4 text-sm sm:text-base">
            <div>
              <p className="text-gray-600">Конверсия</p>
              <p className="text-lg font-bold text-green-600">
                {trend.growthRate}%
              </p>
            </div>
            <div>
              <p className="text-gray-600">Сумма инвестиций</p>
              <p className="text-lg font-bold text-green-600">
                {trend.investmentAmount ? `${trend.investmentAmount} тг` : "200.000 тг"}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Оценка потенциала</p>
              <p className="text-lg font-bold text-green-600">8.7 / 10</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TrendCard;
