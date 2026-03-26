// Temporary local storage fallback for Firebase issues
let localCourses = [];
let localLessons = [];

export async function createCourse(courseData) {
  const course = {
    _id: Date.now().toString(),
    ...courseData,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  localCourses.push(course);
  return course;
}

export async function createLesson(lessonData) {
  const lesson = {
    _id: Date.now().toString(),
    ...lessonData,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  localLessons.push(lesson);
  return lesson;
}

export async function getAllCourses() {
  return localCourses;
}

export async function getLessonsByCourseId(courseId) {
  return localLessons.filter(lesson => lesson.courseId === courseId);
}

export async function getLessonById(lessonId) {
  return localLessons.find(lesson => lesson._id === lessonId);
}

export async function updateCourse(courseId, updateData) {
  const index = localCourses.findIndex(c => c._id === courseId);
  if (index !== -1) {
    localCourses[index] = { ...localCourses[index], ...updateData, updatedAt: new Date() };
    return true;
  }
  return false;
}

export async function updateLesson(lessonId, updateData) {
  const index = localLessons.findIndex(l => l._id === lessonId);
  if (index !== -1) {
    localLessons[index] = { ...localLessons[index], ...updateData, updatedAt: new Date() };
    return true;
  }
  return false;
}

export async function deleteCourse(courseId) {
  localCourses = localCourses.filter(c => c._id !== courseId);
  localLessons = localLessons.filter(l => l.courseId !== courseId);
  return true;
}

export async function deleteLesson(lessonId) {
  localLessons = localLessons.filter(l => l._id !== lessonId);
  return true;
}

// Initialize with sample data
localCourses = [
  {
    _id: "1",
    title: "HTML & CSS Mastery",
    description: "Master the fundamentals of web development with HTML5 and CSS3. Build responsive, modern websites from scratch.",
    image: "https://cdn-icons-png.flaticon.com/512/919/919827.png",
    points: 150,
    tags: ["Frontend", "HTML", "CSS", "Beginner"],
    duration: "8 hours",
    rating: 4.8,
    instructor: "Sarah Chen",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "2",
    title: "JavaScript Complete Course",
    description: "Learn JavaScript from basics to advanced concepts. Master ES6+, async programming, and modern JS frameworks.",
    image: "https://cdn-icons-png.flaticon.com/512/919/919832.png",
    points: 200,
    tags: ["Frontend", "JavaScript", "Programming", "Intermediate"],
    duration: "12 hours",
    rating: 4.7,
    instructor: "Mike Johnson",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "3",
    title: "React for Beginners",
    description: "Build modern web applications with React. Learn components, state management, and create your first interactive React apps.",
    image: "https://cdn-icons-png.flaticon.com/512/919/919851.png",
    points: 200,
    tags: ["Frontend", "React", "Programming", "Beginner"],
    duration: "10 hours",
    rating: 4.7,
    instructor: "Alex Rivera",
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Add sample lessons
localLessons = [
  {
    _id: "1-1",
    courseId: "1",
    title: "HTML Basics",
    content: "Learn the fundamental structure of HTML documents. Understand tags, elements, and semantic HTML5.",
    duration: 45,
    sortOrder: 1,
    videoUrl: "https://www.youtube.com/embed/jfKfPfyJRdk",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "1-2",
    courseId: "1",
    title: "CSS Introduction",
    content: "Learn how to style HTML elements with CSS. Understand selectors, properties, and values.",
    duration: 40,
    sortOrder: 2,
    videoUrl: "https://www.youtube.com/embed/1Rs2ND1ryYc",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "2-1",
    courseId: "2",
    title: "JavaScript Introduction",
    content: "Get started with JavaScript programming. Learn variables, data types, and basic operators.",
    duration: 50,
    sortOrder: 1,
    videoUrl: "https://www.youtube.com/embed/W6NZfCO5SIk",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "3-1",
    courseId: "3",
    title: "React Introduction",
    content: "Get started with React library. Learn what React is, why use it, and how it works.",
    duration: 45,
    sortOrder: 1,
    videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk",
    createdAt: new Date(),
    updatedAt: new Date()
  }
];
