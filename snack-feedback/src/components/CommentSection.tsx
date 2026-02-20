import React from 'react';

interface CommentSectionProps {
  comments: string;
  onCommentsChange: (comments: string) => void;
}

export const CommentSection: React.FC<CommentSectionProps> = ({
  comments,
  onCommentsChange,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <label
        htmlFor="comments"
        className="block text-lg font-semibold text-gray-900 mb-2"
      >
        Additional Comments
      </label>
      <p className="text-sm text-gray-600 mb-4">
        Share any other thoughts about the snacks, suggestions for next year, or
        general feedback about the retreat snack experience.
      </p>
      <textarea
        id="comments"
        value={comments}
        onChange={(e) => onCommentsChange(e.target.value)}
        rows={6}
        placeholder="Example: 'I loved that you had Hello Panda and ramen.' or 'It would be awesome to see more fruits and drinks.'"
        className="
          w-full px-4 py-3 border border-gray-300 rounded-lg
          focus:ring-2 focus:ring-blue-500 focus:border-transparent
          resize-none text-gray-900 placeholder-gray-400
        "
      />
    </div>
  );
};