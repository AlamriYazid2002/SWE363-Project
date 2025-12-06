import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    kfupmId: { type: String, required: true, unique: true, trim: true },
    userId: { type: String, unique: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["student", "organizer", "admin"], default: "student" },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.pre("save", function () {
  if (this.userId) return;
  if (this.kfupmId) {
    this.userId = this.kfupmId;
    return;
  }
  const prefix = (this.email || "user").split("@")[0].replace(/[^a-zA-Z0-9]/g, "").slice(0, 5).toLowerCase();
  const suffix = this._id.toString().slice(-4);
  this.userId = `${prefix || "user"}-${suffix}`;
});

export default mongoose.model("User", userSchema);
