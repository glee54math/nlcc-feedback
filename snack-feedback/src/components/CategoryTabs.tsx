import React, { useState, useEffect } from 'react';
import { getCategoryDisplayName, categoryToId } from '../utils/categories';

interface CategoryTabsProps {
  categories: string[];
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({ categories }) => {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]);

  const scrollToCategory = (category: string) => {
    const element = document.getElementById(categoryToId(category));
    if (element) {
      const offset = 120; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveCategory(category);
    }
  };

  // Update active category on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.pageYOffset + 150;

      for (const category of categories) {
        const element = document.getElementById(categoryToId(category));
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveCategory(category);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [categories]);

  return (
    <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
      <div className="overflow-x-auto">
        <div className="flex space-x-1 p-2 min-w-max">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => scrollToCategory(category)}
              className={`
                px-6 py-3 rounded-lg font-medium text-sm whitespace-nowrap
                transition-all duration-200
                ${
                  activeCategory === category
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              {getCategoryDisplayName(category)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};