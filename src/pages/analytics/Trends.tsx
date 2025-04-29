import { useState } from 'react';
import { mockTrends } from '../../components/trends/data/mockTrends';
import TrendCard from "../../components/trends/TrendCard";
import TrendFilters from '../../components/trends/TrendFilters';

const TrendExplorer = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState<'growth' | 'popularity'>('growth');

  const filteredTrends = mockTrends
    .filter(
      trend =>
        (trend.title.toLowerCase().includes(search.toLowerCase()) ||
          trend.description.toLowerCase().includes(search.toLowerCase())) &&
        (category === '' || trend.category === category)
    )
    .sort((a, b) =>
      sortBy === 'growth'
        ? b.growthRate - a.growthRate
        : b.popularityScore - a.popularityScore
    );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Анализ трендов рынка</h1>

      <TrendFilters
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
        trends={mockTrends} // передаем массив трендов
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {filteredTrends.map(trend => (
          <TrendCard key={trend.id} trend={trend} />
        ))}
      </div>
    </div>
  );
};

export default TrendExplorer;
