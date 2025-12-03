import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    capacity: { type: Number, required: true, min: 1 },
    startAt: { type: Date, required: true },
    endAt: { type: Date, required: true },
    venue: { type: String, required: true, trim: true },
    description: { type: String },
    posterUrl: { type: String }, // optional poster filename/url
    materials: [{ type: String }], // optional attachments filenames/urls
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
    organizerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Event", eventSchema);
