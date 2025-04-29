import { Trend } from '../../common.types';

type TrendModalProps = {
  trend: Trend;
  onClose: () => void;
};

const TrendModal = ({ trend, onClose }: TrendModalProps) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl p-6 w-96">
      <h2 className="text-2xl font-bold mb-4">{trend.title}</h2>
      <p className="text-sm text-gray-600 mb-4">{trend.description}</p>
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
      <button
        onClick={onClose}
        className="mt-4 bg-red-500 text-white py-2 px-4 rounded-full"
      >
        Закрыть
      </button>
    </div>
  </div>
);

export default TrendModal;
