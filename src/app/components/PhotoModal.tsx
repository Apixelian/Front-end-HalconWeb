import { X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface PhotoModalProps {
  imageUrl: string;
  title: string;
  onClose: () => void;
}

export function PhotoModal({ imageUrl, title, onClose }: PhotoModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b px-4 py-3 flex items-center justify-between">
          <h3 className="font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4">
          <ImageWithFallback
            src={imageUrl}
            alt={title}
            className="w-full h-auto rounded"
          />
        </div>
      </div>
    </div>
  );
}
