import { db } from "./firebase.js";
import { 
  ref, 
  push, 
  get, 
  set, 
  update, 
  remove, 
  query, 
  orderByChild, 
  equalTo 
} from "firebase/database";

// Helper function to convert Firebase snapshot to object
const snapshotToObject = (snapshot) => {
  const data = snapshot.val();
  if (!data) return null;
  
  // Convert Firebase object to array
  return Object.keys(data).map(key => ({
    _id: key,
    ...data[key]
  }));
};

// Database health check
export async function checkDatabaseHealth() {
  try {
    const testRef = ref(db, '.info/connected');
    const snapshot = await get(testRef);
    const isConnected = snapshot.val();
    
    if (isConnected) {
      // Try to read from courses to verify database access
      const coursesRef = ref(db, 'courses');
      await get(coursesRef);
      
      return {
        status: "healthy",
        message: "Firebase Realtime Database is connected and accessible",
        type: "Firebase Realtime Database"
      };
    } else {
      return {
        status: "unhealthy",
        message: "Firebase Realtime Database is not connected",
        type: "Firebase Realtime Database"
      };
    }
  } catch (error) {
    return {
      status: "unhealthy",
      message: `Database connection failed: ${error.message}`,
      type: "Firebase Realtime Database",
      error: error.message
    };
  }
}

