'use client';

import { useEffect, useState } from 'react';
import { fetchSizeCharts } from '@/app/lib/api'; // Adjust path if needed

type SizeChartItem = {
  id: number;
  size: string;
  size_id: number;
  chest: number;
  shoulder: number;
  sleeve: number;
};

type SizeChartModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const SizeChartModal: React.FC<SizeChartModalProps> = ({ isOpen, onClose }) => {
  const [chartData, setChartData] = useState<SizeChartItem[]>([]);

  useEffect(() => {
    if (isOpen) {
      fetchSizeCharts()
        .then(setChartData)
        .catch((err) => console.error('Failed to load size chart', err));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Extract sizes dynamically (e.g., S, M, L)
  const sizes = chartData.map((item) => item.size);

  // Get chart rows dynamically
  const metrics = ['chest', 'shoulder', 'sleeve'];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl relative overflow-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-5 text-gray-600 text-2xl hover:text-red-500"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="flex items-center justify-center mb-4">
          <h2 className="text-xl font-bold mb-2">Size Chart</h2>
        </div>

        <table className="w-full border border-gray-300 text-sm text-center mb-4">
          <thead className="bg-gray-100 text-red-600">
            <tr>
              <th className="border px-2 py-1">Metric (in)</th>
              {sizes.map((size, idx) => (
                <th key={idx} className="border px-2 py-1">
                  {size}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {metrics.map((metric) => (
              <tr key={metric}>
                <td className="border px-2 py-1 capitalize">{metric}</td>
                {chartData.map((item) => (
                  <td key={item.id + metric} className="border px-2 py-1">
                    {item[metric as keyof SizeChartItem]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <p className="text-sm text-gray-600">
          All sizes are approximate and may vary up to +/- 0.5.
          <br />
          Note: Select the same size you choose in regular fit for oversized look. XXL customers should choose XL.
        </p>
      </div>
    </div>
  );
};

export default SizeChartModal;
