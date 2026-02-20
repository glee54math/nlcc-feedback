import React from 'react';
import type { Snack } from '../types/snack';

interface SnackCardProps {
  snack: Snack;
  isSelected: boolean;
  onToggle: (snackId: string) => void;
}

export const SnackCard: React.FC<SnackCardProps> = ({
  snack,
  isSelected,
  onToggle,
}) => {
  return (
    <div
      onClick={() => onToggle(snack.id)}
      className={`
        relative cursor-pointer rounded-lg overflow-hidden
        transition-all duration-200 ease-in-out
        ${
          isSelected
            ? 'ring-4 ring-blue-500 shadow-lg transform scale-105'
            : 'ring-1 ring-gray-200 hover:ring-2 hover:ring-blue-300 hover:shadow-md'
        }
      `}
    >
      {/* Image */}
      <div className="aspect-square w-full overflow-hidden bg-gray-100">
        <img
          src={snack.imageUrl}
          alt={snack.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Snack Name */}
      <div className="p-3 bg-white">
        <h3 className="text-sm font-medium text-gray-900 text-center">
          {snack.name}
        </h3>
      </div>

      {/* Checkmark overlay */}
      {isSelected && (
        <div className="absolute top-2 right-2 bg-blue-500 rounded-full p-1.5 shadow-lg">
          <svg
            className="w-5 h-5 text-white"
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