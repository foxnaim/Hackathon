import { useState } from 'react';
import { mockTrends } from '../../components/trends/data/mockTrends';
import TrendCard from "../../components/trends/TrendCard";

import { motion } from 'framer-motion'; // Импортируем motion

const Trends = () => {
  const [sortBy] = useState<'growth' | 'popularity'>('growth');

  const filteredTrends = mockTrends
    .sort((a, b) =>
      sortBy === 'growth'
        ? b.growthRate - a.growthRate
        : b.popularityScore - a.popularityScore
    );


  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Анализ трендов рынка</h1>

      {/* Анимация появления трендов */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {filteredTrends.map(trend => (
          <motion.div
            key={trend.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <TrendCard trend={trend} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Trends;
