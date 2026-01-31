import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { databases, account } from '../../lib/appwrite';
import { Query } from 'appwrite';
import { Loader2, LogOut, Trash2, Mail, FileText } from 'lucide-react';
import BlogManagement from './BlogManagement';

const Dashboard = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('messages');
  const navigate = useNavigate();

  useEffect(() => {
    checkSession();
    fetchMessages();
  }, []);

  const checkSession = async () => {
    try {
      await account.get();
    } catch (error) {
      navigate('/admin');
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID,
        [Query.orderDesc('$createdAt')]
      );
      console.log('Appwrite Response:', response); // Debugging
      setMessages(response.documents);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteMessage = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    try {
      await databases.deleteDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID,
        id
      );
      setMessages(messages.filter((msg) => msg.$id !== id));
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const handleLogout = async () => {
    await account.deleteSession('current');
    localStorage.removeItem('isAdmin');
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-gray-400">Manage your portfolio content</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-slate-900 border border-slate-800 hover:border-red-500/50 hover:text-red-400 rounded-lg text-gray-400 transition-all flex items-center gap-2"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 border-b border-slate-800">
            <button
              onClick={() => setActiveTab('messages')}
              className={`px-4 py-3 flex items-center gap-2 border-b-2 transition-colors ${
                activeTab === 'messages'
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              <Mail size={20} />
              Messages
            </button>
            <button
              onClick={() => setActiveTab('blogs')}
              className={`px-4 py-3 flex items-center gap-2 border-b-2 transition-colors ${
                activeTab === 'blogs'
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              <FileText size={20} />
              Blog Posts
            </button>
          </div>
        </header>

        {activeTab === 'messages' ? (
          isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 size={32} className="text-indigo-500 animate-spin" />
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center py-20 bg-slate-900 rounded-2xl border border-slate-800">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800 mb-4">
                <Mail size={32} className="text-gray-500" />
              </div>
              <h3 className="text-xl font-medium text-white">No messages yet</h3>
              <p className="text-gray-400">New messages will appear here.</p>
            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-950 border-b border-slate-800">
                    <tr>
                      <th className="px-6 py-4 text-sm font-medium text-gray-400">Date</th>
                      <th className="px-6 py-4 text-sm font-medium text-gray-400">Name</th>
                      <th className="px-6 py-4 text-sm font-medium text-gray-400">Email</th>
                      <th className="px-6 py-4 text-sm font-medium text-gray-400 w-1/2">Message</th>
                      <th className="px-6 py-4 text-sm font-medium text-gray-400 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {messages.map((msg) => (
                      <tr key={msg.$id} className="hover:bg-slate-800/50 transition-colors">
                        <td className="px-6 py-4 text-gray-400 text-sm whitespace-nowrap">
                          {new Date(msg.$createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-white font-medium">{msg.name}</td>
                        <td className="px-6 py-4 text-indigo-400">{msg.email}</td>
                        <td className="px-6 py-4 text-gray-300 text-sm leading-relaxed min-w-[300px]">
                          {msg.message}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => deleteMessage(msg.$id)}
                            className="p-2 hover:bg-red-500/10 text-gray-500 hover:text-red-400 rounded-lg transition-colors"
                            title="Delete message"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )
        ) : (
          <BlogManagement />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
