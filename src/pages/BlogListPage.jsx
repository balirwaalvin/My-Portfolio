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
    <div className="min-h-screen bg-[#050505] pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <Link 
            to="/" 
            className="inline-flex items-center text-red-400 hover:text-red-300 mb-8 transition-colors group"
          >
            <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-red-500 text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">Articles</span>
            <h1 className="text-4xl md:text-6xl font-bold font-display text-white mb-6">
              Blog
            </h1>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-xl text-gray-500 max-w-2xl"
          >
            Thoughts, tutorials, and insights on web development, design, and technology.
          </motion.p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogsData.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link to={`/blog/${blog.id}`}>
                <SpotlightCard className="h-full group cursor-pointer">
                  {/* Cover Image */}
                  <div className="aspect-video overflow-hidden relative">
                    <img
                      src={blog.coverImage}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-75"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-50" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        {new Date(blog.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={14} />
                        {blog.readTime}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold font-display text-white mb-3 group-hover:text-red-400 transition-colors duration-300">
                      {blog.title}
                    </h2>
                    
                    <p className="text-gray-500 mb-5 line-clamp-2 text-sm leading-relaxed">
                      {blog.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {blog.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 text-xs font-medium text-red-400/70 bg-red-500/5 rounded-lg border border-red-500/10"
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
