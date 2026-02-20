import React, { useState } from 'react';
import { CategoryTabs } from './CategoryTabs';
import { SnackSection } from './SnackSection';
import { CommentSection } from './CommentSection';
import type { SnacksByCategory } from '../types/snack';
import { useFeedbackSubmission } from '../hooks/useFeedbackSubmission';

interface FeedbackFormProps {
  snacksByCategory: SnacksByCategory;
  year: number;
}

export const FeedbackForm: React.FC<FeedbackFormProps> = ({
  snacksByCategory,
  year,
}) => {
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

    // Reset form on success
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mb-6">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-green-500"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Thank You!
          </h2>
          <p className="text-gray-600 mb-8">
            Your feedback has been submitted successfully. We appreciate you
            taking the time to help us improve the snack selection for future
            retreats!
          </p>
          <button
            onClick={handleSubmitAnother}
            className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-600 transition-colors"
          >
            Submit Another Response
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Retreat Snack Feedback {year}
          </h1>
          <p className="text-gray-600 mt-2">
            Let us know which snacks you enjoyed! Select all that apply.
          </p>
        </div>
      </header>

      {/* Category Tabs */}
      {categories.length > 0 && <CategoryTabs categories={categories} />}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Snack Sections */}
        <div className="space-y-8 mb-12">
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
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="
              bg-blue-500 text-white py-4 px-12 rounded-lg font-semibold text-lg
              hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed
              transition-colors shadow-lg
            "
          >
            {submitting ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </div>
      </main>
    </div>
  );
};