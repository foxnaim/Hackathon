import { Trend } from "../../common.types";

interface Props {
  search: string;
  setSearch: (val: string) => void;
  category: string;
  setCategory: (val: string) => void;
  sortBy: 'growth' | 'popularity';
  setSortBy: (val: 'growth' | 'popularity') => void;
  trends: Trend[];
}

const TrendFilters = ({ search, setSearch, category, setCategory, sortBy, setSortBy, trends }: Props) => {
  // Получаем уникальные категории из списка трендов
  const categories = Array.from(new Set(trends.map((trend) => trend.category)));

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <input
        type="text"
        placeholder="Поиск трендов..."
        className="p-2 border border-gray-300 rounded w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        className="p-2 border border-gray-300 rounded w-full sm:w-auto"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Все категории</option>
        {categories.map((categoryOption) => (
          <option key={categoryOption} value={categoryOption}>
            {categoryOption}
          </option>
        ))}
      </select>

      <select
        className="p-2 border border-gray-300 rounded w-full sm:w-auto"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value as 'growth' | 'popularity')}
      >
        <option value="growth">По росту</option>
        <option value="popularity">По популярности</option>
      </select>
    </div>
  );
};

export default TrendFilters;
