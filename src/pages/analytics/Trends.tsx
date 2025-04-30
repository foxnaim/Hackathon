import { useState } from 'react';
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
    <>
      <Header />
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 max-w-5xl mx-auto py-6">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6">
          Анализ трендов рынка
        </h1>

        <motion.div
          className="flex flex-col gap-4 sm:gap-6"
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
    </>
  );
};

export default Trends;
