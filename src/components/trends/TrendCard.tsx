import { motion } from 'framer-motion';
import { Trend } from '../../common.types';
import { useState } from 'react';
import TrendModal from './TrendModal';
import {
  LineChart,
  Line,
  ResponsiveContainer,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  PolarRadiusAxis,
} from 'recharts';

const TrendCard = ({ trend }: { trend: Trend }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const growthData = [
    { name: '3 мес', value: trend.growthRate * 0.5 },
    { name: '2 мес', value: trend.growthRate * 0.7 },
    { name: '1 мес', value: trend.growthRate },
  ];

  const radarData = [
    { metric: 'Рост', value: trend.growthRate },
    { metric: 'Популярность', value: trend.popularityScore },
    { metric: 'Интерес', value: trend.popularityScore * 0.8 },
  ];

  return (
    <motion.div
      className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition duration-300 w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div onClick={openModal} className="cursor-pointer">
        <h3 className="text-2xl font-bold mb-2">{trend.title}</h3>
        <p className="text-sm text-gray-600 mb-2">{trend.description}</p>
        <p className="text-xs text-gray-500 italic mb-2">Категория: {trend.category}</p>

        {/* Линейный график роста */}
        <div className="h-32 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={growthData}>
              <Line type="monotone" dataKey="value" stroke="#34d399" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Радиальный график (Дэшборд) */}
        <div className="h-48 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="metric" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar name="Показатели" dataKey="value" stroke="#6366f1" fill="#6366f1" fillOpacity={0.4} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <p className="text-center text-xs text-gray-700 font-medium mt-2">Дэшборд</p>
      </div>

      {isModalOpen && <TrendModal trend={trend} onClose={closeModal} />}
    </motion.div>
  );
};

export default TrendCard;
