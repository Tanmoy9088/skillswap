"use client";

import { useState } from "react";
import { Star, X } from "lucide-react";

import { useCreateSwapRating } from "@/hooks/skills/useCreateSwapRating";
import { useUpdateSwapRating } from "@/hooks/skills/useUpdateSwapRating";
import { SwapRating } from "@/hooks/skills/useSwapRating";

interface RateMentorModalProps {
  swapId: string;
  mentorName: string;
  skillName: string;
  existingRating?: SwapRating | null;
  onClose: () => void;
}

const RateMentorModal = ({
  swapId,
  mentorName,
  skillName,
  existingRating,
  onClose,
}: RateMentorModalProps) => {
  const [rating, setRating] = useState(existingRating?.rating ?? 0);

  const [hoverRating, setHoverRating] = useState(0);

  const [review, setReview] = useState(existingRating?.review ?? "");

  const createRating = useCreateSwapRating();
  const updateRating = useUpdateSwapRating();

  const isEditing = Boolean(existingRating);

  const isPending = createRating.isPending || updateRating.isPending;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (rating === 0) {
      alert("Please select a rating.");
      return;
    }

    try {
      if (isEditing) {
        await updateRating.mutateAsync({
          swapId,
          rating,
          review: review.trim() || undefined,
        });

        alert("Rating updated successfully!");
      } else {
        await createRating.mutateAsync({
          swapId,
          rating,
          review: review.trim() || undefined,
        });

        alert("Rating submitted successfully!");
      }

      onClose();
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : isEditing
            ? "Failed to update rating."
            : "Failed to submit rating.",
      );
    }
  };

  const ratingLabel =
    rating === 1
      ? "Poor"
      : rating === 2
        ? "Fair"
        : rating === 3
          ? "Good"
          : rating === 4
            ? "Very Good"
            : rating === 5
              ? "Excellent"
              : "";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {isEditing ? "Edit Your Rating" : "Rate Your Mentor"}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {mentorName} · {skillName}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6">
          {/* Rating */}
          <div>
            <p className="text-sm font-semibold text-gray-700">
              How was your session?
            </p>

            <div className="mt-3 flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => {
                const active = star <= (hoverRating || rating);

                return (
                  <button
                    key={star}
                    type="button"
                    disabled={isPending}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                    className="rounded-lg p-1 transition hover:scale-110 disabled:cursor-not-allowed"
                    aria-label={`${star} star${star > 1 ? "s" : ""}`}
                  >
                    <Star
                      className={`h-8 w-8 ${
                        active
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {rating > 0 && (
              <p className="mt-2 text-sm font-medium text-gray-600">
                {ratingLabel}
              </p>
            )}
          </div>

          {/* Review */}
          <div className="mt-6">
            <label
              htmlFor="review"
              className="text-sm font-semibold text-gray-700"
            >
              Review{" "}
              <span className="font-normal text-gray-400">(optional)</span>
            </label>

            <textarea
              id="review"
              value={review}
              onChange={(event) => setReview(event.target.value)}
              maxLength={1000}
              rows={5}
              disabled={isPending}
              placeholder="Share your experience with this mentor..."
              className="mt-2 w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 disabled:cursor-not-allowed disabled:bg-gray-100"
            />

            <p className="mt-1 text-right text-xs text-gray-400">
              {review.length}/1000
            </p>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isPending}
              className="flex-1 rounded-xl border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={rating === 0 || isPending}
              className="flex-1 rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPending
                ? isEditing
                  ? "Updating..."
                  : "Submitting..."
                : isEditing
                  ? "Save Changes"
                  : "Submit Rating"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RateMentorModal;
