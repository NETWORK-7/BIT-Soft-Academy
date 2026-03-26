
"use client";
import React, { useEffect, useState } from "react";
import { User, Mail, Calendar, Shield, Trash2, Edit2, Plus, Search } from "lucide-react";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddUser, setShowAddUser] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    displayName: "",
    role: "student"
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      if (data.success) {
        setUsers(data.users || []);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
    setLoading(false);
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setUsers([...users, data.user]);
        setFormData({ email: "", displayName: "", role: "student" });
        setShowAddUser(false);
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
    setLoading(false);
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch("/api/admin/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: editingUser._id, ...formData }),
      });
      const data = await res.json();
      if (data.success) {
        setUsers(users.map(u => u._id === editingUser._id ? { ...u, ...formData } : u));
        setEditingUser(null);
        setFormData({ email: "", displayName: "", role: "student" });
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
    setLoading(false);
  };

  const handleDeleteUser = async (userId) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/users?userId=${userId}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setUsers(users.filter(u => u._id !== userId));
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
    setLoading(false);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setFormData({
      email: user.email || "",
      displayName: user.displayName || user.name || "",
      role: user.role || "student"
    });
  };

  const filteredUsers = users.filter(user => 
    (user.displayName || user.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.email || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown";
    return new Date(dateString).toLocaleDateString();
  };

  const getRoleBadge = (role) => {
    const colors = {
      admin: "bg-purple-100 text-purple-800",
      instructor: "bg-blue-100 text-blue-800",
      student: "bg-green-100 text-green-800"
    };
    return colors[role] || colors.student;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
              <User className="h-8 w-8 text-green-600" /> User Management
            </h2>
            <button
              onClick={() => setShowAddUser(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition flex items-center gap-2"
            >
              <Plus className="h-5 w-5" /> Add User
            </button>
          </div>

          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
          {(showAddUser || editingUser) && (
            <div className="mb-8 p-6 bg-gray-50 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">
                {editingUser ? "Edit User" : "Add New User"}
              </h3>
              <form onSubmit={editingUser ? handleUpdateUser : handleAddUser}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                    className="border p-3 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Display Name"
                    value={formData.displayName}
                    onChange={(e) => setFormData({...formData, displayName: e.target.value})}
                    required
                    className="border p-3 rounded-lg"
                  />
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    className="border p-3 rounded-lg"
                  >
                    <option value="student">Student</option>
                    <option value="instructor">Instructor</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="flex gap-3 mt-4">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                    disabled={loading}
                  >
                    {loading ? "Saving..." : (editingUser ? "Update" : "Add")}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddUser(false);
                      setEditingUser(null);
                      setFormData({ email: "", displayName: "", role: "student" });
                    }}
                    className="bg-gray-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-600 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
              <p className="mt-2 text-gray-500">Loading users...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-xl shadow">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="py-3 px-4 text-left font-semibold">User</th>
                    <th className="py-3 px-4 text-left font-semibold">Email</th>
                    <th className="py-3 px-4 text-left font-semibold">Role</th>
                    <th className="py-3 px-4 text-left font-semibold">Joined</th>
                    <th className="py-3 px-4 text-center font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user._id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                            {(user.displayName || user.name || "U").charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">
                              {user.displayName || user.name || "Unknown"}
                            </div>
                            <div className="text-sm text-gray-500">ID: {user._id.slice(-6)}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{user.email || "No email"}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getRoleBadge(user.role)}`}>
                          <Shield className="inline h-3 w-3 mr-1" />
                          {user.role || "student"}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="h-4 w-4" />
                          {formatDate(user.createdAt)}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleEditUser(user)}
                            className="text-blue-600 hover:bg-blue-100 p-2 rounded-lg transition"
                            title="Edit user"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user._id)}
                            className="text-red-600 hover:bg-red-100 p-2 rounded-lg transition"
                            title="Delete user"
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
              {filteredUsers.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <User className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>
                    {searchTerm ? "No users found matching your search." : "No users found. Add your first user above!"}
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-blue-600" />
                <span className="font-semibold text-blue-900">Total Users</span>
              </div>
              <p className="text-2xl font-bold text-blue-600 mt-1">{users.length}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-600" />
                <span className="font-semibold text-green-900">Students</span>
              </div>
              <p className="text-2xl font-bold text-green-600 mt-1">
                {users.filter(u => u.role === 'student').length}
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-purple-600" />
                <span className="font-semibold text-purple-900">Admins/Instructors</span>
              </div>
              <p className="text-2xl font-bold text-purple-600 mt-1">
                {users.filter(u => u.role === 'admin' || u.role === 'instructor').length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
