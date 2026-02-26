import type { Snack } from '../types/snack';

interface SelectionSidebarProps {
  selectedSnacks: Snack[];
  onRemoveSnack: (snackId: string) => void;
  onDeselectAll: () => void;
}

export const SelectionSidebar = ({
  selectedSnacks,
  onRemoveSnack,
  onDeselectAll,
}: SelectionSidebarProps) => {
  return (
    <div className="sticky top-[192px] h-fit ml-8">
      <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <svg
                className="w-6 h-6 text-white mr-2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
              </svg>
              <h3 className="text-lg font-bold text-white">
                Selected Snacks
              </h3>
            </div>
            <span className="bg-white/20 text-white text-sm font-bold px-3 py-1 rounded-full">
              {selectedSnacks.length}
            </span>
          </div>
        </div>

        {/* Selected Items List */}
        <div className="max-h-[calc(100vh-400px)] overflow-y-auto">
          {selectedSnacks.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <svg
                className="w-16 h-16 text-gray-300 mx-auto mb-3"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
              <p className="text-gray-500 text-sm">
                No snacks selected yet
              </p>
              <p className="text-gray-400 text-xs mt-1">
                Click on snacks to add them here
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {selectedSnacks.map((snack) => (
                <div
                  key={snack.id}
                  className="px-4 py-3 hover:bg-gray-50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    {/* Snack Image */}
                    <img
                      src={snack.imageUrl}
                      alt={snack.name}
                      className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                    />
                    
                    {/* Snack Name */}
                    <p className="text-sm font-medium text-gray-900 flex-1 leading-tight">
                      {snack.name}
                    </p>
                    
                    {/* Remove Button */}
                    <button
                      onClick={() => onRemoveSnack(snack.id)}
                      className="flex-shrink-0 w-7 h-7 rounded-full bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200 flex items-center justify-center group-hover:scale-110"
                      aria-label="Remove snack"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer with Deselect All Button */}
        {selectedSnacks.length > 0 && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <button
              onClick={onDeselectAll}
              className="w-full px-4 py-2.5 bg-white border-2 border-red-200 text-red-600 rounded-xl font-semibold text-sm hover:bg-red-50 hover:border-red-300 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
              Deselect All
            </button>
          </div>
        )}
      </div>
    </div>
  );
};