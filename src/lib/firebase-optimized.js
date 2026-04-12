import { db } from "@/lib/firebase.js";
import { ref, get, set, remove, push } from "firebase/database";
import fastCache from "./fast-cache.js";

// Optimized Firebase operations with aggressive caching
class OptimizedFirebase {
  constructor() {
    this.cache = fastCache;
    this.defaultTTL = 2 * 60 * 1000; // 2 minutes
  }

  // Batch get operations for better performance
  async batchGet(paths) {
    const cacheKey = `batch:${paths.join(',')}`;
    const cached = this.cache.get(cacheKey);
    if (cached) {
      return cached;
    }

    const promises = paths.map(async (path) => {
      const pathCacheKey = `path:${path}`;
      let data = this.cache.get(pathCacheKey);
      
      if (!data) {
        const pathRef = ref(db, path);
        const snapshot = await get(pathRef);
        data = snapshot.val();
        this.cache.set(pathCacheKey, data, this.defaultTTL);
      }
      
      return { path, data };
    });

    const results = await Promise.all(promises);
    const batchResult = {};
    results.forEach(({ path, data }) => {
      batchResult[path] = data;
    });

    this.cache.set(cacheKey, batchResult, this.defaultTTL);
    return batchResult;
  }

  // Optimized courses get with caching
  async getAllCourses() {
    const cacheKey = 'courses:all:optimized';
    const cached = this.cache.get(cacheKey);
    if (cached) {
      return cached;
    }

    const coursesRef = ref(db, 'courses');
    const snapshot = await get(coursesRef);
    const data = snapshot.val();
    
    const courses = data ? Object.keys(data).map(key => ({
      _id: key,
      ...data[key]
    })) : [];

    this.cache.set(cacheKey, courses, this.defaultTTL);
    return courses;
  }

  // Optimized lessons get with course filtering
  async getLessonsByCourseId(courseId) {
    const cacheKey = `lessons:course:${courseId}:optimized`;
    const cached = this.cache.get(cacheKey);
    if (cached) {
      return cached;
    }

    // Get all lessons and filter
    const lessonsRef = ref(db, 'lessons');
    const snapshot = await get(lessonsRef);
    const data = snapshot.val();
    
    const lessons = data ? Object.keys(data)
      .map(key => ({ _id: key, ...data[key] }))
      .filter(lesson => lesson.courseId === courseId)
      .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0)) : [];

    this.cache.set(cacheKey, lessons, this.defaultTTL);
    return lessons;
  }

  // Optimized users get
  async getAllUsers() {
    const cacheKey = 'users:all:optimized';
    const cached = this.cache.get(cacheKey);
    if (cached) {
      return cached;
    }

    const usersRef = ref(db, 'users');
    const snapshot = await get(usersRef);
    const data = snapshot.val();
    
    const users = data ? Object.keys(data).map(key => ({
      _id: key,
      ...data[key]
    })) : [];

    this.cache.set(cacheKey, users, this.defaultTTL);
    return users;
  }

  // Optimized create operations with cache invalidation
  async createCourse(courseData) {
    const coursesRef = ref(db, 'courses');
    const newCourseRef = push(coursesRef);
    const courseWithId = {
      ...courseData,
      _id: newCourseRef.key,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    await set(newCourseRef, courseWithId);
    
    // Clear relevant caches
    this.cache.clear('courses');
    
    return { _id: newCourseRef.key, ...courseWithId };
  }

  async createLesson(lessonData) {
    const lessonsRef = ref(db, 'lessons');
    const newLessonRef = push(lessonsRef);
    const lessonWithId = {
      ...lessonData,
      _id: newLessonRef.key,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    await set(newLessonRef, lessonWithId);
    
    // Clear relevant caches
    this.cache.clear('lessons');
    this.cache.clear(`lessons:course:${lessonData.courseId}`);
    
    return { _id: newLessonRef.key, ...lessonWithId };
  }

  // Optimized update operations
  async updateCourse(courseId, updateData) {
    const courseRef = ref(db, `courses/${courseId}`);
    const updatedData = {
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    
    await set(courseRef, updatedData);
    
    // Clear relevant caches
    this.cache.clear('courses');
    
    return { _id: courseId, ...updatedData };
  }

  async updateLesson(lessonId, updateData) {
    const lessonRef = ref(db, `lessons/${lessonId}`);
    const updatedData = {
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    
    await set(lessonRef, updatedData);
    
    // Clear relevant caches
    this.cache.clear('lessons');
    
    return { _id: lessonId, ...updatedData };
  }

  // Optimized delete operations
  async deleteCourse(courseId) {
    const courseRef = ref(db, `courses/${courseId}`);
    await remove(courseRef);
    
    // Clear relevant caches
    this.cache.clear('courses');
    this.cache.clear('lessons'); // Lessons might reference this course
    
    return { _id: courseId };
  }

  async deleteLesson(lessonId) {
    const lessonRef = ref(db, `lessons/${lessonId}`);
    await remove(lessonRef);
    
    // Clear relevant caches
    this.cache.clear('lessons');
    
    return { _id: lessonId };
  }

  // Quick health check
  async healthCheck() {
    const cacheKey = 'health:check';
    const cached = this.cache.get(cacheKey);
    if (cached) {
      return cached;
    }

    try {
      const testRef = ref(db, '.info/connected');
      const testSnapshot = await get(testRef);
      const isConnected = testSnapshot.val();
      
      const result = {
        connected: isConnected,
        timestamp: new Date().toISOString(),
        cacheSize: this.cache.size()
      };
      
      this.cache.set(cacheKey, result, 30000); // 30 seconds
      return result;
    } catch (error) {
      return {
        connected: false,
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }

  // Cache management
  clearCache(pattern = null) {
    this.cache.clear(pattern);
  }

  getCacheStats() {
    return {
      size: this.cache.size(),
      keys: this.cache.keys()
    };
  }
}

// Singleton instance
const optimizedFirebase = new OptimizedFirebase();

export default optimizedFirebase;
