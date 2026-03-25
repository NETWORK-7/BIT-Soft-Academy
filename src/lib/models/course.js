export function docToCourse(doc, lessonCount) {
  const tags = doc.tags;
  return {
    _id: doc._id.toString(),
    title: doc.title,
    description: doc.description ?? "",
    image: doc.image ?? "",
    points: doc.points ?? 0,
    tags: Array.isArray(tags) ? tags : [],
    duration: doc.duration ?? "",
    rating: doc.rating != null ? Number(doc.rating) : 0,
    instructor: doc.instructor ?? "",
    lessons: Number(lessonCount ?? 0),
  };
}

export function docToLesson(doc) {
  return {
    _id: doc._id.toString(),
    courseId: doc.courseId,
    title: doc.title,
    content: doc.content ?? "",
    duration: doc.durationMinutes ?? 45,
    videoId: doc.videoId ?? "",
  };
}
