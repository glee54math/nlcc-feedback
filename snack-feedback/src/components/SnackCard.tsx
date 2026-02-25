import type { Snack } from '../types/snack';

interface SnackCardProps {
  snack: Snack;
  isSelected: boolean;
  onToggle: (snackId: string) => void;
}

export const SnackCard = ({
  snack,
  isSelected,
  onToggle,
}: SnackCardProps) => {
  return (
    <div
      onClick={() => onToggle(snack.id)}
      className={`
        relative cursor-pointer rounded-2xl overflow-hidden
        transition-all duration-300 ease-out
        ${
          isSelected
            ? 'ring-4 ring-blue-500 shadow-xl shadow-blue-500/20 transform scale-[1.02]'
            : 'ring-2 ring-gray-200 hover:ring-blue-400 hover:shadow-lg hover:scale-[1.02]'
        }
      `}
    >
      {/* Image */}
      <div className="aspect-square w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        <img
          src={snack.imageUrl}
          alt={snack.name}
          className={`w-full h-full object-cover transition-transform duration-300 ${
            isSelected ? 'scale-110' : 'group-hover:scale-105'
          }`}
        />
      </div>

      {/* Snack Name */}
      <div className="p-4 bg-white">
        <h3 className="text-sm font-semibold text-gray-900 text-center leading-tight">
          {snack.name}
        </h3>
      </div>

      {/* Checkmark overlay with animation */}
      {isSelected && (
        <div className="absolute top-3 right-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full p-2 shadow-lg animate-bounce-once">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
      )}
    </div>
  );
};