import mongoose from "mongoose";

const LessonSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  title: { type: String, required: true },
  description: { type: String },
  content: { type: String, required: true },
  videoId: { type: String }, 
  duration: { type: Number },
  order: { type: Number }, 
  resources: [{ name: String, url: String }], 
  quiz: [{
    question: String,
    options: [String],
    answer: String,
  }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Lesson || mongoose.model("Lesson", LessonSchema);
