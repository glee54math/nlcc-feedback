import { useState } from 'react';
import { submitFeedback } from '../services/snackService';
import type { FeedbackSubmission } from '../types/feedback';

export const useFeedbackSubmission = () => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submit = async (feedback: FeedbackSubmission) => {
    try {
      setSubmitting(true);
      setError(null);
      setSuccess(false);
      await submitFeedback(feedback);
      setSuccess(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to submit feedback'
      );
      setSuccess(false);
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setError(null);
    setSuccess(false);
  };

  return { submit, submitting, error, success, reset };
};