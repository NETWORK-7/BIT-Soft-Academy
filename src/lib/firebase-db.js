import { db } from "./firebase";
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  Timestamp 
} from "firebase/firestore";

export const usersCollection = collection(db, "users");
export const coursesCollection = collection(db, "courses");
export const lessonsCollection = collection(db, "lessons");
export const progressCollection = collection(db, "progress");

export function docToPlain(docSnapshot) {
  const data = docSnapshot.data();
  return {
    _id: docSnapshot.id,
    ...data,
    createdAt: data.createdAt?.toDate() || new Date(),
    updatedAt: data.updatedAt?.toDate() || new Date()
  };
}

export async function getAllCourses() {
  try {
    console.log("🔗 Fetching courses from Firebase...");
    const q = query(coursesCollection, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const courses = querySnapshot.docs.map(docToPlain);
    console.log(`✅ Found ${courses.length} courses`);
    return courses;
  } catch (error) {
    console.error("❌ Error fetching courses:", error);
    return [];
  }
}

export async function getCourseById(courseId) {
  try {
    const courseRef = doc(db, "courses", courseId);
    const courseSnap = await getDoc(courseRef);
    if (courseSnap.exists()) {
      return docToPlain(courseSnap);
    }
    return null;
  } catch (error) {
    console.error("❌ Error fetching course:", error);
    return null;
  }
}

export async function getLessonsByCourseId(courseId) {
  try {
    const q = query(
      lessonsCollection, 
      where("courseId", "==", courseId),
      orderBy("sortOrder", "asc"),
      orderBy("createdAt", "asc")
    );
    const querySnapshot = await getDocs(q);
    const lessons = querySnapshot.docs.map(docToPlain);
    return lessons;
  } catch (error) {
    console.error("❌ Error fetching lessons:", error);
    return [];
  }
}

export async function createCourse(courseData) {
  try {
    const courseWithTimestamp = {
      ...courseData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    };
    const docRef = await addDoc(coursesCollection, courseWithTimestamp);
    return { _id: docRef.id, ...courseWithTimestamp };
  } catch (error) {
    console.error("❌ Error creating course:", error);
    throw error;
  }
}

export async function createLesson(lessonData) {
  try {
    const lessonWithTimestamp = {
      ...lessonData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    };
    const docRef = await addDoc(lessonsCollection, lessonWithTimestamp);
    return { _id: docRef.id, ...lessonWithTimestamp };
  } catch (error) {
    console.error("❌ Error creating lesson:", error);
    throw error;
  }
}

export async function updateCourse(courseId, updateData) {
  try {
    const courseRef = doc(db, "courses", courseId);
    await updateDoc(courseRef, {
      ...updateData,
      updatedAt: Timestamp.now()
    });
    return true;
  } catch (error) {
    console.error("❌ Error updating course:", error);
    return false;
  }
}

export async function updateLesson(lessonId, updateData) {
  try {
    const lessonRef = doc(db, "lessons", lessonId);
    await updateDoc(lessonRef, {
      ...updateData,
      updatedAt: Timestamp.now()
    });
    return true;
  } catch (error) {
    console.error("❌ Error updating lesson:", error);
    return false;
  }
}

export async function deleteCourse(courseId) {
  try {
    const courseRef = doc(db, "courses", courseId);
    await deleteDoc(courseRef);
    return true;
  } catch (error) {
    console.error("❌ Error deleting course:", error);
    return false;
  }
}

export async function deleteLesson(lessonId) {
  try {
    const lessonRef = doc(db, "lessons", lessonId);
    await deleteDoc(lessonRef);
    return true;
  } catch (error) {
    console.error("❌ Error deleting lesson:", error);
    return false;
  }
}

export async function getUserByEmail(email) {
  try {
    const q = query(usersCollection, where("email", "==", email), limit(1));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return docToPlain(querySnapshot.docs[0]);
    }
    return null;
  } catch (error) {
    console.error("❌ Error fetching user:", error);
    return null;
  }
}

export async function createUser(userData) {
  try {
    const userWithTimestamp = {
      ...userData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    };
    const docRef = await addDoc(usersCollection, userWithTimestamp);
    return { _id: docRef.id, ...userWithTimestamp };
  } catch (error) {
    console.error("❌ Error creating user:", error);
    throw error;
  }
}

export async function updateUser(userId, updateData) {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      ...updateData,
      updatedAt: Timestamp.now()
    });
    return true;
  } catch (error) {
    console.error("❌ Error updating user:", error);
    return false;
  }
}

export async function getUserProgress(userId) {
  try {
    const q = query(progressCollection, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(docToPlain);
  } catch (error) {
    console.error("❌ Error fetching user progress:", error);
    return [];
  }
}

export async function updateLessonProgress(userId, lessonId, completed) {
  try {
    const q = query(
      progressCollection, 
      where("userId", "==", userId), 
      where("lessonId", "==", lessonId)
    );
    const querySnapshot = await getDocs(q);
    
    const progressData = {
      userId,
      lessonId,
      completed,
      completedAt: completed ? Timestamp.now() : null,
      updatedAt: Timestamp.now()
    };
    
    if (querySnapshot.empty) {
      await addDoc(progressCollection, progressData);
    } else {
      await updateDoc(querySnapshot.docs[0].ref, progressData);
    }
    return true;
  } catch (error) {
    console.error("❌ Error updating lesson progress:", error);
    return false;
  }
}

export async function checkDatabaseHealth() {
  try {
    const q = query(coursesCollection, limit(1));
    await getDocs(q);
    return { status: "healthy", message: "Firebase connection successful" };
  } catch (error) {
    return { 
      status: "error", 
      message: `Firebase connection failed: ${error.message}` 
    };
  }
}
