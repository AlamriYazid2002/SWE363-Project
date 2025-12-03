import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: String,
    capacity: Number,
    startAt: Date,
    endAt: Date,
    venue: String,
    description: String,
    status: { type: String, default: "pending" },
    organizerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Event", eventSchema);
