import { useState, useEffect } from 'react';
import type { Snack, SnacksByCategory } from '../types/snack';
import { getSnacksByYear } from '../services/snackService';

export const useSnacks = (year: number) => {
  const [snacks, setSnacks] = useState<Snack[]>([]);
  const [snacksByCategory, setSnacksByCategory] = useState<SnacksByCategory>(
    {}
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSnacks = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedSnacks = await getSnacksByYear(year);
        setSnacks(fetchedSnacks);

        // Group snacks by category
        const grouped = fetchedSnacks.reduce((acc, snack) => {
          if (!acc[snack.category]) {
            acc[snack.category] = [];
          }
          acc[snack.category].push(snack);
          return acc;
        }, {} as SnacksByCategory);

        setSnacksByCategory(grouped);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch snacks');
      } finally {
        setLoading(false);
      }
    };

    fetchSnacks();
  }, [year]);

  return { snacks, snacksByCategory, loading, error };
};