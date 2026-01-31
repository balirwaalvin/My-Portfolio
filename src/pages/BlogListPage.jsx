import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import SpotlightCard from '../components/ui/SpotlightCard';
import { blogOperations } from '../lib/appwrite';
import { blogsData } from '../data/blogs'; // Keep as fallback


const BlogListPage = () => {
  const [blogs, setBlogs] = useState(blogsData); // Use static data as default
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      const appwriteBlogs = await blogOperations.getAllPublishedBlogs();
      if (appwriteBlogs.length > 0) {
        // Map Appwrite documents to blog format
        const formattedBlogs = appwriteBlogs.map(blog => ({
          id: blog.slug || blog.$id,
          title: blog.title,
          excerpt: blog.excerpt,
          coverImage: blog.coverImage,
          date: blog.createdAt || blog.$createdAt,
          readTime: blog.readTime,
          tags: blog.tags || [],
          author: blog.author
        }));
        setBlogs(formattedBlogs);
      }
    } catch (error) {
      console.error('Error loading blogs from Appwrite:', error);
      // Fallback to static data is already set
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link 
            to="/" 
            className="inline-flex items-center text-indigo-400 hover:text-indigo-300 mb-6 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Home
          </Link>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Blog
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400 max-w-2xl"
          >
            Thoughts, tutorials, and insights on web development, design, and technology.
          </motion.p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogsData.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link to={`/blog/${blog.id}`}>
                <SpotlightCard className="h-full group cursor-pointer">
                  {/* Cover Image */}
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={blog.coverImage}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar size={16} />
                        {new Date(blog.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={16} />
                        {blog.readTime}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">
                      {blog.title}
                    </h2>
                    
                    <p className="text-gray-400 mb-4 line-clamp-2">
                      {blog.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {blog.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs font-medium text-indigo-300 bg-indigo-500/10 rounded-full border border-indigo-500/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </SpotlightCard>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogListPage;
