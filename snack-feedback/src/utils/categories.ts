import type { SnackCategory } from '../types/snack';

export const SNACK_CATEGORIES: SnackCategory[] = [
  'ramen',
  'chips',
  'sweets',
  'fruits',
  'chocolate',
  'other',
];

export const getCategoryDisplayName = (category: string): string => {
  const displayNames: Record<string, string> = {
    ramen: 'Ramen & Noodles',
    chips: 'Chips & Savory',
    sweets: 'Cookies & Baked',
    fruits: 'Fruit & Healthy',
    chocolate: 'Chocolate',
    other: 'Other',
  };
  return displayNames[category] || category;
};

export const categoryToId = (category: string): string => {
  return `category-${category.toLowerCase().replace(/\s+/g, '-')}`;
};

// Map spreadsheet categories to app categories
export const mapSpreadsheetCategory = (spreadsheetCategory: string): string => {
  const mapping: Record<string, string> = {
    'Ramen & Noodles': 'ramen',
    'Chips & Savory': 'chips',
    'Cookies & Baked': 'sweets',
    'Fruit & Healthy': 'fruits',
    'Chocolate': 'chocolate',
    'Other': 'other',
  };
  return mapping[spreadsheetCategory] || 'other';
};