import React from 'react';
import type { Snack } from '../types/snack';
import { SnackCard } from '../components/SnackCard';
import { getCategoryDisplayName, categoryToId } from '../utils/categories';

interface SnackSectionProps {
  category: string;
  snacks: Snack[];
  selectedSnackIds: Set<string>;
  onToggleSnack: (snackId: string) => void;
}

export const SnackSection: React.FC<SnackSectionProps> = ({
  category,
  snacks,
  selectedSnackIds,
  onToggleSnack,
}) => {
  return (
    <section id={categoryToId(category)} className="py-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {getCategoryDisplayName(category)}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {snacks.map((snack) => (
          <SnackCard
            key={snack.id}
            snack={snack}
            isSelected={selectedSnackIds.has(snack.id)}
            onToggle={onToggleSnack}
          />
        ))}
      </div>
    </section>
  );
};