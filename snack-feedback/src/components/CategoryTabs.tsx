import { useState, useEffect } from 'react';
import { getCategoryDisplayName, categoryToId } from '../utils/categories';

interface CategoryTabsProps {
  categories: string[];
}

export const CategoryTabs = ({ categories }: CategoryTabsProps) => {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]);
  const [isScrolling, setIsScrolling] = useState(false);

  const scrollToCategory = (category: string) => {
    // Immediately set the active category (don't wait for scroll)
    setActiveCategory(category);
    setIsScrolling(true);

    const element = document.getElementById(categoryToId(category));
    if (element) {
      const headerHeight = 88; // Header height
      const tabsHeight = 64; // Category tabs height
      const offset = headerHeight + tabsHeight + 16; // Add small buffer
      
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      // Re-enable scroll detection after animation completes
      setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      // Don't update active category while user is clicking buttons
      if (isScrolling) return;

      const scrollPosition = window.pageYOffset + 200;

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
  }, [categories, isScrolling]);

  return (
    <div className="sticky top-[104px] z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 py-4 min-w-max">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => scrollToCategory(category)}
                className={`
                  px-6 py-2.5 rounded-full font-semibold text-sm whitespace-nowrap
                  transition-all duration-300 ease-out
                  ${
                    activeCategory === category
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30 scale-105'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200 hover:border-blue-300 hover:shadow-md'
                  }
                `}
              >
                {getCategoryDisplayName(category)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};