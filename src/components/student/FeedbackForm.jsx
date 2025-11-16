import { Header } from "../Header";
import { Star, Send } from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { useState } from "react";

export function FeedbackForm() {
  const [rating, setRating] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userRole="student" />
      
      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl mb-2">Event Feedback</h2>
          <p className="text-gray-600">Share your thoughts about the event you attended</p>
        </div>

        {/* Event Info */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-6">
          <h3 className="mb-2">Introduction to Web Development</h3>
          <p className="text-gray-600">Organized by Coding Club</p>
          <p className="text-sm text-gray-500 mt-2">April 20, 2025 • Building 7, Lab 2</p>
        </div>

        {/* Feedback Form */}
        <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
          <form className="space-y-8">
            {/* Overall Rating */}
            <div>
              <Label className="mb-3 block">Overall Rating *</Label>
              <div className="flex gap-3 justify-center mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      size={48}
                      className={star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                    />
                  </button>
                ))}
              </div>
              <p className="text-center text-sm text-gray-600">
                {rating === 0 && "Click to rate"}
                {rating === 1 && "Poor"}
                {rating === 2 && "Fair"}
                {rating === 3 && "Good"}
                {rating === 4 && "Very Good"}
                {rating === 5 && "Excellent"}
              </p>
            </div>

            {/* Content Quality */}
            <div>
              <Label htmlFor="contentQuality">How would you rate the content quality?</Label>
              <select
                id="contentQuality"
                className="mt-2 w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg"
              >
                <option value="">Select rating</option>
                <option>Excellent</option>
                <option>Good</option>
                <option>Average</option>
                <option>Below Average</option>
                <option>Poor</option>
              </select>
            </div>

            {/* Organization */}
            <div>
              <Label htmlFor="organization">How well was the event organized?</Label>
              <select
                id="organization"
                className="mt-2 w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg"
              >
                <option value="">Select rating</option>
                <option>Very Well Organized</option>
                <option>Well Organized</option>
                <option>Moderately Organized</option>
                <option>Poorly Organized</option>
              </select>
            </div>

            {/* Venue Rating */}
            <div>
              <Label htmlFor="venue">How would you rate the venue?</Label>
              <select
                id="venue"
                className="mt-2 w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg"
              >
                <option value="">Select rating</option>
                <option>Excellent</option>
                <option>Good</option>
                <option>Average</option>
                <option>Below Average</option>
                <option>Poor</option>
              </select>
            </div>

            {/* Would Recommend */}
            <div>
              <Label>Would you recommend this event to others?</Label>
              <div className="mt-3 space-y-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="recommend" value="yes" className="w-4 h-4" />
                  <span>Yes, definitely</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="recommend" value="maybe" className="w-4 h-4" />
                  <span>Maybe</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="recommend" value="no" className="w-4 h-4" />
                  <span>No</span>
                </label>
              </div>
            </div>

            {/* What did you like most */}
            <div>
              <Label htmlFor="liked">What did you like most about the event?</Label>
              <Textarea
                id="liked"
                placeholder="Share what you enjoyed..."
                className="mt-2 bg-gray-50 min-h-24"
              />
            </div>

            {/* Areas for Improvement */}
            <div>
              <Label htmlFor="improve">What could be improved?</Label>
              <Textarea
                id="improve"
                placeholder="Share your suggestions for improvement..."
                className="mt-2 bg-gray-50 min-h-24"
              />
            </div>

            {/* Additional Comments */}
            <div>
              <Label htmlFor="comments">Additional Comments (Optional)</Label>
              <Textarea
                id="comments"
                placeholder="Any other thoughts or feedback..."
                className="mt-2 bg-gray-50 min-h-32"
              />
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-4 border-t border-gray-200">
              <Button className="bg-kfupm-green hover:bg-kfupm-green-dark text-white gap-2">
                <Send size={16} />
                Submit Feedback
              </Button>
              <Button variant="outline">
                Save
              </Button>
              <Button variant="ghost" className="ml-auto">
                Skip
              </Button>
            </div>
          </form>
        </div>

        {/* Privacy Notice */}
        <div className="mt-6 bg-gray-100 border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-600">
            Your feedback is anonymous and will be used to improve future events. Thank you for taking the time to share your thoughts!
          </p>
        </div>
      </div>
    </div>
  );
}
