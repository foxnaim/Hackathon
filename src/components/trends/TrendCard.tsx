import { motion } from 'framer-motion';
import { Trend } from '../../common.types';

const TrendCard = ({ trend }: { trend: Trend }) => (
  <motion.div
    className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition duration-300"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <h3 className="text-xl font-semibold mb-2">{trend.title}</h3>
    <p className="text-sm text-gray-600 mb-2">{trend.description}</p>
    <p className="text-xs text-gray-500 italic">Категория: {trend.category}</p>
    <div className="mt-2">
      <p className="text-sm">Рост: {trend.growthRate}%</p>
      <div className="bg-gray-200 h-2 rounded-full">
        <div
          className="bg-green-500 h-2 rounded-full"
          style={{ width: `${trend.growthRate}%` }}
        />
      </div>
    </div>
    <div className="mt-2">
      <p className="text-sm">Популярность: {trend.popularityScore}/100</p>
    </div>
  </motion.div>
);

export default TrendCard;
