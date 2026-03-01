interface CommentSectionProps {
  comments: string;
  onCommentsChange: (comments: string) => void;
}

export const CommentSection = ({
  comments,
  onCommentsChange,
}: CommentSectionProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center mb-3">
        <svg className="w-6 h-6 text-blue-500 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
        </svg>
        <label
          htmlFor="comments"
          className="block text-xl font-bold text-gray-900"
        >
          Additional Comments
        </label>
      </div>
      <p className="text-sm text-gray-600 mb-4 leading-relaxed">
        Share any other thoughts about the snacks, suggestions for next year, or
        general feedback about the retreat snack experience.
      </p>
      <textarea
        id="comments"
        value={comments}
        onChange={(e) => onCommentsChange(e.target.value)}
        rows={7}
        placeholder="Example: 'I loved that you had Pocky and the non-spicy ramen.' or 'It would be awesome to see more fruits and drinks.'"
        className="
          w-full px-4 py-3 border-2 border-gray-200 rounded-xl
          focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500
          resize-none text-gray-900 placeholder-gray-400
          transition-all duration-200
          hover:border-gray-300
        "
      />
      <p className="text-xs text-gray-500 mt-2">
        {comments.length > 0 ? `${comments.length} characters` : 'Optional'}
      </p>
    </div>
  );
};