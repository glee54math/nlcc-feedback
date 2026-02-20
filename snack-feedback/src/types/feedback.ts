export interface Feedback {
  id?: string;
  likedSnacks: string[]; // Array of snack IDs
  comments: string;
  year: number;
  timestamp: Date;
}

export interface FeedbackSubmission {
  likedSnacks: string[];
  comments: string;
  year: number;
}