

"use client";
import React, { useState, useEffect } from "react";
import { BookOpenText, Trash2, Video, Plus, Edit2 } from "lucide-react";

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [instructor, setInstructor] = useState("");
  const [duration, setDuration] = useState("");
  const [points, setPoints] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  useEffect(() => {
    fetch("/api/courses")
      .then((res) => res.json())
      .then((data) => {
        setCourses((data.courses || []).filter((c) => c._id));
      });
  }, []);

  const handleAddCourse = async (e) => {
    e.preventDefault();
    setLoading(true);
    const courseData = {
      title,
      description,
      videoUrl,
      instructor,
      duration,
      points: parseInt(points) || 0,
      tags: ["Frontend"],
      rating: 4.5,
      image: `https://cdn-icons-png.flaticon.com/512/919/919${Math.floor(Math.random() * 900 + 100)}.png`
    };

    const res = await fetch("/api/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(courseData),
    });
    const data = await res.json();
    if (data.success) {
      setCourses([...courses, data.course]);
      setTitle("");
      setDescription("");
      setVideoUrl("");
      setInstructor("");
      setDuration("");
      setPoints("");
    }
    setLoading(false);
  };

  const handleDeleteCourse = async (id) => {
    if (!confirm("Are you sure you want to delete this course?")) return;
    
    setLoading(true);
    try {
      const res = await fetch(`/api/courses/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setCourses(courses.filter((c) => c._id !== id));
      }
    } catch (error) {
      console.error("Error deleting course:", error);
    }
    setLoading(false);
  };

  const handleEditCourse = (course) => {
    setEditingCourse(course);
    setTitle(course.title);
    setDescription(course.description);
    setVideoUrl(course.videoUrl || "");
    setInstructor(course.instructor || "");
    setDuration(course.duration || "");
    setPoints(course.points || "");
  };

  const handleUpdateCourse = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const courseData = {
      title,
      description,
      videoUrl,
      instructor,
      duration,
      points: parseInt(points) || 0,
    };

    const res = await fetch(`/api/courses/${editingCourse._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(courseData),
    });
    const data = await res.json();
    if (data.success) {
      setCourses(courses.map(c => c._id === editingCourse._id ? { ...c, ...courseData } : c));
      setEditingCourse(null);
      setTitle("");
      setDescription("");
      setVideoUrl("");
      setInstructor("");
      setDuration("");
      setPoints("");
    }
    setLoading(false);
  };

  const extractYouTubeId = (url) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8 flex items-center gap-2">
            <BookOpenText className="h-8 w-8 text-blue-600" /> 
            {editingCourse ? "Edit Course" : "Manage Courses"}
          </h2>
          
          <form onSubmit={editingCourse ? handleUpdateCourse : handleAddCourse} className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Course Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="border p-3 rounded-lg text-lg"
              />
              <input
                type="text"
                placeholder="Instructor Name"
                value={instructor}
                onChange={(e) => setInstructor(e.target.value)}
                className="border p-3 rounded-lg text-lg"
              />
              <textarea
                placeholder="Course Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="border p-3 rounded-lg text-lg md:col-span-2"
                rows={3}
              />
              <input
                type="url"
                placeholder="YouTube Video URL (e.g., https://www.youtube.com/watch?v=xxxxx)"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                className="border p-3 rounded-lg text-lg md:col-span-2"
              />
              <input
                type="text"
                placeholder="Duration (e.g., 8 hours)"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="border p-3 rounded-lg text-lg"
              />
              <input
                type="number"
                placeholder="Points"
                value={points}
                onChange={(e) => setPoints(e.target.value)}
                className="border p-3 rounded-lg text-lg"
              />
            </div>
            
            <div className="flex gap-3 mt-4">
              <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50" disabled={loading}>
                {loading ? (editingCourse ? "Updating..." : "Adding...") : (editingCourse ? "Update Course" : "Add Course")}
              </button>
              {editingCourse && (
                <button 
                  type="button" 
                  onClick={() => {
                    setEditingCourse(null);
                    setTitle("");
                    setDescription("");
                    setVideoUrl("");
                    setInstructor("");
                    setDuration("");
                    setPoints("");
                  }}
                  className="bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-xl shadow">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-3 px-4 text-left font-semibold">Course</th>
                  <th className="py-3 px-4 text-left font-semibold">Instructor</th>
                  <th className="py-3 px-4 text-left font-semibold">Duration</th>
                  <th className="py-3 px-4 text-left font-semibold">Points</th>
                  <th className="py-3 px-4 text-left font-semibold">Video</th>
                  <th className="py-3 px-4 text-center font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course._id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-semibold text-gray-900">{course.title}</div>
                        <div className="text-sm text-gray-600 max-w-xs truncate">{course.description}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">{course.instructor || "Not specified"}</td>
                    <td className="py-3 px-4">{course.duration || "Not specified"}</td>
                    <td className="py-3 px-4">{course.points || 0}</td>
                    <td className="py-3 px-4">
                      {course.videoUrl ? (
                        <div className="flex items-center gap-2">
                          <Video className="h-4 w-4 text-green-600" />
                          <a 
                            href={course.videoUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 text-sm underline"
                          >
                            View Video
                          </a>
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm">No video</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleEditCourse(course)}
                          className="text-blue-600 hover:bg-blue-100 p-2 rounded-lg transition"
                          title="Edit course"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteCourse(course._id)}
                          className="text-red-600 hover:bg-red-100 p-2 rounded-lg transition"
                          title="Delete course"
                          disabled={loading}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {courses.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <BookOpenText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No courses found. Add your first course above!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCourses;
