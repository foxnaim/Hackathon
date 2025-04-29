import React, { useState } from 'react';
import { mockTrends } from '../../components/trends/data/mockTrends';
import TrendCard from '../../components/trends/TrendCard';
import { motion } from 'framer-motion';
import Header from '../../components/header/header';


const Trends = () => {
  const [sortBy] = useState<'growth' | 'popularity'>('growth');

  const filteredTrends = mockTrends.sort((a, b) =>
    sortBy === 'growth'
      ? b.growthRate - a.growthRate
      : b.popularityScore - a.popularityScore
  );

  return (
    <React.Fragment>
      <Header/>
    <div className="max-w-3xl mx-auto p-6">
      <span className="text-3xl font-bold mb-6">Анализ трендов рынка</span>

      <motion.div
        className="flex flex-col gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {filteredTrends.map((trend) => (
          <TrendCard key={trend.id} trend={trend} />
        ))}
      </motion.div>
    </div>
    </React.Fragment>
  );
};

export default Trends;
