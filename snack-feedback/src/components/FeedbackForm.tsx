import { useState } from 'react';
import { CategoryTabs } from './CategoryTabs';
import { SnackSection } from './SnackSection';
import { CommentSection } from './CommentSection';
import type { SnacksByCategory } from '../types/snack';
import { useFeedbackSubmission } from '../hooks/useFeedbackSubmission';

interface FeedbackFormProps {
  snacksByCategory: SnacksByCategory;
  year: number;
}

export const FeedbackForm = ({
  snacksByCategory,
  year,
}: FeedbackFormProps) => {
  const [selectedSnackIds, setSelectedSnackIds] = useState<Set<string>>(
    new Set()
  );
  const [comments, setComments] = useState('');
  const { submit, submitting, error, success, reset } = useFeedbackSubmission();

  const categories = Object.keys(snacksByCategory);

  const handleToggleSnack = (snackId: string) => {
    setSelectedSnackIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(snackId)) {
        newSet.delete(snackId);
      } else {
        newSet.add(snackId);
      }
      return newSet;
    });
  };

  const handleSubmit = async () => {
    await submit({
      likedSnacks: Array.from(selectedSnackIds),
      comments,
      year,
    });

    if (success) {
      setSelectedSnackIds(new Set());
      setComments('');
    }
  };

  const handleSubmitAnother = () => {
    reset();
    setSelectedSnackIds(new Set());
    setComments('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="mb-6">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Thank You!
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            Your feedback has been submitted successfully. We appreciate you
            taking the time to help us improve the snack selection for future
            retreats!
          </p>
          <button
            onClick={handleSubmitAnother}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Submit Another Response
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header - Higher z-index */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Retreat Snack Feedback {year}
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            Let us know which snacks you enjoyed! Select all that apply.
          </p>
        </div>
      </header>

      {/* Category Tabs - Lower z-index than header */}
      {categories.length > 0 && <CategoryTabs categories={categories} />}

      {/* Main Content with proper margins */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Snack Sections */}
        <div className="space-y-12 mb-12">
          {categories.map((category) => (
            <SnackSection
              key={category}
              category={category}
              snacks={snacksByCategory[category]}
              selectedSnackIds={selectedSnackIds}
              onToggleSnack={handleToggleSnack}
            />
          ))}
        </div>

        {/* Comments Section */}
        <div className="mb-8">
          <CommentSection comments={comments} onCommentsChange={setComments} />
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
              </svg>
              <p className="text-red-800 text-sm font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-center pb-8">
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="
              bg-gradient-to-r from-blue-500 to-indigo-600 text-white 
              py-4 px-16 rounded-xl font-semibold text-xl
              hover:from-blue-600 hover:to-indigo-700 
              disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed
              transition-all duration-200 shadow-lg hover:shadow-xl
              transform hover:-translate-y-0.5 active:translate-y-0
            "
          >
            {submitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </span>
            ) : (
              'Submit Feedback'
            )}
          </button>
        </div>
      </main>
    </div>
  );
};