// Course operations with admin auth
export async function createCourse(courseData) {
  try {
    // Get admin auth for write operations
    const { getAdminAuth } = await import("@/lib/api/admin");
    const adminUser = await getAdminAuth();
    
    if (!adminUser) {
      throw new Error("Admin authentication required");
    }
    
    const coursesRef = ref(db, 'courses');
    const newCourseRef = push(coursesRef);
    const courseWithId = {
      ...courseData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    await set(newCourseRef, courseWithId);
    return { _id: newCourseRef.key, ...courseWithId };
  } catch (error) {
    console.error("Error creating course:", error);
    throw error;
  }
}

export async function getAllCourses() {
  try {
    const coursesRef = ref(db, 'courses');
    const snapshot = await get(coursesRef);
    const courses = snapshotToObject(snapshot);
    return courses || [];
  } catch (error) {
    console.error("Error getting courses:", error);
    throw error;
  }
}

export async function getCourseById(courseId) {
  try {
    const courseRef = ref(db, `courses/${courseId}`);
    const snapshot = await get(courseRef);
    const course = snapshot.val();
    if (!course) return null;
    return { _id: courseId, ...course };
  } catch (error) {
    console.error("Error getting course:", error);
    throw error;
  }
}

export async function updateCourse(courseId, updateData) {
  try {
    // Get Firebase authentication for admin operations
    const { getFirebaseAuth } = await import("@/lib/api/admin");
    const adminUser = await getFirebaseAuth();
    
    if (!adminUser) {
      throw new Error("Admin authentication required. Please create admin@bitsoft.com user in Firebase Console.");
    }
    
    const courseRef = ref(db, `courses/${courseId}`);
    const updatedData = {
      ...updateData,
      updatedAt: new Date().toISOString(),
      updatedBy: adminUser.uid
    };
    await update(courseRef, updatedData);
    return true;
  } catch (error) {
    console.error("Error updating course:", error);
    throw error;
  }
}

export async function deleteCourse(courseId) {
  try {
    // Get Firebase authentication for admin operations
    const { getFirebaseAuth } = await import("@/lib/api/admin");
    const adminUser = await getFirebaseAuth();
    
    if (!adminUser) {
      throw new Error("Admin authentication required. Please create admin@bitsoft.com user in Firebase Console.");
    }
    
    const courseRef = ref(db, `courses/${courseId}`);
    await remove(courseRef);
    
    // Also delete all lessons for this course
    const lessonsRef = ref(db, 'lessons');
    const snapshot = await get(lessonsRef);
    const lessons = snapshot.val();
    
    if (lessons) {
      const lessonUpdates = {};
      Object.entries(lessons).forEach(([lessonId, lesson]) => {
        if (lesson.courseId === courseId) {
          lessonUpdates[`lessons/${lessonId}`] = null;
        }
      });
      
      if (Object.keys(lessonUpdates).length > 0) {
        await update(ref(db), lessonUpdates);
      }
    }
    
    return true;
  } catch (error) {
    console.error("Error deleting course:", error);
    throw error;
  }
}

// Lesson operations with authentication
export async function createLesson(lessonData) {
  try {
    // Get Firebase authentication for admin operations
    const { getFirebaseAuth } = await import("@/lib/api/admin");
    const adminUser = await getFirebaseAuth();
    
    if (!adminUser) {
      throw new Error("Admin authentication required. Please create admin@bitsoft.com user in Firebase Console.");
    }
    
    const lessonsRef = ref(db, 'lessons');
    const newLessonRef = push(lessonsRef);
    const lessonWithId = {
      ...lessonData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: adminUser.uid
    };
    await set(newLessonRef, lessonWithId);
    return { _id: newLessonRef.key, ...lessonWithId };
  } catch (error) {
    console.error("Error creating lesson:", error);
    throw error;
  }
}

export async function getLessonsByCourseId(courseId) {
  try {
    const lessonsRef = ref(db, 'lessons');
    // Simple approach: get all lessons and filter in JavaScript
    const snapshot = await get(lessonsRef);
    const lessons = snapshotToObject(snapshot);
    
    // Filter by courseId in JavaScript instead of Firebase query
    const filteredLessons = lessons ? lessons.filter(lesson => lesson.courseId === courseId) : [];
    
    // Sort by sortOrder
    return filteredLessons.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
  } catch (error) {
    console.error("Error getting lessons:", error);
    throw error;
  }
}

export async function getLessonById(lessonId) {
  try {
    const lessonRef = ref(db, `lessons/${lessonId}`);
    const snapshot = await get(lessonRef);
    const lesson = snapshot.val();
    if (!lesson) return null;
    return { _id: lessonId, ...lesson };
  } catch (error) {
    console.error("Error getting lesson:", error);
    throw error;
  }
}

export async function updateLesson(lessonId, updateData) {
  try {
    const lessonRef = ref(db, `lessons/${lessonId}`);
    const updatedData = {
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    await update(lessonRef, updatedData);
    return true;
  } catch (error) {
    console.error("Error updating lesson:", error);
    throw error;
  }
}

export async function deleteLesson(lessonId) {
  try {
    const lessonRef = ref(db, `lessons/${lessonId}`);
    await remove(lessonRef);
    return true;
  } catch (error) {
    console.error("Error deleting lesson:", error);
    throw error;
  }
}

// Aliases for backward compatibility
export async function updateFirebaseLesson(lessonId, updateData) {
  return await updateLesson(lessonId, updateData);
}

export async function deleteFirebaseLesson(lessonId) {
  return await deleteLesson(lessonId);
}

// User operations
export async function createUser(userData) {
  try {
    const usersRef = ref(db, 'users');
    const newUserRef = push(usersRef);
    const userWithId = {
      ...userData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    await set(newUserRef, userWithId);
    return { _id: newUserRef.key, ...userWithId };
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

export async function getAllUsers() {
  try {
    const usersRef = ref(db, 'users');
    const snapshot = await get(usersRef);
    const users = snapshotToObject(snapshot);
    return users || [];
  } catch (error) {
    console.error("Error getting users:", error);
    throw error;
  }
}

export async function getUserById(userId) {
  try {
    const userRef = ref(db, `users/${userId}`);
    const snapshot = await get(userRef);
    const user = snapshot.val();
    if (!user) return null;
    return { _id: userId, ...user };
  } catch (error) {
    console.error("Error getting user by ID:", error);
    throw error;
  }
}

export async function getUserByEmail(email) {
  try {
    const usersRef = ref(db, 'users');
    const snapshot = await get(usersRef);
    const users = snapshotToObject(snapshot);
    
    if (!users) return null;
    
    // Find user by email
    const userEntries = Object.entries(users);
    for (const [userId, userData] of userEntries) {
      if (userData.email === email.toLowerCase()) {
        return { _id: userId, ...userData };
      }
    }
    
    return null;
  } catch (error) {
    console.error("Error getting user by email:", error);
    throw error;
  }
}

export async function updateUser(userId, updateData) {
  try {
    const userRef = ref(db, `users/${userId}`);
    const updatedData = {
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    await update(userRef, updatedData);
    return true;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}

export async function deleteUser(userId) {
  try {
    const userRef = ref(db, `users/${userId}`);
    await remove(userRef);
    return true;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
}

export async function createProgress(progressData) {
  try {
    const progressRef = ref(db, 'progress');
    const newProgressRef = push(progressRef);
    const progressWithId = {
      ...progressData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    await set(newProgressRef, progressWithId);
    return { _id: newProgressRef.key, ...progressWithId };
  } catch (error) {
    console.error("Error creating progress:", error);
    throw error;
  }
}

export async function getUserProgress(userId) {
  try {
    const progressRef = ref(db, 'progress');
    const progressQuery = query(progressRef, orderByChild('userId'), equalTo(userId));
    const snapshot = await get(progressQuery);
    const progress = snapshotToObject(snapshot);
    return progress || [];
  } catch (error) {
    console.error("Error getting user progress:", error);
    throw error;
  }
}

export async function updateProgress(progressId, updateData) {
  try {
    const progressRef = ref(db, `progress/${progressId}`);
    const updatedData = {
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    await update(progressRef, updatedData);
    return true;
  } catch (error) {
    console.error("Error updating progress:", error);
    throw error;
  }
}
