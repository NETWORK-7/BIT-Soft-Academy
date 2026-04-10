
"use client";
import React, { useEffect, useState } from "react";
import { Layers, PlusCircle, Video, Edit2, Trash2, Search, Clock, Play } from "lucide-react";

const AdminLessons = () => {
  const [courses, setCourses] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [duration, setDuration] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingLesson, setEditingLesson] = useState(null);

  useEffect(() => {
    fetch("/api/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data.courses || []));
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      setLoading(true);
      fetch(`/api/lessons?courseId=${selectedCourse}`)
        .then((res) => res.json())
        .then((data) => {
          setLessons(data.lessons || []);
          setLoading(false);
        });
    } else {
      setLessons([]);
    }
  }, [selectedCourse]);

  const handleAddLesson = async (e) => {
    e.preventDefault();
    setLoading(true);
    const lessonData = {
      courseId: selectedCourse,
      title,
      content,
      videoUrl,
      duration: parseInt(duration) || 0,
      sortOrder: parseInt(sortOrder) || lessons.length + 1
    };

    try {
      const res = await fetch("/api/lessons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lessonData),
      });
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      console.log("Lesson creation response:", data);
      
      if (data.success) {
        setLessons([...lessons, data.lesson]);
        setTitle("");
        setContent("");
        setVideoUrl("");
        setDuration("");
        setSortOrder("");
        alert("Lesson created successfully!");
      } else {
        alert(`Failed to create lesson: ${data.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error creating lesson:", error);
      alert(`Error creating lesson: ${error.message}`);
    }
    setLoading(false);
  };

  const handleUpdateLesson = async (e) => {
    e.preventDefault();
    setLoading(true);
    const lessonData = {
      title,
      content,
      videoUrl,
      duration: parseInt(duration) || 0,
      sortOrder: parseInt(sortOrder) || 0
    };

    const res = await fetch(`/api/lessons?lessonId=${editingLesson._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lessonData),
    });
    const data = await res.json();
    if (data.success) {
      setLessons(lessons.map(l => l._id === editingLesson._id ? { ...l, ...lessonData } : l));
      setEditingLesson(null);
      setTitle("");
      setContent("");
      setVideoUrl("");
      setDuration("");
      setSortOrder("");
    }
    setLoading(false);
  };

  const handleDeleteLesson = async (lessonId) => {
    if (!confirm("Are you sure you want to delete this lesson?")) return;
    
    setLoading(true);
    try {
      const res = await fetch(`/api/lessons?lessonId=${lessonId}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setLessons(lessons.filter(l => l._id !== lessonId));
      }
    } catch (error) {
      console.error("Error deleting lesson:", error);
    }
    setLoading(false);
  };

  const handleEditLesson = (lesson) => {
    setEditingLesson(lesson);
    setTitle(lesson.title);
    setContent(lesson.content);
    setVideoUrl(lesson.videoUrl || "");
    setDuration(lesson.duration || "");
    setSortOrder(lesson.sortOrder || "");
  };

  const filteredLessons = lessons.filter(lesson =>
    lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lesson.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  };

  const formatDuration = (minutes) => {
    if (!minutes) return "Not specified";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8 flex items-center gap-2">
            <Layers className="h-8 w-8 text-purple-600" /> 
            {editingLesson ? "Edit Lesson" : "Manage Lessons"}
          </h2>
          
          {/* Course Selection */}
          <div className="mb-6">
            <label className="block mb-2 font-semibold text-gray-700">Select Course:</label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="border p-3 rounded-lg text-lg w-full max-w-md"
            >
              <option value="">-- Select a course --</option>
              {courses.map((course) => (
                <option key={course._id} value={course._id}>{course.title}</option>
              ))}
            </select>
          </div>

          {selectedCourse && (
            <>
              {/* Add/Edit Lesson Form */}
              <form onSubmit={editingLesson ? handleUpdateLesson : handleAddLesson} className="mb-8 p-6 bg-gray-50 rounded-xl">
                <h3 className="text-xl font-semibold mb-4">
                  {editingLesson ? "Edit Lesson" : "Add New Lesson"}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Lesson Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="border p-3 rounded-lg text-lg"
                  />
                  <input
                    type="number"
                    placeholder="Sort Order"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="border p-3 rounded-lg text-lg"
                  />
                  <textarea
                    placeholder="Lesson Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    className="border p-3 rounded-lg text-lg md:col-span-2"
                    rows={4}
                  />
                  <input
                    type="url"
                    placeholder="YouTube Video URL (e.g., https://www.youtube.com/watch?v=xxxxx)"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    className="border p-3 rounded-lg text-lg md:col-span-2"
                  />
                  <input
                    type="number"
                    placeholder="Duration (minutes)"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="border p-3 rounded-lg text-lg"
                  />
                </div>
                <div className="flex gap-3 mt-4">
                  <button type="submit" className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition disabled:opacity-50" disabled={loading}>
                    {loading ? (editingLesson ? "Updating..." : "Adding...") : (editingLesson ? "Update Lesson" : "Add Lesson")}
                  </button>
                  {editingLesson && (
                    <button 
                      type="button" 
                      onClick={() => {
                        setEditingLesson(null);
                        setTitle("");
                        setContent("");
                        setVideoUrl("");
                        setDuration("");
                        setSortOrder("");
                      }}
                      className="bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>

              {/* Search Bar */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search lessons..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Lessons Table */}
              {loading ? (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                  <p className="mt-2 text-gray-500">Loading lessons...</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white rounded-xl shadow">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="py-3 px-4 text-left font-semibold">Order</th>
                        <th className="py-3 px-4 text-left font-semibold">Lesson</th>
                        <th className="py-3 px-4 text-left font-semibold">Duration</th>
                        <th className="py-3 px-4 text-left font-semibold">Video</th>
                        <th className="py-3 px-4 text-center font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredLessons
                        .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
                        .map((lesson) => (
                        <tr key={lesson._id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm font-semibold">
                              #{lesson.sortOrder || "0"}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div>
                              <div className="font-semibold text-gray-900">{lesson.title}</div>
                              <div className="text-sm text-gray-600 max-w-xs truncate">{lesson.content}</div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Clock className="h-4 w-4" />
                              {formatDuration(lesson.duration)}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            {lesson.videoUrl ? (
                              <div className="flex items-center gap-2">
                                <Video className="h-4 w-4 text-green-600" />
                                <a 
                                  href={lesson.videoUrl} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-800 text-sm underline flex items-center gap-1"
                                >
                                  <Play className="h-3 w-3" />
                                  Watch
                                </a>
                              </div>
                            ) : (
                              <span className="text-gray-400 text-sm">No video</span>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex justify-center gap-2">
                              <button
                                onClick={() => handleEditLesson(lesson)}
                                className="text-blue-600 hover:bg-blue-100 p-2 rounded-lg transition"
                                title="Edit lesson"
                              >
                                <Edit2 className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteLesson(lesson._id)}
                                className="text-red-600 hover:bg-red-100 p-2 rounded-lg transition"
                                title="Delete lesson"
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
                  {filteredLessons.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Layers className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>
                        {searchTerm ? "No lessons found matching your search." : "No lessons found for this course. Add your first lesson above!"}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Statistics */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Layers className="h-5 w-5 text-purple-600" />
                    <span className="font-semibold text-purple-900">Total Lessons</span>
                  </div>
                  <p className="text-2xl font-bold text-purple-600 mt-1">{lessons.length}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Video className="h-5 w-5 text-green-600" />
                    <span className="font-semibold text-green-900">With Videos</span>
                  </div>
                  <p className="text-2xl font-bold text-green-600 mt-1">
                    {lessons.filter(l => l.videoUrl).length}
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <span className="font-semibold text-blue-900">Total Duration</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-600 mt-1">
                    {formatDuration(lessons.reduce((total, l) => total + (l.duration || 0), 0))}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminLessons;
