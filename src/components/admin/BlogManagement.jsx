import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { blogOperations } from '../../lib/appwrite';
import BlogEditor from './BlogEditor';

const BlogManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      setLoading(true);
      const allBlogs = await blogOperations.getAllBlogs();
      setBlogs(allBlogs);
    } catch (error) {
      console.error('Error loading blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNew = () => {
    setEditingBlogId(null);
    setShowEditor(true);
  };

  const handleEdit = (blogId) => {
    setEditingBlogId(blogId);
    setShowEditor(true);
  };

  const handleDelete = async (blogId) => {
    try {
      await blogOperations.deleteBlog(blogId);
      setDeleteConfirm(null);
      loadBlogs();
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  const handleEditorClose = () => {
    setShowEditor(false);
    setEditingBlogId(null);
    loadBlogs();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-400">Loading blogs...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Blog Posts</h2>
          <p className="text-gray-400 mt-1">Manage your blog posts</p>
        </div>
        <button
          onClick={handleCreateNew}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
        >
          <Plus size={20} />
          Create New Post
        </button>
      </div>

      {/* Blog List */}
      {blogs.length === 0 ? (
        <div className="text-center py-12 bg-slate-800/50 rounded-lg border border-slate-700">
          <p className="text-gray-400 mb-4">No blog posts yet</p>
          <button
            onClick={handleCreateNew}
            className="text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Create your first post
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="text-left py-4 px-4 text-gray-400 font-medium">Title</th>
                <th className="text-left py-4 px-4 text-gray-400 font-medium">Status</th>
                <th className="text-left py-4 px-4 text-gray-400 font-medium">Date</th>
                <th className="text-right py-4 px-4 text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <motion.tr
                  key={blog.$id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-b border-slate-800 hover:bg-slate-800/30 transition-colors"
                >
                  <td className="py-4 px-4">
                    <div>
                      <div className="text-white font-medium">{blog.title}</div>
                      <div className="text-sm text-gray-500 truncate max-w-md">
                        {blog.excerpt}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    {blog.published ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-sm">
                        <CheckCircle size={14} />
                        Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-500/10 text-yellow-400 rounded-full text-sm">
                        <XCircle size={14} />
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-gray-400">
                    {new Date(blog.createdAt || blog.$createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(blog.$id)}
                        className="p-2 text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(blog.$id)}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-900 rounded-xl border border-slate-800 p-6 max-w-md w-full"
          >
            <h3 className="text-xl font-bold text-white mb-4">Delete Blog Post?</h3>
            <p className="text-gray-400 mb-6">
              Are you sure you want to delete this blog post? This action cannot be undone.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Blog Editor Modal */}
      {showEditor && (
        <BlogEditor
          blogId={editingBlogId}
          onClose={handleEditorClose}
          onSave={handleEditorClose}
        />
      )}
    </div>
  );
};

export default BlogManagement;
