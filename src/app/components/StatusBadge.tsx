import { OrderStatus } from '../types';

interface StatusBadgeProps {
  status: OrderStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusStyles = () => {
    switch (status) {
      case 'Ordered':
        return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'In Process':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'In Route':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Delivered':
        return 'bg-green-100 text-green-800 border-green-300';
    }
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm border ${getStatusStyles()}`}>
      {status}
    </span>
  );
}
