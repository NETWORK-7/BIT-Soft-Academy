"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  MessageCircle,
  Trash2,
  Edit2,
  Star,
  Eye,
  EyeOff,
  Check,
  X,
  Loader2,
  ArrowLeft,
  Shield,
  User,
  Search,
} from "lucide-react";

export default function AdminCommentsPage() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [editingComment, setEditingComment] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    text: "",
    rating: 0,
    isPublic: true,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [actionLoading, setActionLoading] = useState({});
  const router = useRouter();

  useEffect(() => {
    checkAdminAuth();
  }, []);

  const checkAdminAuth = async () => {
    try {
      const response = await fetch("/api/admin-status");
      const data = await response.json();

      if (!data.adminAuthenticated) {
        router.push("/admin/sign-in");
        return;
      }

      setIsAuthenticated(true);
      fetchComments();
    } catch (error) {
      console.error("Auth check failed:", error);
      router.push("/admin/sign-in");
    }
  };

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/comments?admin=true");
      const data = await response.json();

      if (data.success) {
        setComments(data.comments || []);
      } else if (response.status === 401) {
        router.push("/admin/sign-in");
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (commentId) => {
    if (!confirm("Are you sure you want to delete this comment?")) return;

    setActionLoading({ ...actionLoading, [commentId]: "delete" });

    try {
      const response = await fetch(`/api/comments?id=${commentId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        setComments(comments.filter((c) => c._id !== commentId));
      } else {
        alert(data.error || "Failed to delete comment");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      alert("Failed to delete comment");
    } finally {
      setActionLoading({ ...actionLoading, [commentId]: null });
    }
  };

  const handleEdit = (comment) => {
    setEditingComment(comment._id);
    setEditForm({
      name: comment.name || "",
      email: comment.email || "",
      text: comment.text || "",
      rating: comment.rating || 0,
      isPublic: comment.isPublic !== false,
    });
  };

  const handleSaveEdit = async (commentId) => {
    setActionLoading({ ...actionLoading, [commentId]: "edit" });

    try {
      const response = await fetch("/api/comments", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: commentId,
          ...editForm,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setComments(
          comments.map((c) =>
            c._id === commentId
              ? { ...c, ...editForm, updatedAt: new Date().toISOString() }
              : c
          )
        );
        setEditingComment(null);
      } else {
        alert(data.error || "Failed to update comment");
      }
    } catch (error) {
      console.error("Error updating comment:", error);
      alert("Failed to update comment");
    } finally {
      setActionLoading({ ...actionLoading, [commentId]: null });
    }
  };

  const handleCancelEdit = () => {
    setEditingComment(null);
    setEditForm({
      name: "",
      email: "",
      text: "",
      rating: 0,
      isPublic: true,
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderStars = (rating, interactive = false, onChange = null) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={interactive ? () => onChange(star) : undefined}
            className={interactive ? "cursor-pointer hover:scale-110" : "cursor-default"}
            disabled={!interactive}
          >
            <Star
              className={`w-4 h-4 ${
                star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  const filteredComments = comments.filter(
    (c) =>
      c.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.text?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    total: comments.length,
    public: comments.filter((c) => c.isPublic !== false).length,
    hidden: comments.filter((c) => c.isPublic === false).length,
    withEmail: comments.filter((c) => c.email).length,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading comments...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <a
              href="/admin"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Admin
            </a>
          </div>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-blue-600 rounded-full p-3">
                <MessageCircle className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Manage Comments</h1>
                <p className="text-gray-600">Review and moderate user feedback</p>
              </div>
            </div>
            <div className="bg-white rounded-lg px-4 py-2 shadow-sm flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-600" />
              <span className="text-sm text-gray-600">Admin Access</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-sm text-gray-500">Total Comments</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="text-2xl font-bold text-green-600">{stats.public}</div>
            <div className="text-sm text-gray-500">Public</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="text-2xl font-bold text-orange-600">{stats.hidden}</div>
            <div className="text-sm text-gray-500">Hidden</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{stats.withEmail}</div>
            <div className="text-sm text-gray-500">With Email</div>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search comments by name, email, or content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
            />
          </div>
        </div>

        {/* Comments List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">
              Comments ({filteredComments.length})
            </h2>
            <button
              onClick={fetchComments}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
            >
              <Loader2 className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>

          <div className="divide-y divide-gray-100">
            {filteredComments.length === 0 ? (
              <div className="p-12 text-center">
                <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No comments found</p>
              </div>
            ) : (
              filteredComments.map((comment) => (
                <div
                  key={comment._id}
                  className={`p-6 hover:bg-gray-50 transition-colors ${
                    comment.isPublic === false ? "bg-orange-50/50" : ""
                  }`}
                >
                  {editingComment === comment._id ? (
                    // Edit Mode
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Name
                          </label>
                          <input
                            type="text"
                            value={editForm.name}
                            onChange={(e) =>
                              setEditForm({ ...editForm, name: e.target.value })
                            }
                            className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                          </label>
                          <input
                            type="email"
                            value={editForm.email}
                            onChange={(e) =>
                              setEditForm({ ...editForm, email: e.target.value })
                            }
                            className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Rating
                        </label>
                        {renderStars(editForm.rating, true, (r) =>
                          setEditForm({ ...editForm, rating: r })
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Comment
                        </label>
                        <textarea
                          value={editForm.text}
                          onChange={(e) =>
                            setEditForm({ ...editForm, text: e.target.value })
                          }
                          rows={3}
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none resize-none"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={`public-${comment._id}`}
                          checked={editForm.isPublic}
                          onChange={(e) =>
                            setEditForm({ ...editForm, isPublic: e.target.checked })
                          }
                          className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        />
                        <label
                          htmlFor={`public-${comment._id}`}
                          className="text-sm text-gray-700"
                        >
                          Public (visible on website)
                        </label>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSaveEdit(comment._id)}
                          disabled={actionLoading[comment._id] === "edit"}
                          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                        >
                          {actionLoading[comment._id] === "edit" ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Check className="w-4 h-4" />
                          )}
                          Save
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                          <X className="w-4 h-4" />
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    // View Mode
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 flex-wrap">
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="font-semibold text-gray-900">
                                {comment.name || "Anonymous"}
                              </h3>
                              {comment.email && (
                                <span className="text-sm text-gray-500">
                                  ({comment.email})
                                </span>
                              )}
                              {comment.isPublic === false && (
                                <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full flex items-center gap-1">
                                  <EyeOff className="w-3 h-3" />
                                  Hidden
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-3 mt-1">
                              {comment.rating > 0 && renderStars(comment.rating)}
                              <span className="text-sm text-gray-400">
                                {formatDate(comment.createdAt)}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleEdit(comment)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(comment._id)}
                              disabled={actionLoading[comment._id] === "delete"}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                              title="Delete"
                            >
                              {actionLoading[comment._id] === "delete" ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Trash2 className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </div>
                        <p className="mt-3 text-gray-700">{comment.text}</p>
                        {comment.updatedAt !== comment.createdAt && (
                          <p className="mt-2 text-xs text-gray-400">
                            Updated: {formatDate(comment.updatedAt)}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
